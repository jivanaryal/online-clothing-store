import { Field, Formik, Form } from "formik";
import { FormFields, initialValues, validationSchema } from "./products";
import { useEffect, useState } from "react";
import { getSingle } from "../../services/api";
import axios from "axios";
import { TCategory } from "../../types/category";
import { TSubCategory } from "../../types/subcategory";

const AddProduct = () => {
  const [category, setCategory] = useState<TCategory[]>([]);
  const [subCategory, setSubCategory] = useState<TSubCategory[]>([]);

  useEffect(() => {
    async function getCategory() {
      const res = await getSingle("/categories");
      setCategory(res.data);
    }

    getCategory();
  }, []);

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const categoryId = event.target.value;
    setFieldValue("category_id", categoryId); // Update the Formik state

    if (categoryId) {
      const res = await axios.get(
        `http://localhost:5001/api/ocs/subcategories?category_id=${categoryId}`
      );
      setSubCategory(res.data);
    } else {
      setSubCategory([]);
    }
  };

  FormFields[1].options = category.map((cat) => ({
    category_id: cat.category_id,
    name: cat.name,
  }));
  FormFields[2].options = subCategory.map((sub) => ({
    subcategory_id: sub.subcategory_id,
    name: sub.name,
  }));

  return (
    <main>
      <h1 className="text-center text-2xl font-semibold my-10">
        Create Product
      </h1>

      <section className=" ">
        <div className=" ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(val) => {
              console.log(val);
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form
                onSubmit={handleSubmit}
                className="border-2 w-5/12 mx-auto p-10 rounded-sm min-h-screen"
              >
                <div className=" ">
                  {FormFields.map((formValues, index) => {
                    if (formValues.type === "select") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-2 mb-4 capitalize text-gray-600 text-sm "
                        >
                          <label
                            htmlFor={formValues.name}
                            className="font-semibold"
                          >
                            {formValues.broswername}
                          </label>
                          <Field
                            as="select"
                            name={formValues.name}
                            value={values[formValues.name]} // Controlled by Formik
                            className="py-2  w-full border-2 px-2 rounded text-gray-700 "
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              formValues.name === "category_id"
                                ? handleCategoryChange(event, setFieldValue)
                                : setFieldValue(
                                    formValues.name,
                                    event.target.value
                                  )
                            }
                          >
                            <option value="" disabled>
                              Choose {formValues.broswername}
                            </option>

                            {formValues.options?.map((option) => (
                              <option
                                key={
                                  option.category_id ||
                                  option.subcategory_id ||
                                  option.name
                                }
                                value={
                                  formValues.name === "category_id"
                                    ? option.category_id
                                    : option.subcategory_id
                                }
                              >
                                {option.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      );
                    }
                    // Handle other field types here
                    return null; // Handle other cases like text, number, etc.
                  })}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 mb-5 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
