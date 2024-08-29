import axios from "axios";
import { useEffect, useContext } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { ListCards } from "../listCards/ListCards";
import { AdminHome } from "../adminHome/AdminHome";
import { Context } from "../context/Context";

export const Home = () => {
  const { role } = useContext(Context);

  // Debugging useEffect
  useEffect(() => {
    console.log("Role has changed:", role);
  }, [role]);

  return (
    <div>
      <Header />
      {role === "admin" ? <AdminHome /> : <ListCards />}
      <Footer />
    </div>
  );
};
