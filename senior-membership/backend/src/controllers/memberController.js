import * as memberService from "../services/memberService.js";
import * as memberModel from "../models/memberModel.js"

export const getActiveMembers = async (req, res) => {
  try {
    const members = await memberService.fetchActiveMembers();
    res.json(members);
  } catch (error) {
    console.error("Error fetching active members:", error);
    res.status(500).json({ message: "Failed to fetch active members" });
  }
};

export const getDeathMembers = async (req, res) => {
    try {
      const members = await memberService.fetchDeathMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching death members:", error);
      res.status(500).json({ message: "Failed to fetch death members" });
    }
  };

  export const getQuitMembers = async (req, res) => {
    try {
      const members = await memberService.fetchQuitMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching quit members:", error);
      res.status(500).json({ message: "Failed to fetch quit members" });
    }
  };

  export const getMemberInfo = async (req, res) => {
    try {
        const { memberId } = req.params; // e.g. /api/members/:memberId
        const data = await memberService.fetchMemberDetails(memberId);
    
        if (!data) {
          return res.status(404).json({ message: "Member not found" });
        }
    
        return res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching member data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
  }

  export const getReviewdDeathList = async (req, res) => {
    try {
      const members = await memberModel.getReviewedDeathMember();
      res.json(members);
    } catch (error) {
      console.error("Error fetching death members:", error);
      res.status(500).json({ message: "Failed to fetch death members" });
    }
  }


  
