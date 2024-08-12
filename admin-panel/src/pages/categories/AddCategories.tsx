import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  categoryField,
  categoryInitialValues,
  categoryvalidation,
} from "./category";
import { post } from "../../services/api";

const AddCategories = () => {
  const navigate = useNavigate();

  const postCategoryData = async (values) => {
    await post("/categories", values);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Create Category
          </h2>
          <button
            onClick={() => navigate("/categories")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            View Categories
          </button>
        </div>
        <Formik
          initialValues={categoryInitialValues}
          onSubmit={(values) => {
            postCategoryData();
          }}
          validationSchema={categoryvalidation}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {categoryField.map((formValues, index) => {
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
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
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

export default AddCategories;
