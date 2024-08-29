import { useContext } from "react";
import { Context } from "../context/Context";

export const Card = ({
  city,
  lastName,
  name,
  nameOfService,
  picture,
  specialisation,
  onDelete,
  onLike,
  onUnlike,
  likes,
}) => {
  const { userId, role } = useContext(Context);

  const handleLikeClick = () => {
    if (likes.includes(userId)) {
      onUnlike();
    } else {
      onLike();
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={picture}
        alt="Card image cap"
        className="card-img-top img-fluid"
      />
      <div className="card-body">
        <h3 className="card-title">{nameOfService}</h3>
        <p className="card-text"></p>
        <p className="card-text">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{specialisation}</li>
            <li class="list-group-item">
              {name} {lastName}
            </li>
            <li class="list-group-item">{city}</li>
          </ul>
        </p>
        <div className="d-flex justify-content-between">
          <button onClick={handleLikeClick} className="btn btn-primary">
            <i class="bi bi-hand-thumbs-up-fill"></i>
            {likes.length}
          </button>
          {role === "admin" ? (
            <button onClick={onDelete} className="btn btn-danger">
              <i class="bi bi-trash3"></i>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
