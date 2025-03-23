import React, { useEffect, useState } from 'react';
import { mockClubLedgerData } from "../../mock/clubAccount.js"; 


function ClubAccount() {

  const [ledger, setLedger] = useState({
    totalIncome: 0,
    totalExpense: 0,
    currentBalance: 0,
    records: [],
  });
  
  useEffect(() => {
    setLedger(mockClubLedgerData);
  }, []);


  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-2xl text-black mx-3 mt-5 mb-8 font-bold">
          บัญชีชมรม
        </div>
        <div className="mx-3 mt-5 mb-8 flex justify-end">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-xl">
            {/* รายรับ/รายจ่าย */}
            <div className="flex justify-between text-lg text-gray-800 mb-2">
              <span className="text-green-600 font-semibold">รายรับรวม</span>
              <span className="text-green-600 font-bold"> {ledger.totalIncome.toLocaleString()} บาท</span>
            </div>
            <div className="flex justify-between text-lg text-gray-800 mb-4">
              <span className="text-red-500 font-semibold">รายจ่ายรวม</span>
              <span className="text-red-500 font-bold">{ledger.totalExpense.toLocaleString()} บาท</span>
            </div>

            {/* เส้นคั่น */}
            <div className="border-t border-gray-400 my-4"></div>

            {/* ยอดเงินปัจจุบัน */}
            <div className="flex justify-between text-lg text-gray-700">
              <span className="font-semibold">ยอดเงินปัจจุบันในชมรม</span>
              <span className="font-bold text-gray-800"> {ledger.currentBalance.toLocaleString()} บาท</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="text-center align-middle py-4 px-4">
                  วันที่/เวลา
                </th>
                <th className="text-center align-middle py-4 px-4">ประเภท</th>
                <th className="text-center align-middle py-4 px-4">
                  ชื่อผู้เกี่ยวข้อง
                </th>
                <th className="text-center align-middle py-4 px-4">
                  รายละเอียด
                </th>
                <th className="text-center align-middle py-4 px-4">
                  จำนวนเงิน
                </th>
                <th className="text-center align-middle py-4 px-4">หมายเหตุ</th>
              </tr>
            </thead>

            <tbody>
              {ledger.records.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b hover:bg-gray-50 text-gray-900 ${
                    item.type === "รายรับ" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <td className="text-center py-4 px-4 font-medium">{item.datetime}</td>
                  <td className="text-center py-4 px-4">{item.type}</td>
                  <td className="text-center py-4 px-4">{item.name}</td>
                  <td className="text-center py-4 px-4">{item.detail}</td>
                  <td className="text-center py-4 px-4">
                    {item.amount.toLocaleString()} บาท
                  </td>
                  <td className="text-center py-4 px-4">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClubAccount;
