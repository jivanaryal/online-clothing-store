import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { discountvalidation, discountField } from "./discount";

type AddProductDiscountProps = {
  newId: number;
};

const AddProductDiscount: React.FC<AddProductDiscountProps> = ({ newId }) => {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  const today = new Date();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Add Product Discount
      </h2>
      <Formik
        initialValues={{
          product_id: newId,
          discount_percentage: "",
          start_date: "",
          end_date: "",
          description: "",
        }}
        validationSchema={discountvalidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-2 gap-6">
            {discountField.map((field, index) => {
              if (field.name === "product_id") {
                return (
                  <div key={index} className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.broswername}
                    </label>
                    <Field
                      name={field.name}
                      id={field.name}
                      type="number"
                      value={newId}
                      readOnly
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                );
              } else if (
                field.name === "start_date" ||
                field.name === "end_date"
              ) {
                return (
                  <div key={field.name} className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.broswername}
                    </label>
                    <Field name={field.name}>
                      {({ field, form }: FieldProps) => (
                        <DatePicker
                          {...field}
                          selected={
                            (field.value && new Date(field.value)) || null
                          }
                          onChange={(val) => setFieldValue(field.name, val)}
                          minDate={today}
                          className="mt-1 block w-[290px] p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={field.name} className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.broswername}
                    </label>
                    <Field
                      as={field.type === "textarea" ? "textarea" : "input"}
                      type={field.type !== "textarea" ? field.type : undefined}
                      name={field.name}
                      id={field.name}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                );
              }
            })}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductDiscount;
