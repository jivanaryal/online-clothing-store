import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const formFields = [
    { name: "FirstName", type: "text", label: "First Name" },
    { name: "LastName", type: "text", label: "Last Name" },
    { name: "Email", type: "email", label: "Email" },
    { name: "Password", type: "password", label: "Password" },
    { name: "PhoneNumber", type: "text", label: "Phone Number" },
  ];

  const initialValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
  };

  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    Password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    PhoneNumber: Yup.string().required("Phone Number is required"),
  });

  const handleSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/ocs/customers/signup",
        values
      );
      toast.success(response.data.message);
      resetForm();
      if (response.data.message === "User registered successfully") {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label
                    className="block mb-1 text-gray-600"
                    htmlFor={field.name}
                  >
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-600"
                disabled={isSubmitting}
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
