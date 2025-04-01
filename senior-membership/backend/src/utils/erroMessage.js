// errorMessageMap.js
const errorMessages = {
  1005: "กรุณาอัปโหลดไฟล์เฉพาะนามสกุล .jpg .jpeg หรือ .png ",
  1009: "ขออภัยในความไม่สะดวก ขณะนี้ธนาคารเกิดขัดข้องชั่วคราว โปรดอัปโหลดสลิปอีกครั้งภายหลัง",
  1014: "บัญชีผู้รับไม่ตรงกับบัญชีของชมรม",
  1013: "จำนวนเงินไม่ถูกต้อง",
};

export const getErrorMessage = (errorCode, fallbackMessage) => {
  if (errorMessages[errorCode]) {
    return errorMessages[errorCode];
  }
  return fallbackMessage;
};
