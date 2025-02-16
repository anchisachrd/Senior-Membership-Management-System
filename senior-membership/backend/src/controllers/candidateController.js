import * as registerService from "../services/registerService.js";
import * as candidateService from "../services/candidateService.js";



export const createCandidateData = async (req, res) => {
  try {
    
    // 2) Build candidateData object from req.body
    const candidateData = {
      title: req.body.candidate_title,
      first_name: req.body.candidate_first_name,
      last_name: req.body.candidate_last_name,
      national_id: req.body.candidate_national_id,
      dob: req.body.candidate_dob,
      phone: req.body.candidate_phone,
      gender: req.body.candidate_gender,
      occupation: req.body.candidate_occupation,
      account: {
        email: req.body.candidate_email,
        password: req.body.candidate_password,
      },
      document: {

        house_registration: null,
        id_card: null,
        rename_doc: null,
        med_certification: null,
      },
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
    };

    const sameAddress = req.body.sameAddress === "true";

    const heirData = {
      title: req.body.heir_title,
      first_name: req.body.heir_first_name,
      last_name: req.body.heir_last_name,
      national_id: req.body.heir_national_id,
      dob: req.body.heir_dob,
      phone: req.body.heir_phone,
      gender: req.body.heir_gender,
      occupation: req.body.heir_occupation,
      relationship: req.body.heir_relationship,
      sameAddress,
      account: {
        email: req.body.heir_email,
        // password: req.body.heir_password || "AUTO_GENERATED_PASSWORD",
      },
      document: {

        house_registration: null,
        id_card: null,
        rename_doc: null,
      },
      address: {
        house_number: req.body.heir_house_number,
        moo: req.body.heir_moo,
        soi: req.body.heir_soi,
        street: req.body.heir_street,
        subdistrict: req.body.heir_subdistrict,
        district: req.body.heir_district,
        province: req.body.heir_province,
        postal_code: req.body.heir_postal_code,
      },
    };

        // 2) Now capture file paths from req.files and place them in candidateData / heirData
        if (req.files?.candidate_house_registration) {
          candidateData.document.house_registration =
            "upload/" + req.files.candidate_house_registration[0].filename;
        }
        if (req.files?.candidate_id_card) {
          candidateData.document.id_card =
            "upload/" + req.files.candidate_id_card[0].filename;
        }
        if (req.files?.candidate_rename_doc) {
          candidateData.document.rename_doc =
            "upload/" + req.files.candidate_rename_doc[0].filename;
        }
        if (req.files?.candidate_med_certification) {
          candidateData.document.med_certification =
            "upload/" + req.files.candidate_med_certification[0].filename;
        }
    
        // Heir documents
        if (req.files?.heir_house_registration) {
          heirData.document.house_registration =
            "upload/" + req.files.heir_house_registration[0].filename;
        }
        if (req.files?.heir_id_card) {
          heirData.document.id_card =
            "upload/" + req.files.heir_id_card[0].filename;
        }
        if (req.files?.heir_rename_doc) {
          heirData.document.rename_doc =
            "upload/" + req.files.heir_rename_doc[0].filename;
        }

    const result = await registerService.createCandidate(candidateData, heirData, req.files);

    return res.status(201).json({
      success: true,
      data: result,
      message: "Candidate (and Heir) registered successfully",
    });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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


