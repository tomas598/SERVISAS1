import { useState } from "react";
import { ListCards } from "../listCards/ListCards";
import { AdminPanel } from "../adminPanel/AdminPanel";
import { useContext } from "react";
import { Context } from "../context/Context";

export const AdminHome = () => {
  const { toggle, setToggle, handleToggle } = useContext(Context);

  const style = {
    paddingTop: "70px",
    display: "flex",
    flexDirection: "collumn",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div>
      <div style={style}>
        <button className="btn btn-secondary" onClick={handleToggle}>
          {toggle === 0 ? "Įkelti skelbimą" : "Pamatyti skelbimus"}
        </button>
      </div>
      <div>{toggle === 0 ? <ListCards /> : <AdminPanel />}</div>
    </div>
  );
};
