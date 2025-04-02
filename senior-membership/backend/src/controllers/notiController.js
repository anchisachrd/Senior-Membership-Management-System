import * as notiService from '../services/notiService.js'

export const getNotiStaff = async (req, res) => {
    try {
      const result = await notiService.notiStaff();
      return res.status(200).json(result);
    } catch (error) {
      console.error("noti error:", error.message);
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
      });
    }
  };

  export const getNotiCommittee = async (req, res) => {
    try {
      const result = await notiService.notiCommittee();
      return res.status(200).json(result);
    } catch (error) {
      console.error("noti error:", error.message);
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
      });
    }
  };

  export const getNotiHeir = async (req, res) => {

    const {heir_id} = req.query

    try {
      const result = await notiService.notiHeir(heir_id);
      return res.status(200).json(result);
    } catch (error) {
      console.error("noti error:", error.message);
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
      });
    }
  };

  export const getNotiMember = async (req, res) => {

    const {member_id} = req.query

    try {
      const result = await notiService.notiMember(member_id);
      return res.status(200).json(result);
    } catch (error) {
      console.error("noti error:", error.message);
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
      });
    }
  };