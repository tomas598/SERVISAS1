import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

export const Logout = () => {
  const { setRole, setToken } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");

      // Clear context and localStorage
      setRole("");
      setToken("");
      localStorage.setItem("role", "");
      localStorage.setItem("token", "");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondar">
      Atsijungti
    </button>
  );
};
