import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  categoryField,
  categoryInitialValues,
  categoryvalidation,
} from "./category";

const AddCategories = () => {
  const navigate = useNavigate();

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
            console.log(values);
          }}
          validationSchema={categoryvalidation}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
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
