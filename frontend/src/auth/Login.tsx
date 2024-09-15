import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyFormValues {
  Email: string;
  Password: string;
}

// Define the initial values
const initialValues: MyFormValues = {
  Email: "",
  Password: "",
};

// Define the validation schema
const validationSchema = Yup.object({
  Email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  Password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();  // Get the previous location

  // Extract the redirect path from state, defaulting to homepage
  const from = (location.state as { from: string })?.from || "/";

  // Handle form submission
  const handleLogin = async (
    values: MyFormValues,
    { setSubmitting, resetForm }: FormikHelpers<MyFormValues>
  ) => {
    try {
      // Perform the login request
      const response = await axios.post(
        "http://localhost:5001/api/auth/ocs/customers/login",
        values
      );
      
      // Check if the login was successful
      if (response.data.message === "Login successful") {
        console.log(response.data);
        toast.success(response.data.message);
        
        // Store the token in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('CustomerID', response.data.CustomerID);
        
        // Mark the user as authenticated
        setIsAuthenticated(true);
        
        // Redirect to the previous or default page
        navigate(from);
        window.location.reload()
        
        // Reset the form
        resetForm();
      } else {
        toast.error("Unexpected response from the server");
      }
      
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block mb-1 text-gray-600" htmlFor="Email">
                  Email
                </label>
                <Field
                  type="email"
                  name="Email"
                  id="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600" htmlFor="Password">
                  Password
                </label>
                <Field
                  type="password"
                  name="Password"
                  id="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-600"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
