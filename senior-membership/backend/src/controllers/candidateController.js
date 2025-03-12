import * as registerService from "../services/registerService.js";
import * as candidateService from "../services/candidateService.js";



export const register = async (req, res) => {
  try {
    console.log("✅ Raw Request Body:", req.body);
    console.log("📂 Uploaded Files:", req.files);

    // ✅ Extract Candidate Data
    const candidate = {
      title: req.body.candidate_title,
      first_name: req.body.candidate_first_name,
      last_name: req.body.candidate_last_name,
      national_id: req.body.candidate_national_id,
      dob: req.body.candidate_dob,
      phone: req.body.candidate_phone,
      gender: req.body.candidate_gender,
      occupation: req.body.candidate_occupation,
      address: {
        house_number: req.body.candidate_house_number,
        moo: req.body.candidate_moo,
        soi: req.body.candidate_soi,
        street: req.body.candidate_street,
        subdistrict: req.body.candidate_subdistrict,
        district: req.body.candidate_district,
        province: req.body.candidate_province,
        postal_code: req.body.candidate_postal_code,
      },
      account: {
        email: req.body.candidate_email,
        password: req.body.candidate_password,
      },
      document: {
        house_registration: req.files?.candidate_house_registration?.[0]?.path || null,
        id_card: req.files?.candidate_id_card?.[0]?.path || null,
        rename_doc: req.files?.candidate_rename_doc?.[0]?.path || null,
        med_certification: req.files?.candidate_med_certification?.[0]?.path || null,
      }
    };

    // ✅ Handle Heir Data
    
let heir = null;
if (req.body.heir_title) {
  const sameAddress = req.body.sameAddress === "true";
  heir = {
    title: req.body.heir_title,
    first_name: req.body.heir_first_name,
    last_name: req.body.heir_last_name,
    national_id: req.body.heir_national_id,
    dob: req.body.heir_dob,
    phone: req.body.heir_phone,
    gender: req.body.heir_gender,
    occupation: req.body.heir_occupation,
    relationship: req.body.heir_relationship,
    // Pass sameAddress along so the service can use it
    sameAddress, 
    address: sameAddress
      ? candidate.address // Use candidate's address object
      : {
          house_number: req.body.heir_house_number,
          moo: req.body.heir_moo,
          soi: req.body.heir_soi,
          street: req.body.heir_street,
          subdistrict: req.body.heir_subdistrict,
          district: req.body.heir_district,
          province: req.body.heir_province,
          postal_code: req.body.heir_postal_code,
        },
    account: {
      email: req.body.heir_email || "",
    },
    document: {
      house_registration: req.files?.heir_house_registration?.[0]?.path || null,
      id_card: req.files?.heir_id_card?.[0]?.path || null,
      rename_doc: req.files?.heir_rename_doc?.[0]?.path || null,
    }
  };
}

    // ✅ Pass Data to Service
    const result = await registerService.registerCandidateAndHeir(candidate, heir);
    res.status(201).json({ message: "Registration successful", result });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





export const getCandidates = async (req, res) => {
  try {
      const candidates = await registerService.fetchAllCandidates();
      
      // Ensure response is always an array
      res.status(200).json(candidates);
  } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCandidateandHeirById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidateData = await registerService.fetchAllCandidateAndHeirData(id);

    if (!candidateData) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    return res.status(200).json(candidateData);
  } catch (error) {
    console.error('Error fetching candidate data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDocStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedCandidate = await candidateService.modifyDocVerificationStatus(id);

      if (!updatedCandidate) {
          return res.status(404).json({ message: 'Candidate not found' });
      }

      res.status(200).json({
          success: true,
          message: 'Document verification status updated to "ผ่านการตรวจสอบ"',
          data: updatedCandidate,
      });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

export const getVerifiedCandidates = async (req, res) => {
  try {
      const candidates = await candidateService.fetchAllVerifiedDocsCandidates();
      res.status(200).json(candidates);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching verified candidates', error });
  }
};

export const getWaitingApproveCandidates = async (req, res) => {
  try {
      const candidates = await candidateService.fetchAllApprovalStatusCandidates();
      res.status(200).json(candidates);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching verified candidates', error });
  }
};

export const sendToCommittee = async (req, res) => {
  try {
    const { candidateId } = req.params;
    console.log("Received candidateId:", candidateId);  // Debug log
    if (!candidateId) {
      return res.status(400).json({ message: "Candidate ID is required" });
    }
    const updatedApprovalStatus = await candidateService.sendCandidateToCommittee(candidateId);
    res.status(200).json({
      success: true,
      message: 'Approval status updated to "รอการตรวจสอบ"',
      data: updatedApprovalStatus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending candidate to committee' });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const candidates = await candidateService.removeCandidate(candidateId);
    
    res.status(200).json(candidates);
} catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


