import { createContext, useState } from "react";

const Auth = createContext();

export const AuthProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div></div>
    </div>
  );
};
