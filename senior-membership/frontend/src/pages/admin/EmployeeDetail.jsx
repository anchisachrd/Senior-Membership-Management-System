import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from '../../components/ConfirmModal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'


function GetEmployeeDetail(employee) {

  const onChangePosition = (position) => {
    return position === 'staff' ? 'เจ้าหน้าที่' : 'กรรมการ';
  }

  const onChangeIsPay = (is_pay) => {
    return is_pay === true ? 'มีสิทธิ์ในการชำระเงิน' : 'ไม่มีสิทธิ์ในการชำระเงิน';
  }

  return (
    <div>
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">
            ตำแหน่ง
          </label>
          <input
            value={onChangePosition(employee.employee.position)}
            name="position"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
            คำนำหน้า
          </label>
          <input
            value={employee.employee.title}
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>

        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
            ชื่อจริง
          </label>
          <input
            value={employee.employee.first_name}
            name="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>

        <div>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
            นามสกุล
          </label>
          <input
            value={employee.employee.last_name}
            name="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>

        <div>
          <label htmlFor="national_id" className="block mb-2 text-sm font-medium text-gray-900">
            เลขบัตรประชาชน
          </label>
          <input
            value={employee.employee.national_id}
            name="national_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            เบอร์โทรศัพท์
          </label>
          <input
            value={employee.employee.phone}
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            อีเมล
          </label>
          <input
            value={employee.employee.email}
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
            readOnly

          />
        </div>
      </div>

      {employee.employee.position === 'committee' && (
        <div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />

          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="is_pay" className="block mb-2 text-sm font-medium text-gray-900">
                สิทธิ์ในการชำระเงิน
              </label>
              <input
                value={onChangeIsPay(employee.employee.is_pay)}
                name="is_pay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly

              />
            </div>
            {employee.employee.is_pay && (
              <div>
                <label htmlFor="type_payment" className="block mb-2 text-sm font-medium text-gray-900">
                  ประเภทการชำระเงิน
                </label>
                <input
                  value={employee.employee.type_payment}
                  name="type_payment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                  readOnly

                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function UpdateEmployeeDetail(employee) {

  const [updateEmployee, setUpdateEmployee] = useState([])
  

  const navigate = useNavigate();

  const openModal = (title, description, confirmCallback) => {
    setModalTitle(title);
    setModalDescription(description);
    setOnConfirmAction(() => confirmCallback);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [onConfirmAction, setOnConfirmAction] = useState(() => { });
  


  useEffect(() => {
    setUpdateEmployee(employee.employee)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmployee({
      ...updateEmployee,
      [name]: value
    });
  };

  const handleUpdateEmployee = async () => {

    let is_pay = updateEmployee.is_pay;
    let type_payment = updateEmployee.type_payment;


  if (updateEmployee.position === 'staff') {
    is_pay = false;
    type_payment = null;
  } else if (updateEmployee.position === 'committee' && updateEmployee.is_pay === false) {
    is_pay = false;
    type_payment = null;
  } else if (updateEmployee.is_pay === false || updateEmployee.is_pay === 'false') {
    is_pay = false;
    type_payment = null;
  }

    const data = {
      "title": updateEmployee.title,
      "first_name": updateEmployee.first_name,
      "last_name": updateEmployee.last_name,
      "position": updateEmployee.position,
      "national_id": updateEmployee.national_id,
      "phone": updateEmployee.phone,
      "email": updateEmployee.email,
      "is_pay": is_pay,
      "type_payment": type_payment,
      "employee_id": employee.employee.employee_id,
      "account_id": employee.employee.account_id,
    }

    try {
      const response = await fetch("http://localhost:3000/api/employee/emp-update-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
      }

      if (response.ok) {
        alert("แก้ไขข้อมูลพนักงานเรียบร้อยแล้ว!");
        navigate('/manage-employee')
      }


    } catch (error) {
      console.error("Update Employee Error:", error.message);
    }

  }




  return (
    <div>
      <ConfirmModal
        isOpen={isModalOpen}
        title={modalTitle}
        description={modalDescription}
        onConfirm={() => {
          onConfirmAction();
          closeModal();
        }}
        onCancel={closeModal}
      />
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">
            ตำแหน่ง
          </label>
          <select
            value={updateEmployee.position}
            onChange={handleChange}
            name="position"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
          >

            <option value="" hidden>
              เลือกตำแหน่ง
            </option>
            <option value="staff">เจ้าหน้าที่</option>
            <option value="committee">กรรมการ</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
            คำนำหน้า
          </label>
          <select
            value={updateEmployee.title}
            onChange={handleChange}
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


          >
            <option value="" hidden>
              เลือกคำนำหน้า
            </option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
        </div>

        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
            ชื่อจริง
          </label>
          <input
            value={updateEmployee.first_name}
            onChange={handleChange}
            name="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


          />
        </div>

        <div>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
            นามสกุล
          </label>
          <input
            value={updateEmployee.last_name}
            onChange={handleChange}
            name="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


          />
        </div>

        <div>
          <label htmlFor="national_id" className="block mb-2 text-sm font-medium text-gray-900">
            เลขบัตรประชาชน
          </label>
          <input
            value={updateEmployee.national_id}
            onChange={handleChange}
            name="national_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            เบอร์โทรศัพท์
          </label>
          <input
            value={updateEmployee.phone}
            onChange={handleChange}
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            อีเมล
          </label>
          <input
            value={updateEmployee.email}
            onChange={handleChange}
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


          />
        </div>
      </div>

      {updateEmployee.position === 'committee' && (
        <div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />

          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="is_pay" className="block mb-2 text-sm font-medium text-gray-900">
                สิทธิ์ในการชำระเงิน
              </label>
              <select
                value={updateEmployee.is_pay}
                onChange={handleChange}
                name="is_pay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"


              >
                <option value="" hidden>
                  เลือกการให้สิทธิ์การชำระเงิน
                </option>
                <option value="true">มีสิทธิ์ในการชำระเงิน</option>
                <option value="false">ไม่มีสิทธิ์ในการชำระเงิน</option>
              </select>
            </div>
            {(updateEmployee.is_pay === 'true' || updateEmployee.is_pay === true) && (
              <div>
                <label htmlFor="type_payment" className="block mb-2 text-sm font-medium text-gray-900">
                  ประเภทการชำระเงิน
                </label>
                <select
                  value={updateEmployee.type_payment}
                  onChange={handleChange}
                  name="type_payment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                >
                  <option value="" hidden>
                    เลือกประเภทการชำระเงิน
                  </option>
                  <option value="โอนเงินค่าสงเคราะห์">โอนเงินค่าสงเคราะห์</option>
                  <option value="ค่าใช้จ่ายทั่วไปในชมรม">ค่าใช้จ่ายทั่วไปในชมรม</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div class="flex justify-center space-x-2 py-3">
        <button type="submit" class='text-white bg-lime-800 hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm'
          onClick={() =>
            openModal(
              "ยืนยันการแก้ไขข้อมูลพนักงาน",
              "โปรดตรวจสอบความถูกต้องและครบถ้วนของข้อมูลก่อนกดยืนยัน",
              () => handleUpdateEmployee()
            )}>
          แก้ไขข้อมูล
        </button>
      </div>
    </div>
  )
}



function EmployeeDetail() {
  const [employee, setEmployee] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { employeeId } = useParams();

  const openModal = (title, description, confirmCallback) => {
    setModalTitle(title);
    setModalDescription(description);
    setOnConfirmAction(() => confirmCallback);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [onConfirmAction, setOnConfirmAction] = useState(() => { });
    const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/employee/emp-detail-info/${employeeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        setEmployee(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEmployee();
  }, [employeeId]);


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  }

  const deleteEmployee = async () => {

    const data = {
      "account_id": employee.account_id,
      "employee_id": employee.employee_id
    }

    console.log(data)

    try {
      const response = await fetch(`http://localhost:3000/api/employee/emp-delete/${employee.employee_id}/${employee.account_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        const errorData = await response.json(); // อ่าน error จาก API
        console.error("Delete Failed:", errorData);

        return;
      }
  
      alert('ลบข้อมูลพนักงานเรียบร้อยแล้ว');
      navigate('/manage-employee');
  

    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <li className="me-2">
            <button className={`inline-block p-4 rounded-t-lg text-white bg-gray-600`}>
              ข้อมูลพนักงาน
            </button>
          </li>
        </ul>

        <ConfirmModal
        isOpen={isModalOpen}
        title={modalTitle}
        description={modalDescription}
        onConfirm={() => {
          onConfirmAction();
          closeModal();
        }}
        onCancel={closeModal}
      />

        <div className="bg-gray-50 overflow-hidden rounded-xl shadow-xl relative">
          <div className="p-8">
            <button
              className={`absolute top-4 right-4 text-gray-800 font-medium rounded-lg text-sm py-2 px-3 ${isEditing ? 'bg-gray-400' : 'bg-yellow-400'}`}
              onClick={handleEditClick}
            >
              {isEditing ? 'แก้ไขอยู่' : 'แก้ไข'}
            </button>

            {!isEditing && (
              <button
              className='absolute top-4 right-20 text-white font-medium rounded-lg text-sm py-2 px-3 bg-red-700'
              onClick={() =>
                openModal(
                  "ยืนยันการลบข้อมูลพนักงาน",
                  "ถ้าลบข้อมูลแล้ว ไม่สามารถกู้คืนได้",
                  () => deleteEmployee()
                )}>
              ลบข้อมูล
            </button>
            )}
            

            {!isEditing && <GetEmployeeDetail employee={employee} />}
            {isEditing && <UpdateEmployeeDetail employee={employee} />}


          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail;
