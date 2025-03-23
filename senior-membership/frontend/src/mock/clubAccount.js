const firstNames = ["ลำดวน", "ถาวร", "สมใจ", "พิมพ์ใจ", "จารุวรรณ", "วิทูล", "บุญรอด", "กนกพร"];
const lastNames = ["สุขใจ", "เกิดศิริ", "มีสุข", "ใจดี", "แก้วใส", "วิบูลย์ผล", "ใจบุญ", "ตั้งตรงจิตร"];
const types = ["รายรับ", "รายจ่าย"];
const expenseTypes = ["โอนเงินสงเคราะห์", "ค่าสาธารณูปโภค", "ค่าสถานที่", "ค่าบำรุงชมรม", "ค่าอื่นๆ"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomName() {
  return `นาย/นาง${firstNames[getRandomInt(0, firstNames.length)]} ${lastNames[getRandomInt(0, lastNames.length)]}`;
}

function getRandomDate() {
  const start = new Date(2024, 0, 1); // Jan 1, 2024
  const end = new Date(2025, 2, 1);   // Mar 1, 2025
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().replace("T", " ").substring(0, 19);
}

const records = Array.from({ length: 10 }, (_, i) => {
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = getRandomInt(200, 50000);
  const name = getRandomName();
  const datetime = getRandomDate();

  if (type === "รายรับ") {
    const deceased = getRandomName();
    return {
      datetime,
      type,
      name,
      detail: `โอนค่าศพของ ${deceased}`,
      amount: 100,
      note: "-"
    };
  } else {
    const expense = expenseTypes[getRandomInt(0, expenseTypes.length)];
    const isHeir = expense === "โอนเงินสงเคราะห์";
    const heirName = getRandomName();

    return {
      datetime,
      type,
      name,
      detail: isHeir ? `${expense}ให้ ${heirName} (ทายาท)` : expense,
      amount: 50 ,
      note: isHeir ? "-" : "ค่าใช้จ่ายทั่วไป"
    };
  }
});

// คำนวณยอดรวม
let totalIncome = 0;
let totalExpense = 0;

records.forEach((item) => {
  if (item.type === "รายรับ") totalIncome += item.amount;
  else totalExpense += item.amount;
});

export const mockClubLedgerData = {
  records,
  totalIncome,
  totalExpense,
  currentBalance: totalIncome - totalExpense
};