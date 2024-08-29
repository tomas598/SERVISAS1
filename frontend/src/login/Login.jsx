import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const { setRole, setToken, setName, setUserId } = useContext(Context);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, role } = response.data;
      const { name, _id } = response.data.user;
      setToken(token);
      setRole(role);
      setName(name);
      setUserId(_id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", _id);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const containerStyle = {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      <h1>Prisijungimas</h1>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Elektroninis paštas..."
            onChange={handleInput}
            name="email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Slaptažodis..."
            onChange={handleInput}
            name="password"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Prisijungti
          </button>
          <span>
            Neturite paskyros? galite prisijungti spausdami{" "}
            <Link to="/register">čia</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
