import * as deathApprovalModel from '../models/deathApproval.js'
import * as deathReportModel from '../models/deathReport.js'

export const checkCommitteesVote = async (reportId) => {
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

