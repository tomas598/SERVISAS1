import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Card } from "../card/Card";
import { Context } from "../context/Context";

export const ListCards = () => {
  const { token, posts, setPosts, filteredPosts, searchInput } =
    useContext(Context);
  const [loadingLikes, setLoadingLikes] = useState({});

  const handleGetPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      console.error("No valid token");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleLike = async (id) => {
    if (!token) {
      console.error("No valid token found, please log in again.");
      return;
    }

    setLoadingLikes((prevState) => ({ ...prevState, [id]: true }));

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (err) {
      console.error(
        "Error liking post",
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoadingLikes((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handleUnlike = async (id) => {
    if (!token) {
      console.error("No valid token found, please log in again.");
      return;
    }

    setLoadingLikes((prevState) => ({ ...prevState, [id]: true }));

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/unlike/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (err) {
      console.error(
        "Error unliking post",
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoadingLikes((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const gridStyle = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
    gap: "20px",
    padding: "80px",
  };

  const heightStyle = {
    minHeight: "74vh",
  };

  return (
    <div style={heightStyle}>
      <div style={gridStyle}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post._id}
              city={post.city}
              lastName={post.lastName}
              name={post.name}
              nameOfService={post.nameOfService}
              picture={post.picture}
              specialisation={post.specialisation}
              onDelete={() => handleDelete(post._id)}
              onLike={() => handleLike(post._id)}
              onUnlike={() => handleUnlike(post._id)}
              likes={post.likes}
              loadingLike={loadingLikes[post._id]} // Pass loading state to the Card component
            />
          ))
        ) : (
          <div>Nera jokių skelbimų: {searchInput}</div>
        )}
      </div>
    </div>
  );
};
