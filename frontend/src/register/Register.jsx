import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  const containerStyle = {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      <h1>Registracija</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="email..."
            onChange={handleInput}
            name="name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="email..."
            onChange={handleInput}
            name="email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password..."
            onChange={handleInput}
            name="password"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Prisiregistruoti
          </button>
          <span> </span>
          <span>
            Jau turite paskyrą? galite prijungti <Link to="/login">čia</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
