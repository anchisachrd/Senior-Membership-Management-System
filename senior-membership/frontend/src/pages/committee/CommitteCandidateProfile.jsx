import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";

function Information_personal() {
  return (
    <div>
      {/* กล่อง 1 */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">1. ข้อมูลส่วนตัวของผู้สมัคร</p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label for="title_name_member" class="block mb-2 text-sm font-medium text-gray-900">คำนำหน้า</label>
              <select id="title_name_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกคำนำหน้า</option>
                <option value="mr">นาย</option>
                <option value="miss">นางสาว</option>
                <option value="mrs">นาง</option>
              </select>
            </div>

            <div>
              <label for="first_name_member" class="block mb-2 text-sm font-medium text-gray-900 ">ชื่อจริง</label>
              <input type="text" id="first_name_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกชื่อของผู้สมัคร" />
            </div>

            <div>
              <label for="last_name_member" class="block mb-2 text-sm font-medium text-gray-900 ">นามสกุล</label>
              <input type="text" id="last_name_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกนามสกุลของผู้สมัคร" />
            </div>

            <div>
              <label for="id_number_member" class="block mb-2 text-sm font-medium text-gray-900 ">เลขบัตรประชาชน</label>
              <input type="text" id="id_number_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกเลขบัตรประชาชน" />
            </div>

            <div>
              <label for="birth_day_member" class="block mb-2 text-sm font-medium text-gray-900 ">วัน/เดือน/ปี เกิด</label>
              <input id="birth_day_member" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="เลือกวันเกิด" />
            </div>

            <div>
              <label for="sex_member" class="block mb-2 text-sm font-medium text-gray-900">เพศ</label>
              <select id="sex_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected class='text-opacity-25'>เลือกเพศ</option>
                <option value="man">ชาย</option>
                <option value="woman">หญิง</option>
              </select>
            </div>

          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label for="job_member" class="block mb-2 text-sm font-medium text-gray-900">อาชีพ</label>
              <select id="job_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกอาชีพ</option>
                <option value="">อาชีพ 1</option>
                <option value="">อาชีพ 2</option>
                <option value="">อาชีพ 3</option>
              </select>
            </div>

            <div >
              <label for="phone_member" class="block mb-2 text-sm font-medium text-gray-900 ">หมายเลขโทรศัพท์</label>
              <input type="text" id="phone_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์" />
            </div>

          </div>

          <div class='mb-4'>
            <label for="email_member" class="block mb-2 text-sm font-medium text-gray-900 ">อีเมล</label>
            <input type="text" id="email_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกอีเมลของผู้สมัคร" />
          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">

            <div>
              <label for="password_member" class="block mb-2 text-sm font-medium text-gray-900 ">รหัสผ่าน</label>
              <input type="password" id="password_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกรหัสผ่าน" />
            </div>

            <div>
              <label for="confirm_password_member" class="block mb-2 text-sm font-medium text-gray-900 ">ยืนยันรหัสผ่าน</label>
              <input type="password" id="confirm_password_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกรหัสผ่านให้ตรงกัน" />
            </div>

          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>

          {/* ที่อยู่ */}
          <p class="block mb-5 mt-0 text-base leading-tight font-bold text-grey-600">ที่อยู่ปัจจุบัน</p>

          <div class="grid gap-6 mb-5 md:grid-cols-3">

            <div >
              <label for="home_number_member" class="block mb-2 text-sm font-medium text-gray-900 ">บ้านเลขที่</label>
              <input type="text" id="home_number_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกบ้านเลขที่" />
            </div>

            <div >
              <label for="moo_member" class="block mb-2 text-sm font-medium text-gray-900 ">หมู่ที่</label>
              <input type="text" id="moo_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมู่ที่" />
            </div>

            <div >
              <label for="soi_member" class="block mb-2 text-sm font-medium text-gray-900 ">ซอย</label>
              <input type="text" id="soi_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกซอย" />
            </div>

          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">

            <div >
              <label for="road_member" class="block mb-2 text-sm font-medium text-gray-900 ">ถนน</label>
              <input type="text" id="road_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกถนน" />
            </div>

            <div >
              <label for="sub_district_member" class="block mb-2 text-sm font-medium text-gray-900 ">ตำบล/แขวง</label>
              <input type="text" id="sub_district_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกตำบลหรือแขวง" />
            </div>

            <div >
              <label for="district_member" class="block mb-2 text-sm font-medium text-gray-900 ">อำเภอ/เขต</label>
              <input type="text" id="district_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกอำเภอหรือเขต" />
            </div>

            <div>
              <label for="province_member" class="block mb-2 text-sm font-medium text-gray-900">จังหวัด</label>
              <select id="province_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกจังหวัด</option>
                <option value="1">กระบี่</option>
                <option value="2">กรุงเทพมหานคร</option>
                <option value="3">กาญจนบุรี</option>
                <option value="4">กาฬสินธุ์</option>
                <option value="5">กำแพงเพชร</option>
                <option value="6">ขอนแก่น</option>
                <option value="7">จันทบุรี</option>
                <option value="8">ฉะเชิงเทรา</option>
                <option value="9">ชลบุรี</option>
                <option value="10">ชัยนาท</option>
                <option value="11">ชัยภูมิ</option>
                <option value="12">ชุมพร</option>
                <option value="13">เชียงราย</option>
                <option value="14">เชียงใหม่</option>
                <option value="15">ตรัง</option>
                <option value="16">ตราด</option>
                <option value="17">ตาก</option>
                <option value="18">นครนายก</option>
                <option value="19">นครปฐม</option>
                <option value="20">นครพนม</option>
                <option value="21">นครราชสีมา</option>
                <option value="22">นครศรีธรรมราช</option>
                <option value="23">นครสวรรค์</option>
                <option value="24">นนทบุรี</option>
                <option value="25">นราธิวาส</option>
                <option value="26">น่าน</option>
                <option value="27">บึงกาฬ</option>
                <option value="28">บุรีรัมย์</option>
                <option value="29">ปทุมธานี</option>
                <option value="30">ประจวบคีรีขันธ์</option>
                <option value="31">ปราจีนบุรี</option>
                <option value="32">ปัตตานี</option>
                <option value="33">พระนครศรีอยุธยา</option>
                <option value="34">พะเยา</option>
                <option value="35">พังงา</option>
                <option value="36">พัทลุง</option>
                <option value="37">พิจิตร</option>
                <option value="38">พิษณุโลก</option>
                <option value="39">เพชรบุรี</option>
                <option value="40">เพชรบูรณ์</option>
                <option value="41">แพร่</option>
                <option value="42">ภูเก็ต</option>
                <option value="43">มหาสารคาม</option>
                <option value="44">มุกดาหาร</option>
                <option value="45">แม่ฮ่องสอน</option>
                <option value="46">ยโสธร</option>
                <option value="47">ยะลา</option>
                <option value="48">ร้อยเอ็ด</option>
                <option value="49">ระนอง</option>
                <option value="50">ระยอง</option>
                <option value="51">ราชบุรี</option>
                <option value="52">ลพบุรี</option>
                <option value="53">ลำปาง</option>
                <option value="54">ลำพูน</option>
                <option value="55">เลย</option>
                <option value="56">ศรีสะเกษ</option>
                <option value="57">สกลนคร</option>
                <option value="58">สงขลา</option>
                <option value="59">สตูล</option>
                <option value="60">สมุทรปราการ</option>
                <option value="61">สมุทรสงคราม</option>
                <option value="62">สมุทรสาคร</option>
                <option value="63">สระแก้ว</option>
                <option value="64">สระบุรี</option>
                <option value="65">สิงห์บุรี</option>
                <option value="66">สุโขทัย</option>
                <option value="67">สุพรรณบุรี</option>
                <option value="68">สุราษฎร์ธานี</option>
                <option value="69">สุรินทร์</option>
                <option value="70">หนองคาย</option>
                <option value="71">หนองบัวลำภู</option>
                <option value="72">อ่างทอง</option>
                <option value="73">อำนาจเจริญ</option>
                <option value="74">อุดรธานี</option>
                <option value="75">อุตรดิตถ์</option>
                <option value="76">อุทัยธานี</option>
                <option value="77">อุบลราชธานี</option>
              </select>
            </div>
          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">

            <div >
              <label for="zip_member" class="block mb-2 text-sm font-medium text-gray-900 ">รหัสไปรษณีย์</label>
              <input type="text" id="zip_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกรหัสไปรษณีย์" />
            </div>
          </div>




        </div>
      </div>

      {/* กล่อง */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">2. เอกสารของผู้สมัคร</p>

          <div>
            <label for="copy_house_member" class="block mb-2 text-sm font-medium text-gray-900">สำเนาทะเบียนบ้าน</label>
            <input type="file" id="copy_house_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>

          <div class='mt-5'>
            <label for="copy_id_member" class="block mb-2 text-sm font-medium text-gray-900">สำเนาบัตรประชาชน</label>
            <input type="file" id="copy_id_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>

          <div class='mt-5'>
            <label for="doc_rename_member" class="block mb-2 text-sm font-medium text-gray-900">ใบเปลี่ยนชื่อ</label>
            <input type="file" id="doc_rename_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>

          <div class='mt-5'>
            <label for="cer_med_member" class="block mb-2 text-sm font-medium text-gray-900">ใบรับรองแพทย์</label>
            <input type="file" id="cer_med_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>

        </div>
      </div>
    </div>
  )
}

function Information_heir() {
  return (
    <div>
      {/* กล่อง  3 */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">3. ข้อมูลส่วนตัวของทายาท</p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label for="title_name_heir" class="block mb-2 text-sm font-medium text-gray-900">คำนำหน้า</label>
              <select id="title_name_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกคำนำหน้า</option>
                <option value="mr">นาย</option>
                <option value="miss">นางสาว</option>
                <option value="mrs">นาง</option>
              </select>
            </div>

            <div>
              <label for="first_name_heir" class="block mb-2 text-sm font-medium text-gray-900 ">ชื่อจริง</label>
              <input type="text" id="first_name_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกชื่อของทายาท" />
            </div>

            <div>
              <label for="last_name_heir" class="block mb-2 text-sm font-medium text-gray-900 ">นามสกุล</label>
              <input type="text" id="last_name_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกนามสกุลของทายาท" />
            </div>

            <div>
              <label for="id_number_heir" class="block mb-2 text-sm font-medium text-gray-900 ">เลขบัตรประชาชน</label>
              <input type="text" id="id_number_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกเลขบัตรประชาชน" />
            </div>

            <div>
              <label for="birth_day_heir" class="block mb-2 text-sm font-medium text-gray-900 ">วัน/เดือน/ปี เกิด</label>
              <input id="birth_day_heir" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="เลือกวันเกิด" />
            </div>

            <div>
              <label for="sex_heir" class="block mb-2 text-sm font-medium text-gray-900">เพศ</label>
              <select id="sex_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected class='text-opacity-25'>เลือกเพศ</option>
                <option value="man">ชาย</option>
                <option value="woman">หญิง</option>
              </select>
            </div>

          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">
            <div>
              <label for="job_heir" class="block mb-2 text-sm font-medium text-gray-900">อาชีพ</label>
              <select id="job_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกอาชีพ</option>
                <option value="">อาชีพ 1</option>
                <option value="">อาชีพ 2</option>
                <option value="">อาชีพ 3</option>
              </select>
            </div>

            <div>
              <label for="relationship_heir" class="block mb-2 text-sm font-medium text-gray-900">ความเกี่ยวข้อง</label>
              <select id="relationship_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกความเกี่ยวข้อง</option>
                <option value="">สามี/ภรรยา</option>
                <option value="">ลูก</option>
                <option value="">บลาๆ</option>
              </select>
            </div>

            <div>
              <label for="phone_heir" class="block mb-2 text-sm font-medium text-gray-900 ">หมายเลขโทรศัพท์</label>
              <input type="text" id="phone_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์" />
            </div>

            <div>
              <label for="email_heir" class="block mb-2 text-sm font-medium text-gray-900 ">อีเมล</label>
              <input type="text" id="email_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกอีเมลของทายาท" />
            </div>

            <div>
              <label for="password_heir" class="block mb-2 text-sm font-medium text-gray-900 ">รหัสผ่าน</label>
              <input type="password" id="password_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกรหัสผ่าน" />
            </div>

            <div>
              <label for="confirm_password_heir" class="block mb-2 text-sm font-medium text-gray-900 ">ยืนยันรหัสผ่าน</label>
              <input type="password" id="confirm_password_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกรหัสผ่านให้ตรงกัน" />
            </div>

          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>

          {/* ที่อยู่ */}
          <p class="block mb-5 mt-0 text-base leading-tight font-bold text-grey-600">ที่อยู่ปัจจุบัน</p>

          <div class="grid gap-6 mb-5 md:grid-cols-3">

            <div >
              <label for="home_number_member" class="block mb-2 text-sm font-medium text-gray-900 ">บ้านเลขที่</label>
              <input type="text" id="home_number_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกบ้านเลขที่" />
            </div>

            <div >
              <label for="moo_member" class="block mb-2 text-sm font-medium text-gray-900 ">หมู่ที่</label>
              <input type="text" id="moo_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมู่ที่" />
            </div>

            <div >
              <label for="soi_member" class="block mb-2 text-sm font-medium text-gray-900 ">ซอย</label>
              <input type="text" id="soi_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกซอย" />
            </div>

          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">

            <div>
              <label for="road_member" class="block mb-2 text-sm font-medium text-gray-900 ">ถนน</label>
              <input type="text" id="road_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกถนน" />
            </div>

            <div >
              <label for="sub_district_member" class="block mb-2 text-sm font-medium text-gray-900 ">ตำบล/แขวง</label>
              <input type="text" id="sub_district_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกตำบลหรือแขวง" />
            </div>

            <div >
              <label for="district_member" class="block mb-2 text-sm font-medium text-gray-900 ">อำเภอ/เขต</label>
              <input type="text" id="district_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกอำเภอหรือเขต" />
            </div>

            <div>
              <label for="province_member" class="block mb-2 text-sm font-medium text-gray-900">จังหวัด</label>
              <select id="province_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2">
                <option selected>เลือกจังหวัด</option>
                <option value="1">กระบี่</option>
                <option value="2">กรุงเทพมหานคร</option>
                <option value="3">กาญจนบุรี</option>
                <option value="4">กาฬสินธุ์</option>
                <option value="5">กำแพงเพชร</option>
                <option value="6">ขอนแก่น</option>
                <option value="7">จันทบุรี</option>
                <option value="8">ฉะเชิงเทรา</option>
                <option value="9">ชลบุรี</option>
                <option value="10">ชัยนาท</option>
                <option value="11">ชัยภูมิ</option>
                <option value="12">ชุมพร</option>
                <option value="13">เชียงราย</option>
                <option value="14">เชียงใหม่</option>
                <option value="15">ตรัง</option>
                <option value="16">ตราด</option>
                <option value="17">ตาก</option>
                <option value="18">นครนายก</option>
                <option value="19">นครปฐม</option>
                <option value="20">นครพนม</option>
                <option value="21">นครราชสีมา</option>
                <option value="22">นครศรีธรรมราช</option>
                <option value="23">นครสวรรค์</option>
                <option value="24">นนทบุรี</option>
                <option value="25">นราธิวาส</option>
                <option value="26">น่าน</option>
                <option value="27">บึงกาฬ</option>
                <option value="28">บุรีรัมย์</option>
                <option value="29">ปทุมธานี</option>
                <option value="30">ประจวบคีรีขันธ์</option>
                <option value="31">ปราจีนบุรี</option>
                <option value="32">ปัตตานี</option>
                <option value="33">พระนครศรีอยุธยา</option>
                <option value="34">พะเยา</option>
                <option value="35">พังงา</option>
                <option value="36">พัทลุง</option>
                <option value="37">พิจิตร</option>
                <option value="38">พิษณุโลก</option>
                <option value="39">เพชรบุรี</option>
                <option value="40">เพชรบูรณ์</option>
                <option value="41">แพร่</option>
                <option value="42">ภูเก็ต</option>
                <option value="43">มหาสารคาม</option>
                <option value="44">มุกดาหาร</option>
                <option value="45">แม่ฮ่องสอน</option>
                <option value="46">ยโสธร</option>
                <option value="47">ยะลา</option>
                <option value="48">ร้อยเอ็ด</option>
                <option value="49">ระนอง</option>
                <option value="50">ระยอง</option>
                <option value="51">ราชบุรี</option>
                <option value="52">ลพบุรี</option>
                <option value="53">ลำปาง</option>
                <option value="54">ลำพูน</option>
                <option value="55">เลย</option>
                <option value="56">ศรีสะเกษ</option>
                <option value="57">สกลนคร</option>
                <option value="58">สงขลา</option>
                <option value="59">สตูล</option>
                <option value="60">สมุทรปราการ</option>
                <option value="61">สมุทรสงคราม</option>
                <option value="62">สมุทรสาคร</option>
                <option value="63">สระแก้ว</option>
                <option value="64">สระบุรี</option>
                <option value="65">สิงห์บุรี</option>
                <option value="66">สุโขทัย</option>
                <option value="67">สุพรรณบุรี</option>
                <option value="68">สุราษฎร์ธานี</option>
                <option value="69">สุรินทร์</option>
                <option value="70">หนองคาย</option>
                <option value="71">หนองบัวลำภู</option>
                <option value="72">อ่างทอง</option>
                <option value="73">อำนาจเจริญ</option>
                <option value="74">อุดรธานี</option>
                <option value="75">อุตรดิตถ์</option>
                <option value="76">อุทัยธานี</option>
                <option value="77">อุบลราชธานี</option>
              </select>
            </div>
          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">

            <div >
              <label for="zip_member" class="block mb-2 text-sm font-medium text-gray-900 ">รหัสไปรษณีย์</label>
              <input type="text" id="zip_member" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกรหัสไปรษณีย์" />
            </div>
          </div>




        </div>
      </div>



      {/* กล่อง 4 */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">4. เอกสารของทายาท</p>

          <div>
            <label for="copy_house_heir" class="block mb-2 text-sm font-medium text-gray-900">สำเนาทะเบียนบ้าน</label>
            <input type="file" id="copy_house_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>

          <div class='mt-5'>
            <label for="copy_id_heir" class="block mb-2 text-sm font-medium text-gray-900">สำเนาบัตรประชาชน</label>
            <input type="file" id="copy_id_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>

          <div class='mt-5'>
            <label for="doc_rename_heir" class="block mb-2 text-sm font-medium text-gray-900">ใบเปลี่ยนชื่อ</label>
            <input type="file" id="doc_rename_heir" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร" />
          </div>
        </div>
      </div>


    </div>
  )
}

function CommitteCandidateProfile() {

  const [activeTab, setActiveTab] = useState('personalInfo');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [radio1, setRadio1] = useState("");
  const [radio2, setRadio2] = useState("");

  const isFormValid = radio1 !== "" && radio2 !== "";

  const navigate = useNavigate();

  const handleRadio1Change = (event) => {
    setRadio1(event.target.value);
  };

  const handleRadio2Change = (event) => {
    setRadio2(event.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const ConfirmModal = () => {
    alert('ยืนยันแล้วค่ะ/ครับ')
    setIsModalOpen(!isModalOpen);
    navigate('/committee_candidateList')
  }

  
  const ClearRadio = () => {
    setRadio1("");
    setRadio2("");
    setIsModalOpen(!isModalOpen);
  }


  return (
    <div class='ibm-plex-sans-thai-medium'>
      <div class="p-12 sm:ml-64 overflow-hidden">

        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li class="me-2">
            <button
              onClick={() => setActiveTab('personalInfo')}
              class={`inline-block p-4 rounded-t-lg ${activeTab === 'personalInfo'
                ? 'text-white bg-gray-600 dark:bg-gray-600'
                : 'text-gray-500 bg-gray-300 dark:text-white'}`}>

              ข้อมูลส่วนตัว

            </button>
          </li>
          {/* แท็บ ข้อมูลทายาท */}
          <li class="me-2">
            <button
              onClick={() => setActiveTab('heirInfo')}
              class={`inline-block p-4 rounded-t-lg ${activeTab === 'heirInfo'
                ? 'text-white bg-gray-600 dark:bg-gray-600'
                : 'text-gray-500 bg-gray-300 dark:text-white'
                }`}
            >
              ข้อมูลทายาท
            </button>
          </li>
        </ul>

        <div class="mb-8 overflow-hidden">
          {activeTab === 'personalInfo' && (

            <Information_personal />
          )}
          {activeTab === 'heirInfo' && (
            <Information_heir />
          )}
        </div>

        <hr class="h-px my-12 bg-gray-200 border-0 dark:bg-gray-500"></hr>


        <div>
          <div class="bg-gray-300 overflow-hidden rounded-xl shadow-xl mt-12">
            <div class="p-8">
              <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">ตรวจสอบเอกสารตามคุณสมบัติ</p>

              <div>
                <p class="block mt-1 mb-4 text-l leading-tight font-medium text-gray-900">1. ใบรับรองแพทย์ยังไม่หมดอายุ</p>
                <div class="flex">
                  <div class="flex items-center me-4">
                    <input id="radio1_1" type="radio" value="pass" name="radio1" onChange={handleRadio1Change} checked={radio1 === "pass"} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">ผ่านคุณสมบัติ</label>
                  </div>
                  <div class="flex items-center me-4">
                    <input id="radio1_2" type="radio" value="fail" name="radio1" onChange={handleRadio1Change} checked={radio1 === "fail"} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">ไม่ผ่านคุณสมบัติ</label>
                  </div>
                </div>
              </div>

              <div class='mt-6'>
                <p class="block mt-1 mb-4 text-l leading-tight font-medium text-gray-900">2. ใบรับรองแพทย์ยังไม่หมดอายุ</p>
                <div class="flex">
                  <div class="flex items-center me-4">
                    <input id="radio2_1" type="radio" value="pass" name="radio2" onChange={handleRadio2Change} checked={radio2 === "pass"} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">ผ่านคุณสมบัติ</label>
                  </div>
                  <div class="flex items-center me-4">
                    <input id="radio2_2" type="radio" value="fail" name="radio2" onChange={handleRadio2Change} checked={radio2 === "fail"} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">ไม่ผ่านคุณสมบัติ</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="relative mt-14 flex justify-center items-center">
          <button
            type="button"
            onClick={toggleModal}
            disabled={!isFormValid}
            class={`focus:outline-none text-white font-medium rounded-lg text-base px-5 py-2.5 me-9 mb-2 ${isFormValid
              ? 'bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            ส่งผลการตรวจสอบ
          </button>
        </div>






        {isModalOpen && (
          <div
            id="popup-modal"
            class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-100">
                <button
                  type="button"
                  onClick={toggleModal}
                  class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                  <svg class="mx-auto mb-4 text-gray-800 w-12 h-12 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p class="mb-1 text-lg font-bold text-gray-800 dark:text-gray-800">ยืนยันการตรวจสอบ</p>
                  <p class="mb-5 text-base font-normal text-gray-800 dark:text-gray-800">โปรดตรวจสอบความถูกต้อง <br /> ผลของการตรวจสอบก่อนกดยืนยัน </p>
                  <button
                    onClick={ConfirmModal}
                    class="text-white text-gray-900 focus:outline-none bg-white rounded-lg border border-lime-200 hover:bg-lime-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-lime-100 dark:focus:ring-lime-600 dark:bg-lime-700 dark:text-lime-400 dark:border-lime-500 dark:hover:text-white dark:hover:bg-lime-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    ยืนยัน
                  </button>
                  <button
                    onClick={toggleModal}
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={ClearRadio}
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    ล้างผลการตรวจสอบ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>


    </div>

  );
}

export default CommitteCandidateProfile