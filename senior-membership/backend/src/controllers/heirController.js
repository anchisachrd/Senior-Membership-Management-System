import * as heirService from "../services/heirService.js";

export const getMembersForHeir = async (req, res) => {
    try {
      const { heirId } = req.params;
      const members = await heirService.fetchMembersForHeir(heirId);
      res.status(200).json(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ message: "Failed to fetch members" });
    }
  };