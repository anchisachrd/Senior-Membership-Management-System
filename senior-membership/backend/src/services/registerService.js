import { query } from "../db.js"; // your Postgres pool.
import { pool } from "../db.js";
import * as accountModel from "../models/accountModel.js";
import * as heirModel from "../models/heirModel.js";
import * as addressModel from "../models/addressModel.js";
import * as documentModel from "../models/documentModel.js";
import * as candidateModel from "../models/candidateModel.js";
import * as peopleModel from "../models/peopleModel.js";
import * as emailService from "../utils/emailService.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// ไฟล์นี้จะเก็บพวก service ที่เป็น before verify doc คือ สร้างข้อมูลผู้สมัคร รหัสผ่าน อีเมลยืนยันการสมัคร ดึงข้อมูลที่เป็น orginal ไม่มีการแก้ไขใดๆ
// ถ้าแก้ไขจะไปอยู่ใน candidateService.js และอื่นๆ
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const generateRandomPassword = (length = 12) => {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
};
export const registerCandidateAndHeir = async (candidateData, heirData) => {
  const hashedPassword = await hashPassword(candidateData.account.password);

  // ✅ Create Candidate Account
  const candidateAccount = await accountModel.createAccount(
    candidateData.account.email,
    hashedPassword,
    "candidate"
  );

  // ✅ Create Candidate Personal Data
  const candidatePerson = await peopleModel.createPerson(candidateData);

  // ✅ Create Candidate Address
  const candidateAddress = await addressModel.createAddress(
    candidateData.address
  );

  // ✅ Insert Candidate
  const candidate = await candidateModel.createCandidate(
    candidatePerson.person_id,
    candidateAccount.account_id,
    candidateAddress.address_id
  );

  console.log("✅ Candidate Created:", candidate);

  // ✅ Upload Candidate Documents
  const docTypeMap = {
    house_registration: "ทะเบียนบ้าน",
    id_card: "บัตรประชาชน",
    med_certification: "ใบรับรองแพทย์",
    rename_doc: "ใบเปลี่ยนชื่อ",
  };

  if (candidateData.document) {
    for (const [docType, docPath] of Object.entries(candidateData.document)) {
      const mappedType = docTypeMap[docType];
      if (mappedType && docPath) {
        console.log(
          `📂 Uploading Candidate Document: ${mappedType} → ${docPath}`
        );
        await documentModel.uploadDocument(
          docPath,
          mappedType,
          candidate.candidate_id,
          "candidate"
        );
      }
    }
  }

  let heir = null;

  // ✅ Create Heir (If Exists)
  if (heirData) {
    const sameAddress = heirData.sameAddress;

    // ✅ Use Candidate's Address if Same Address is Checked
    const heirAddressId = sameAddress
      ? candidate.address_id // 🟢 Use Candidate Address ID
      : (await addressModel.createAddress(heirData.address)).address_id;

    // ✅ Hash Heir Password if Provided

    let heirPassword = generateRandomPassword();
    console.log('gen password', heirPassword)
    heirPassword = await hashPassword(heirPassword);

    const heirAccount = await accountModel.createAccount(
      heirData.account.email,
      heirPassword,
      "heir"
    );

    // ✅ Create Heir Personal Data
    const heirPerson = await peopleModel.createPerson(heirData);

    // ✅ Insert Heir
    heir = await heirModel.createHeir(
      heirPerson.person_id,
      candidate.candidate_id,
      heirData.relationship,
      heirAddressId, // 🟢 Use Correct Address ID
      heirAccount.account_id
    );

    console.log("✅ Heir Created:", heir);

    // ✅ Upload Heir Documents AFTER Heir Exists
    if (heirData.document) {
      for (const [docType, docPath] of Object.entries(heirData.document)) {
        const mappedType = docTypeMap[docType];
        if (mappedType && docPath) {
          console.log(`📂 Uploading Heir Document: ${mappedType} → ${docPath}`);
          await documentModel.uploadDocument(
            docPath,
            mappedType,
            heir.heir_id,
            "heir"
          );
        }
      }
    }
  }

  return { candidate, heir };
};

export const fetchAllCandidates = async () => {
  try {
    const candidates = await candidateModel.getAllCandidates();
    return candidates; // Always returns an array
  } catch (error) {
    throw new Error("Error fetching candidates");
  }
};

export const fetchAllCandidateAndHeirData = async (candidateId) => {
  function convertDocsArrayToObject(docsArray) {
    const docObject = {};
    docsArray.forEach((doc) => {
      // ต้องแปลงเพราะขกไป map ข้างหน้า ข้อมูลมัน return เป็น array เลยต้องแปลงเป็น obj
      // docObject["house_registration"] = "upload/something.jpeg"
      docObject[doc.doc_type] = doc.doc_path;
    });
    return docObject;
  }

  // get candidate data
  const candidate = await candidateModel.getCandidateById(candidateId);

  // heir_id มีอยู่แล้ว so ก้ get heir data and use heir_id in candidate table
  const heir = await heirModel.getHeirById(candidate.heir_id);

  // get candidate address
  const candidateAddress = await addressModel.getAddressById(
    candidate.address_id
  );

  //get heir address
  const heirAddress = await addressModel.getAddressById(heir.address_id);

  const candidateAccount = await accountModel.getAccountById(
    candidate.account_id
  );
  const heirAccount = await accountModel.getAccountById(heir.account_id);

  const candidateDocuments = await documentModel.getDocumentsByCandidateId(
    candidate.candidate_id
  );
  const heirDocuments = await documentModel.getDocumentsByHeirId(heir.heir_id);

  const candidateDocsObj = convertDocsArrayToObject(candidateDocuments);
  const heirDocsObj = convertDocsArrayToObject(heirDocuments);

  return {
    candidate_id: candidate.candidate_id,
    title: candidate.title,
    first_name: candidate.first_name,
    last_name: candidate.last_name,
    national_id: candidate.national_id,
    dob: candidate.dob,
    phone: candidate.phone,
    gender: candidate.gender,
    occupation: candidate.occupation,
    account_id: candidate.account_id,
    address_id: candidate.address_id,
    heir_id: candidate.heir_id,
    email: candidateAccount.email,

    documents: candidateDocsObj,

    // Candidate's address
    address: {
      address_id: candidateAddress.address_id,
      house_number: candidateAddress.house_number,
      moo: candidateAddress.moo,
      soi: candidateAddress.soi,
      street: candidateAddress.street,
      province: candidateAddress.province,
      district: candidateAddress.district,
      subdistrict: candidateAddress.subdistrict,
      postal_code: candidateAddress.postal_code,
    },

    // Heir
    heir: {
      heir_id: heir.heir_id,
      title: heir.title,
      first_name: heir.first_name,
      last_name: heir.last_name,
      national_id: heir.national_id,
      dob: heir.dob,
      phone: heir.phone,
      gender: heir.gender,
      occupation: heir.occupation,
      relationship: heir.relationship,
      account_id: heir.account_id,
      address_id: heir.address_id,
      email: heirAccount.email,

      documents: heirDocsObj,

      // Heir address
      address: {
        address_id: heirAddress.address_id,
        house_number: heirAddress.house_number,
        moo: heirAddress.moo,
        soi: heirAddress.soi,
        street: heirAddress.street,
        province: heirAddress.province,
        district: heirAddress.district,
        subdistrict: heirAddress.subdistrict,
        postal_code: heirAddress.postal_code,
      },
    },
  };
};
