import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { discountvalidation, discountField } from "./discount";
import { getSingle, update } from "../../services/api";
import axios from "axios";

type UpdateProductDiscountProps = {
  newId: number;
};

const EditProductDiscount: React.FC<UpdateProductDiscountProps> = ({
  newId,
}) => {
  const [initialValues, setInitialValues] = useState({
    product_id: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const[disId,setDidID] = useState(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
      const res = await axios.get(`http://localhost:5001/api/ocs/discounts/products/${newId}`);

      // console.log(res.data)
      setDidID(res.data[0].discount_id);
      const fetchedData = {
        product_id: res.data[0].product_id || "",
        discount_percentage: res.data[0].discount_percentage || "",
        start_date: res.data[0].start_date || "",
        end_date: res.data[0].end_date || "",
        description: res.data[0].description || ""
      };
    
      setInitialValues(prevValues=>{
        if(JSON.stringify(prevValues) != JSON.stringify(fetchedData)){
          return fetchedData
        }
         return prevValues;
      });
      console.log(initialValues)
    } catch(error){
      console.error("Error fetching discount data:", error);
    }
  }
    fetchDiscount();
  }, [newId]);

  const handleSubmit = async (values) => {
    try {
      await update(`/discounts/${disId}`, values);
      location.reload();
      
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Update Product Discount
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={discountvalidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6">
            {discountField.map((field, index) => {
              if (field.name === "product_id") {
                return (
                  <div key={index} className="col-span-1">
                    <label
                      htmlFor={field.name}
                      className="block text-lg font-medium text-gray-700"
                    >
                      {field.broswername}
                    </label>
                    <Field
                      name={field.name}
                      id={field.name}
                      type="number"
                      
                      readOnly
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>
                );
              } else if (
                field.name === "start_date" ||
                field.name === "end_date"
              ) {
                return (
                  <div key={field.name} className="col-span-1">
                    <label
                      htmlFor={field.name}
                      className="block text-lg font-medium text-gray-700"
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
                          className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={field.name} className="col-span-1">
                    <label
                      htmlFor={field.name}
                      className="block text-lg font-medium text-gray-700"
                    >
                      {field.broswername}
                    </label>
                    <Field
                      as={field.type === "textarea" ? "textarea" : "input"}
                      type={field.type !== "textarea" ? field.type : undefined}
                      name={field.name}
                      id={field.name}
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>
                );
              }
            })}
            <div className="col-span-1">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Update Discount
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductDiscount;
