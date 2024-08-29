import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (!token) return false; // If there's no token, the user is not authenticated

    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      }
    );

    return response.data.isAuthenticated; // Access the data directly
  } catch (error) {
    console.error("Authentication check failed:", error); // Log error for debugging
    return false;
  }
};
