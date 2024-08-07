import axios from "axios";

interface VerifyTokenResponse {
  isValid: boolean;
}

const VerifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post<VerifyTokenResponse>(
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
