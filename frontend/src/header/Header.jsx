import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { Logout } from "../logout/Logout";

export const Header = () => {
  const {
    name,
    searchInput,
    setSearchInput,
    handleSearch,
    setPosts,
    setFilteredPosts,
    posts,
  } = useContext(Context);

  const handleGetPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
      setFilteredPosts(response.data); // Initially display all posts
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput, posts]); // Trigger search whenever searchInput or posts change

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 z-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          SERVISAS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex w-100"
            role="search"
            onSubmit={handleFormSubmit}
          >
            <input
              type="search"
              className="form-control me-2"
              aria-label="Search"
              placeholder="Ieskoti..."
              value={searchInput} // Bind the value to searchInput state
              onChange={handleInput}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              sieskoti
            </button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Meniu
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">{name}</li>
                <li>
                  <Logout />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
