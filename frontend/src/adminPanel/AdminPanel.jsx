import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context";

export const AdminPanel = () => {
  const { token, setToggle } = useContext(Context);

  const [data, setData] = useState({
    name: "",
    lastName: "",
    specialisation: "",
    picture: "",
    nameOfService: "",
    city: "",
  });

  const handleInput = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, specialisation, picture, nameOfService, city } =
      data;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        {
          name,
          lastName,
          specialisation,
          picture,
          nameOfService,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToggle(0);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const containerStyle = {
    height: "74vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Vardas..."
            onChange={handleInput}
            name="name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pavarde..."
            onChange={handleInput}
            name="lastName"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Specializacija..."
            onChange={handleInput}
            name="specialisation"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="nuotrauka..."
            onChange={handleInput}
            name="picture"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="paslaugos pavadinimas..."
            onChange={handleInput}
            name="nameOfService"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="miestas..."
            onChange={handleInput}
            name="city"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Įkelti
          </button>
        </div>
      </form>
    </div>
  );
};
