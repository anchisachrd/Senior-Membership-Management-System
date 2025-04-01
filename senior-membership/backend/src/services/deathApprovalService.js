import * as deathApprovalModel from '../models/deathApproval.js'
import * as deathReportModel from '../models/deathReport.js'
import * as memberModel from '../models/memberModel.js'


export const checkCommitteesVote = async (reportId, committeeId, status, comment) => {

    await deathApprovalModel.updateCommitteeApproval(reportId, committeeId, status, comment)

    const approvals = await deathApprovalModel.getDeathApprovalStatusByReportId(reportId);

    const pending =  approvals.some(da => da.approval_status === 'รอการพิจารณา' ||  da.approval_status === 'รอการแก้ไข')
    if (pending) {
        return;
    }

    let passCount = 0;
    let failCount = 0;
    approvals.forEach(da => {
        if (da.approval_status === 'อนุมัติ') passCount++;
        else if (da.approval_status === 'ไม่อนุมัติ') failCount++;
    });

    let finalStatus = 'ไม่อนุมัติ';
    if (passCount > failCount){
        finalStatus = 'อนุมัติ';
    }
    await deathReportModel.updateFinalApprovalStatus(reportId, finalStatus)
}

export const getFinalDeathApproval = async (reportId) => {
    try{

       // 1) ดึงข้อมูลการอนุมัติของกรรมการทั้งหมด
    const approvalRows = await deathApprovalModel.getCommitteeApproval(reportId);

     // 2) เอา member_id, final_approval จาก approvalRows[0] เพราะในแต่ละแถวจะมี member_id, final_approval เหมือนกัน
    const {member_id, final_approval, sent_to_heir} = approvalRows[0];

     //3) ดึงข้อมูลสมาชิกที่เสียชีวิตออกมา
    const memberInfo =  await memberModel.getPersonalInfoByMemberId(member_id)


    return{
      sent_to_heir,
      final_approval,
      approvals: approvalRows, //มีกรรมการหลายคน
      memberInfo
    };
    }catch(error){
        throw error;
    }
}

export const sendToRecheck = async (reportId, status) => {
    await deathApprovalModel.updateAllCommitteeApproval(reportId, status)
    await deathReportModel.updateFinalApprovalStatus(reportId,status)
}