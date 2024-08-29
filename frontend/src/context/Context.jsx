import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const MyProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [toggle, setToggle] = useState(0);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = () => {
    console.log("Search input:", searchInput);
    console.log("Posts:", posts);

    if (searchInput.trim() === "") {
      setFilteredPosts(posts); // Show all posts if search input is empty
    } else {
      const filtered = posts.filter((post) =>
        post.nameOfService.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log("Filtered posts:", filtered);
      setFilteredPosts(filtered);
    }
  };

  const handleToggle = () => {
    setToggle((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedUserId = localStorage.getItem("userId");

    if (storedRole) setRole(storedRole);
    if (storedToken) setToken(storedToken);
    if (storedName) setName(storedName);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <Context.Provider
      value={{
        role,
        setRole,
        token,
        setToken,
        toggle,
        setToggle,
        handleToggle,
        name,
        setName,
        userId,
        setUserId,
        searchInput,
        setSearchInput,
        handleSearch,
        posts,
        setPosts,
        filteredPosts,
        setFilteredPosts,
      }}
    >
      {children}
    </Context.Provider>
  );
};
