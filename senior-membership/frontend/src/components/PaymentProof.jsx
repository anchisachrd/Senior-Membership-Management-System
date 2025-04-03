import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../api/verifyApi";

import ProofPaymentPreview from "./ProofPaymentPreview";

function PaymentProof({ userRoleId }) {
  const [expense, setExpense] = useState(null);


  useEffect(() => {
    if (!userRoleId) return;

    const fetchExpense = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/club/payment-proof/${userRoleId}`
        );
        setExpense(res.data[0]);
      } catch (err) {
        console.error("Error fetching expense:", err);
      }
    };

    fetchExpense();
  }, [userRoleId]);

  return (
    <div className="bg-gray-50 overflow-hidden rounded-xl shadow-xl relative mt-8">
      <div className="p-8">
        {/* <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label htmlFor="id_number_heir" className="block mb-2 text-sm font-medium text-gray-900">
              เลขรหัสทายาท
            </label>
            <input
              type="text"
              id="id_number_heir"
            //   value={expense?.heir_id || ""}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div>
            <label htmlFor="full_name_heir" className="block mb-2 text-sm font-medium text-gray-900">
              ชื่อทายาท
            </label>
            <input
              type="text"
              id="full_name_heir"
            //   value={expense?.heir_name || ""}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div>
            <label htmlFor="payment_type" className="block mb-2 text-sm font-medium text-gray-900">
              ประเภทการชำระเงิน
            </label>
            <input
              id="payment_type"
              value="โอนเงินสงเคราะห์"
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0" /> */}

        {expense ? (
          <>
            <div className="grid gap-6 md:grid-cols-1 mb-8">
              <ProofPaymentPreview
                label="ไฟล์หลักฐานการชำระเงิน"
                docPath={expense.proof_path}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-black">
                  จำนวนเงินค่าสงเคราะห์
                </label>
                <input
                  type="text"
                  id="amount"
                  value={expense.amount}
                  readOnly
                  className="bg-light border border-gray-400 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
              </div>

              <div>
                <label htmlFor="paid_at" className="block mb-2 text-sm font-medium text-black">
                  เวลาในการชำระเงิน
                </label>
                <input
                  type="datetime-local"
                  id="paid_at"
                  value={expense.paid_at?.slice(0, 16) || ""}
                  readOnly
                  className="bg-light border border-gray-400 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
              </div>
            </div>
          </>
        ) : (
          <p className="text-center mt-6 text-gray-500">ไม่พบข้อมูลการชำระเงิน</p>
        )}
      </div>
    </div>
  );
}

export default PaymentProof;
