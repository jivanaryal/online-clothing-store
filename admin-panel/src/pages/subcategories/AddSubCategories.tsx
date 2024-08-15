import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  subcategoryInitialValues,
  subcategoryField,
  subcategoryvalidation,
} from "./subcategory";
import { getSingle, post } from "../../services/api";
import { TCategory } from "../../types/category";
import { useEffect, useState } from "react";

type TValue = Omit<TCategory, "category_id">;
const AddSubCategories = () => {
  const [category, setCategory] = useState<TCategory[]>([]);
  const navigate = useNavigate();

  //   const[subcategory,setSubCategory] = useState([]);

  const postsubCategoryData = async (values: TValue) => {
    await post("/subcategories", values);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingle("/categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  subcategoryField[1].options = category.map((cat) => ({
    category_id: cat.category_id,
    name: cat.name,
  }));
  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Create Category
          </h2>
          <button
            onClick={() => navigate("/subcategories")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            View Sub Categories
          </button>
        </div>
        <Formik
          initialValues={subcategoryInitialValues}
          onSubmit={(values) => {
            console.log(values);
            postsubCategoryData(values);
          }}
          //   validationSchema={subcategoryvalidation}
        >
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              {subcategoryField.map((formValues, index) => {
                if (formValues.type === "text") {
                  return (
                    <div className="mb-4" key={index}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {formValues.broswername}
                      </label>
                      <Field
                        type={formValues.type}
                        name={formValues.name}
                        id="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  );
                }
                if (formValues.type === "textarea") {
                  return (
                    <div className="mb-4" key={index}>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {formValues.broswername}
                      </label>
                      <Field
                        as={formValues.type}
                        name={formValues.name}
                        rows={10}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  );
                }
                if (formValues.type === "select") {
                  return (
                    <div className="mb-4" key={index}>
                      <label htmlFor={formValues.broswername}>
                        {formValues.broswername}
                      </label>
                      <Field
                        as={formValues.type}
                        name={formValues.name}
                        value={values[formValues.name]}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="" disabled>
                          {" "}
                          select category option
                        </option>

                        {formValues.options?.map((option, index) => (
                          <option key={index} value={option.category_id}>
                            {option.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  );
                }
              })}

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSubCategories;
