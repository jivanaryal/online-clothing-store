import axios from "axios";

const VerifyToken = async (token) => {
  console.log(token);
  try {
    const response = await axios.post(
      "http://localhost:5001/api/auth/ocs/customers/verify-token",
      { token }
    );
    return response.data.isValid;
  } catch (error) {
    console.error("Token verification failed", error);
    return false;
  }
};

export default VerifyToken;
