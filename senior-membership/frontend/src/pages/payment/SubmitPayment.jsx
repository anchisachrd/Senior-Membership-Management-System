import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { verifySlip } from "../../api/memberApi";
import ConfirmModal from "../../components/ConfirmModal";
;

function SubmitPayment() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namePayment, setNamePayment] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [slipFile, setSlipFile] = useState(null); // Store uploaded file
  const memberId = 2; // Example memberId 

  // Toggle modal state
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const isFormValid = namePayment !== "" && bank !== "" && amount !== "" && slipFile !== null;

  const handleFileChange = (e) => {
    setSlipFile(e.target.files[0]);
  };

  const handleConfirmSubmit = async () => {
    try {
      const result = await verifySlip(slipFile, memberId, amount);
      alert('อัปโหลดสลิปสำเร็จ!');
      console.log(result);
      setIsModalOpen(false);
      navigate('/history');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัปโหลดสลิป');
      setIsModalOpen(false);
    }
  };

  // สำหรับเช็ค role
  const userRole = localStorage.getItem("userRole");

  const checkUserRole = async () => {
    if (userRole != 'member') {
      navigate('/login')
    }
    console.log(userRole)
  };

  useEffect(() => {
    checkUserRole();
  }, []);

  return (
    <div className="p-12 sm:ml-64">
      <div class="bg-gray-100 overflow-hidden rounded-xl shadow-xl">
        <div class="p-12">
          <div class="text-2xl text-black font-bold">ขั้นตอนการชำระเงิน</div>
          <div class="mt-5 ms-8 mb-0">
            <div class="text-lg text-black font-medium me-2">
              1. สแกน QR Code ชำระเงิน
              ด้านล่างเพื่อชำระเงินค่าศพในแอปพลิเคชันธนาคารของท่าน
            </div>
            <div class="text-lg text-black font-medium me-2 mt-3">
              2. ตรวจสอบหมายเลขบัญชีธนาคารและชื่อของผู้รับเงินก่อนทำการชำระเงิน
            </div>
            <div class="text-lg text-black font-medium me-2 mt-3">
              3. เมื่อตรวจสอบข้อมูลเรียบร้อยแล้ว ทำการชำระเงิน
            </div>
            <div class="text-lg text-black font-medium me-2 mt-3">
              4.
              กรอกข้อมูลและแนบหลักฐานการชำระเงินหลังจากโอนเงินได้ที่ฟอร์มชำระเงิน
            </div>
            <div class="text-lg text-black font-medium me-2 mt-3">
              5. กดปุ่มเสร็จสิ้น
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 overflow-hidden rounded-xl shadow-xl mt-12">
        <div class="p-12">
          <div class="text-2xl text-black font-bold">ช่องทางการชำระเงิน</div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="relative mt-8">
              <img src="qrcode.png" class="w-90 h-auto mx-auto" />
              <div class="flex justify-center mt-6 text-xl text-black font-lg">
                สแกน QR Code ด้านบน
              </div>
            </div>

            <div class="flex flex-col justify-center">
              <div class="text-xl text-black font-bold">
                รายละเอียดบัญชีธนาคารของชมรม:{" "}
              </div>
              <div class="text-xl text-black font-medium mt-3">
                ธนาคารกรุงศรีอยุธยา
              </div>
              <div class="text-xl text-black font-medium mt-3">
                หมายเลขธนาคาร: 229199xxxx
              </div>
              <div class="text-xl text-black font-medium mt-3">
                ชื่อผู้รับเงิน: ชมรมผู้สูงอายุ
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 overflow-hidden rounded-xl shadow-xl mt-12">
        <div className="p-12">
          <div className="text-2xl text-black font-bold mb-5">
            ฟอร์มแจ้งชำระเงิน
          </div>
          <div className="text-lg text-black mb-5">
            แจ้งชำระเงินค่าบำรุงรักษาศพของ <b>คุณพอยเบ ง่วงนอนงับ</b>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name_payment"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ชื่อบัญชีที่โอน
              </label>
              <input
                value={namePayment}
                onChange={(e) => setNamePayment(e.target.value)}
                type="text"
                id="name_payment"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                           focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกชื่อของบัญชีที่โอน"
              />
            </div>

            <div>
              <label
                htmlFor="bank"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ธนาคาร
              </label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                id="bank"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                           focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
              >
                <option value="">เลือกธนาคารของท่าน</option>
                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                จำนวนเงิน
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                id="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                           focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกจำนวนเงิน"
              />
            </div>

            <div>
              <label
                htmlFor="slip"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                สลิปการชำระเงิน
              </label>
              {/* อย่าผูก value={slipFile} ใช้ onChange ดึงไฟล์จาก e.target.files */}
              <input
                onChange={handleFileChange}
                type="file"
                id="slip"
                accept="image/jpeg, image/png"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                           focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
              />
            </div>
          </div>

          <div className="relative mt-14 flex justify-center items-center">
            <button
              type="button"
              onClick={toggleModal}
              disabled={!isFormValid}
              className={`focus:outline-none text-white font-medium rounded-lg text-base px-5 py-2.5 me-9 mb-2 ${isFormValid
                  ? "bg-lime-700 hover:bg-lime-800 focus:ring-4 "
                  : "bg-gray-400 cursor-not-allowed"

                }`}
            >
              แจ้งผลการชำระเงิน
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        title="ยืนยันการแจ้งชำระเงิน"
        description="โปรดตรวจสอบความถูกต้องก่อนกดยืนยัน"
        onConfirm={handleConfirmSubmit}
        onCancel={toggleModal}
      />
    </div>
  );
}

export default SubmitPayment;
