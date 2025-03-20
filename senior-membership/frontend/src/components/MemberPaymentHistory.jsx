import React, { useEffect, useState } from "react";
import {
  getMyCommitteeApproval,
  updateCommitteeApproval,
} from "../api/committeeApi";
import ConfirmModal from "./ConfirmModal";
import { verifyUser } from "../api/verifyApi";

function MemberPaymentHistory() {
  return (
    <div class=" w-full ">
    <div class=" mt-10 overflow-hidden border shadow-xl sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
          <tr>
            <th scope="col" class="text-center align-middle py-4 px-4">
              No.
            </th>
            <th scope="col" class="text-center align-middle py-4 px-4">
              วันที่ชำระ
            </th>
            <th scope="col" class="text-center align-middle py-4 px-4">
              รหัสผู้เสียชีวิต
            </th>
            <th scope="col" class="text-center align-middle py-4 px-4">
              ชื่อผู้เสียชีวิต
            </th>
            <th scope="col" class="text-center align-middle py-4 px-4">
              จำนวนเงิน
            </th>
            <th scope="col" class="text-center align-middle py-4 px-4">
              สถานะการชำระเงิน
            </th>
            <th scope="col" class="text-center align-middle py-4 px-4">
              รายละเอียดการชำระเงิน
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="cursor-pointer bg-white border-b hover:bg-gray-50 text-gray-900">
            <td className="text-center align-middle py-4 px-4">1</td>
            <td className="text-center align-middle py-4 px-4">11-05-68</td>
            <td className="text-center align-middle py-4 px-4">15</td>
            <td className="text-center align-middle py-4 px-4">
              นายมานี ขี่จรวด
            </td>
            <td className="text-center align-middle py-4 px-4">100</td>
            <td className="text-center align-middle">ชำระสำเร็จ</td>
          </tr>
          <tr className="cursor-pointer bg-white border-b hover:bg-gray-50 text-gray-900">
            <td className="text-center align-middle py-4 px-4">1</td>
            <td className="text-center align-middle py-4 px-4">11-05-68</td>
            <td className="text-center align-middle py-4 px-4">15</td>
            <td className="text-center align-middle py-4 px-4">
              นายมานี ขี่จรวด
            </td>
            <td className="text-center align-middle py-4 px-4">100</td>
            <td className="text-center align-middle">ชำระสำเร็จ</td>
          </tr>
          
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default MemberPaymentHistory;
