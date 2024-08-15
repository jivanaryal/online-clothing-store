import { Field, Formik, Form, ErrorMessage } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { categoryField, categoryvalidation } from "./category";
import { update } from "../../services/api";
import { TCategory } from "../../types/category";
import { toast, ToastContainer } from "react-toastify";

type TProps = Omit<TCategory, "category_id">;
const EditCategory = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = useParams();
  console.log(location);

  const updateCategoryData = async (values: TProps) => {
    try {
      const data = await update(`/categories/${id}`, values);
      if (data.status === 200) {
        toast.success("the category updated sucessfully");
        setTimeout(() => {
          navigate("/categories");
        }, 1500);
      } else {
        return console.log("error occur");
      }
    } catch (error) {
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Create Category
          </h2>
          <button
            onClick={() => navigate("/categories")}
            className="bg-blue-600 text-white py-2 px-2 text-xs  font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            View Categories
          </button>
        </div>
        <Formik
          initialValues={{
            name: location.state.name,
            description: location.state.description,
          }}
          onSubmit={(values) => {
            updateCategoryData(values);
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
                      <ErrorMessage
                        component={"div"}
                        name={formValues.name}
                        className="text-red-500 text-[12px] font-bold"
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
                      <ErrorMessage
                        component={"div"}
                        name={formValues.name}
                        className="text-red-500 text-[12px] font-bold"
                      />
                      <ToastContainer />
                    </div>
                  );
                }
              })}

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-sm text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
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

export default EditCategory;
