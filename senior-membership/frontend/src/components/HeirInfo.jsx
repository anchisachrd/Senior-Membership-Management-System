import React from "react";

import DocumentPreview from "./DocumentPreview";

function HeirInfo({ data }) {
    const onChangeDate = (data_date) => {
        const dobFromData = new Date(data_date);
        const filterDob =
          dobFromData.getDate().toString().padStart(2, "0") +
          "-" +
          (dobFromData.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          (dobFromData.getFullYear() + 543);
        return filterDob;
      };
    
      const onChangeGender = (data_gender) => {
        var filterGender = "";
    
        if (data_gender === "F") {
          filterGender = "หญิง";
        } else {
          filterGender = "ชาย";
        }
        return filterGender;
      };
    
      return (
        <div>
          {/* กล่อง  3 */}
          <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
            <div class="p-8">
              <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
                3. ข้อมูลส่วนตัวของทายาท
              </p>
    
              <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                  <label
                    for="title_name_heir"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    คำนำหน้า
                  </label>
                  <input
                    value={data.title}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="first_name_heir"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    ชื่อจริง
                  </label>
                  <input
                    type="text"
                    id="first_name_heir"
                    value={data.first_name}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="last_name_heir"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    นามสกุล
                  </label>
                  <input
                    type="text"
                    id="last_name_heir"
                    value={data.last_name}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="id_number_heir"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    เลขบัตรประชาชน
                  </label>
                  <input
                    type="text"
                    id="id_number_heir"
                    value={data.national_id}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="birth_day_heir"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    วัน/เดือน/ปี เกิด
                  </label>
                  <input
                    id="birth_day_heir"
                    type="text"
                    value={onChangeDate(data.dob)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="sex_heir"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    เพศ
                  </label>
                  <input
                    id="sex_heir"
                    type="text"
                    value={onChangeGender(data.gender)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                    readOnly
                  />
                </div>
              </div>
    
              <div class="grid gap-6 mb-3 md:grid-cols-2">
                <div>
                  <label
                    for="job_heir"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    อาชีพ
                  </label>
                  <input
                    id="job_heir"
                    value={data.occupation}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="relationship_heir"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    ความเกี่ยวข้อง
                  </label>
                  <input
                    id="relationship_heir"
                    value={data.relationship}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="phone_heir"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    หมายเลขโทรศัพท์
                  </label>
                  <input
                    type="text"
                    value={data.phone}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="email_heir"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    อีเมล
                  </label>
                  <input
                    type="text"
                    value={data.email}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
              </div>
    
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>
    
              {/* ที่อยู่ */}
              <p class="block mb-5 mt-0 text-base leading-tight font-bold text-grey-600">
                ที่อยู่ปัจจุบัน
              </p>
    
              <div class="grid gap-6 mb-5 md:grid-cols-3">
                <div>
                  <label
                    for="home_number_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    บ้านเลขที่
                  </label>
                  <input
                    type="text"
                    value={data.address.house_number}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="moo_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    หมู่ที่
                  </label>
                  <input
                    type="text"
                    value={data.address.moo}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="soi_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    ซอย
                  </label>
                  <input
                    type="text"
                    value={data.address.soi}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
              </div>
    
              <div class="grid gap-6 mb-4 md:grid-cols-2">
                <div>
                  <label
                    for="road_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    ถนน
                  </label>
                  <input
                    type="text"
                    value={data.address.street}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="sub_district_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    ตำบล/แขวง
                  </label>
                  <input
                    type="text"
                    value={data.address.subdistrict}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="district_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    อำเภอ/เขต
                  </label>
                  <input
                    type="text"
                    value={data.address.district}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
    
                <div>
                  <label
                    for="province_member"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    จังหวัด
                  </label>
                  <input
                    value={data.address.province}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                    readOnly
                  />
                </div>
              </div>
    
              <div class="grid gap-6 mb-3 md:grid-cols-2">
                <div>
                  <label
                    for="zip_member"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type="text"
                    value={data.address.postal_code}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
    
          {/* กล่อง 4 */}
          <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
            <div class="p-8">
              <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
                4. เอกสารของทายาท
              </p>
    
              <DocumentPreview
                label="สำเนาทะเบียนบ้าน"
                docPath={data.documents?.house_registration}
              />
    
              <DocumentPreview
                label="สำเนาบัตรประชาชน"
                docPath={data.documents?.id_card}
              />
    
              <DocumentPreview
                label="ใบเปลี่ยนชื่อ"
                docPath={data.documents?.rename_doc}
              />
            </div>
          </div>
        </div>
      );
    }

export default HeirInfo