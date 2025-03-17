import { query } from "../db.js"; // your Postgres pool.
import { pool } from "../db.js";
import * as accountModel from "../models/accountModel.js";
import * as heirModel from "../models/heirModel.js";
import * as addressModel from "../models/addressModel.js";
import * as documentModel from "../models/documentModel.js";
import * as candidateModel from "../models/candidateModel.js";
import * as peopleModel from "../models/peopleModel.js";
import * as docVerificationModel from "../models/docVerificationModel.js";
import * as emailService from "../utils/emailService.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import path from "path";

// ไฟล์นี้จะเก็บพวก service ที่เป็น before verify doc คือ สร้างข้อมูลผู้สมัคร รหัสผ่าน อีเมลยืนยันการสมัคร ดึงข้อมูลที่เป็น orginal ไม่มีการแก้ไขใดๆ
// ถ้าแก้ไขจะไปอยู่ใน candidateService.js และอื่นๆ
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const generateRandomPassword = (length = 12) => {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
};

function convertDocsArrayToObject(docsArray) {
  const docObject = {};
  docsArray.forEach((doc) => {
    docObject[doc.doc_type] = doc.doc_path;
  });
  return docObject;
}
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
  if (candidateData.document) {
    for (const [docType, fullLocalPath] of Object.entries(
      candidateData.document
    )) {
      // docType is already in English: "house_registration", "id_card", etc.
      if (fullLocalPath) {
        // Only store the filename
        const fileName = path.basename(fullLocalPath);

        console.log(
          `📂 Uploading Candidate Document: ${docType} → ${fileName}`
        );
        await documentModel.uploadDocument(
          fileName,
          docType, // Store docType in English
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
    console.log("gen password", heirPassword);
    heirPassword = await hashPassword(heirPassword);

    const heirAccount = await accountModel.createHeirAccount(
      heirData.account.email,
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
      for (const [docType, fullLocalPath] of Object.entries(
        heirData.document
      )) {
        if (fullLocalPath) {
          const fileName = path.basename(fullLocalPath);
          console.log(`📂 Uploading Heir Document: ${docType} → ${fileName}`);

          await documentModel.uploadDocument(
            fileName,
            docType, // Store docType in English
            heir.heir_id,
            "heir"
          );
        }
      }
    }

    await docVerificationModel.createCandidateVerification(
      candidate.candidate_id
    );

    const subject = `แจ้งเตือนยืนยันการสมัครสมาชิกชมรมผู้สูงอายุ`;
    const emailContent = emailService.generateConfirmationEmail(
      candidateData.first_name
    );
    await emailService.sendEmail(
      candidateData.account.email,
      subject,
      emailContent
    );
  }

  return { candidate, heir };
};

export const fetchPendingCandidates = async () => {
  try {
    const candidates = await candidateModel.getPendingCandidates();
    return candidates; // Always returns an array
  } catch (error) {
    throw new Error("Error fetching candidates");
  }
};

export const fetchAllCandidateAndHeirData = async (candidateId) => {
  // 1) Candidate row from `candidates`
  const candidateRow = await candidateModel.getCandidateById(candidateId);

  // 2) Fetch Person data for candidate
  const candidatePerson = await peopleModel.getPersonById(
    candidateRow.person_id
  );
  // 3) Heir row by candidate ID
  const heirRow = await heirModel.getHeirByCandidateId(candidateId);

  // 4) If we have an heir row, fetch that person

  const heirPerson = await peopleModel.getPersonById(heirRow.person_id);

  // 5) Addresses
  const candidateAddress = candidateRow.address_id
    ? await addressModel.getAddressById(candidateRow.address_id)
    : null;

  const heirAddress =
    heirRow && heirRow.address_id
      ? await addressModel.getAddressById(heirRow.address_id)
      : null;

  // 6) Accounts
  //   candidateRow.account_id => account for candidate
  //   heirRow.account_id => account for heir
  const candidateAccount = candidateRow.account_id
    ? await accountModel.getAccountById(candidateRow.account_id)
    : null;

  const heirAccount =
    heirRow && heirRow.account_id
      ? await accountModel.getAccountById(heirRow.account_id)
      : null;

  // 7) Documents
  const candidateDocs = await documentModel.getDocumentsByCandidateId(
    candidateRow.candidate_id
  );
  const heirDocs = heirRow
    ? await documentModel.getDocumentsByHeirId(heirRow.heir_id)
    : [];

  // 8) Convert docs array => object
  const candidateDocsObj = convertDocsArrayToObject(candidateDocs);
  const heirDocsObj = convertDocsArrayToObject(heirDocs);

  // 9) Verification
  const verificationRow =
    await docVerificationModel.getVerificationByCandidateId(
      candidateRow.candidate_id
    );

  // 10) Build final candidate object
  const candidateObj = {
    candidate_id: candidateRow.candidate_id,

    // from people
    title: candidatePerson?.title || "",
    first_name: candidatePerson?.first_name || "",
    last_name: candidatePerson?.last_name || "",
    national_id: candidatePerson?.national_id || "",
    dob: candidatePerson?.dob || null,
    phone: candidatePerson?.phone || "",
    gender: candidatePerson?.gender || "",
    occupation: candidatePerson?.occupation || "",

    // from candidate row
    priority: candidateRow.priority,
    account_id: candidateRow.account_id,
    address_id: candidateRow.address_id,

    // candidate docs
    documents: candidateDocsObj,

    // candidate address
    address: candidateAddress
      ? {
          address_id: candidateAddress.address_id,
          house_number: candidateAddress.house_number,
          moo: candidateAddress.moo,
          soi: candidateAddress.soi,
          street: candidateAddress.street,
          province: candidateAddress.province,
          district: candidateAddress.district,
          subdistrict: candidateAddress.subdistrict,
          postal_code: candidateAddress.postal_code,
        }
      : null,

    // candidate email
    email: candidateAccount?.email || "",

    // Heir
    heir: heirRow
      ? {
          heir_id: heirRow.heir_id,
          relationship: heirRow.relationship,
          // from `people`
          title: heirPerson?.title || "",
          first_name: heirPerson?.first_name || "",
          last_name: heirPerson?.last_name || "",
          national_id: heirPerson?.national_id || "",
          dob: heirPerson?.dob || null,
          phone: heirPerson?.phone || "",
          gender: heirPerson?.gender || "",
          occupation: heirPerson?.occupation || "",

          account_id: heirRow.account_id,
          address_id: heirRow.address_id,
          email: heirAccount?.email || "",

          documents: heirDocsObj,
          address: heirAddress
            ? {
                address_id: heirAddress.address_id,
                house_number: heirAddress.house_number,
                moo: heirAddress.moo,
                soi: heirAddress.soi,
                street: heirAddress.street,
                province: heirAddress.province,
                district: heirAddress.district,
                subdistrict: heirAddress.subdistrict,
                postal_code: heirAddress.postal_code,
              }
            : null,
        }
      : null,

    // verification
    verification: verificationRow
      ? {
          verification_id: verificationRow.verification_id,
          verification_status: verificationRow.verification_status,
          staff_id: verificationRow.staff_id,
          staff_first_name: verificationRow.staff_first_name,
          staff_last_name: verificationRow.staff_last_name,
          comments: verificationRow.comments,
          verified_at: verificationRow.verified_at,
        }
      : null,
  };

  return candidateObj;
};

export const sendEmailMembership = async (candidateId, reason) => {
  const candidateInfo = await candidateModel.getCandidateDetails(candidateId);
  const heirInfo = await heirModel.getHeirInFoByCandidateId(candidateId);

  const { full_name, email, final_approval_status } = candidateInfo;
  const { heir_name, heir_email } = heirInfo;
  const candidateSubject = `แจ้งผลการสมัครสมาชิกชมรมผู้สูงอายุ`;
  const heirSubject = `แจ้งข้อมูลเข้าสู่ระบบสมาชิกชมรมผู้สูงอายุสำหรับทายาท`;

  const heirPassword = generateRandomPassword();
  const hashedPassword = hashPassword(heirPassword);
  console.log( "eamil: ", email, heir_email)
  if (final_approval_status === "อนุมัติ") {
    const candidatePassContent = emailService.generateApprovalEmail(full_name);
    await emailService.sendEmail(email, candidateSubject, candidatePassContent);

    await accountModel.activateCandidateAccount(candidateId);
    await candidateModel.activateMember(candidateId)
    await accountModel.updateHeirPasswordByCandidateId(
      candidateId,
      hashedPassword
    );

    const heirPassContent = emailService.generatePasswordEmailTemplate(
      heir_name,
      heirPassword
    );
    await emailService.sendEmail(heir_email, heirSubject, heirPassContent);

  } else if (final_approval_status === "ไม่อนุมัติ") {
    const candidateFailContent = emailService.generateRejectionEmail(
      full_name,
      reason
    );
    await emailService.sendEmail(
      email,
      candidateSubject,
      candidateFailContent
    );
  }
};
