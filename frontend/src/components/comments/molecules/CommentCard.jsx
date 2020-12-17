import React, { useState, useEffect } from "react";
import CommentUpdateForm from "../organisms/CommentUpdateForm";
import Api from "../../../api/Api";


function CommentCard({ comment, onDeleteClick, onUpdateClick }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState("");

  
  //Notification Creator



  useEffect(() => {
    Api.get("/user/me").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };



  return (
    <div className="comment-card">
      <div className="signature">
        <img
          className="comment-user"
          src={comment.user.imageUrl}
          alt="Comment author img"
        />
        <div>
          <span className="user-name">{comment.user.name}</span>
          <span className="date">{comment.date}</span>
        </div>
      </div>

      {isUpdating ? (
        <CommentUpdateForm
          oldComment={comment}
          onUpdateClick={onUpdateClick}
          setIsUpdating={setIsUpdating}
        />
      ) : (
        <p>{comment.body}</p>
      )}


      {comment.user.name === user.name ? (
        <div className="button-group">
          <button className="medium-button" onClick={handleUpdateClick}>
            Update
          </button>

          <button
            className="medium-button pink"
            onClick={() => onDeleteClick(comment.id)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentCard;
