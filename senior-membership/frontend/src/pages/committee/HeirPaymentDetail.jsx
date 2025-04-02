import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


function HeirPaymentDetail() {
  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12">
        <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl relative mt-8">
          <div class="p-8">
            <div class="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="id_number_heir"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  เลขรหัสทายาท
                </label>
                <input
                  type="text"
                  id="id_number_heir"
                  // value={infoMember.member_id}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                  placeholder="กรอกเลข"
                />
              </div>

              <div>
                <label
                  htmlFor="full_name_heir"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  ชื่อทายาท
                </label>
                <input
                  type="text"
                  id="full_name_heir"
                  // value={infoMember.name}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                  placeholder="กรอกชื่อของผู้สมัคร"
                />
              </div>

              <div>
                <label
                  htmlFor="death_day_heir"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  ประเภทการชำระเงิน
                </label>
                <input
                  id="death_day_heir"
                  value="โอนเงินสงเคราะห์"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                  readOnly
                />
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />
            <Formik
              initialValues={{
                proof_path: "",
                amount: "",
                paid_at: "",
              }}
              //   validationSchema={}
              //   onSubmit={}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ values, errors, touched, isValid, dirty }) => {
                return (
                  <Form>
                    <div class="grid gap-6 md:grid-cols-1 mb-8">
                      <div>
                        <label
                          htmlFor="proof_path"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          ไฟล์หลักฐานการชำระเงิน
                        </label>
                        <Field
                          type="file"
                          name="proof_path"
                          id="proof_path"
                          class={`bg-light ${
                            errors.proof_path && touched.proof_path
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage
                          name="proof_path"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>
                    <div class="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="amount"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          จำนวนเงินที่โอน
                        </label>
                        <Field
                          type="text"
                          name="amount"
                          id="amount"
                          class={`bg-light ${
                            errors.amount && touched.amount
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage
                          name="amount"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="paid_at"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          เวลาในการชำระเงิน (เวลาจากหลักฐานการชำระเงิน)
                        </label>
                        <Field
                          type="time"
                          name="paid_at"
                          id="paid_at"
                          class={`bg-light ${
                            errors.paid_at && touched.paid_at
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage
                          name="paid_at"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>
                    {errors.apiError && (
                      <div class="text-red-500 text-sm mt-2 text-center">
                        {errors.apiError}
                      </div>
                    )}
                    <div class="flex justify-center space-x-2 mt-8">
                      <button
                        type="submit"
                        class={`text-white bg-lime-800 hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm 
                                                ${
                                                  !isValid || !dirty
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                                }`}
                        disabled={!isValid || !dirty}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeirPaymentDetail;
