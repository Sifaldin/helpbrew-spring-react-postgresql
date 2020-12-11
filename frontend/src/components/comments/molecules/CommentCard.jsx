import React, { useState, useEffect } from "react";
import CommentUpdateForm from "../organisms/CommentUpdateForm";
import Api from "../../../api/Api";
import { useNotification } from "../../notifications/NotificationProvider";

function CommentCard({ comment, onDeleteClick, onUpdateClick }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [reaction, setReaction] = useState(comment.reaction);
  const [user, setUser] = useState("");

  console.log(comment);
  //Notification Creator
  const dispatch = useNotification();
  const handleDeletenotification = () => {
    dispatch({
      type: "ERROR",
      message: "Deleting Comment...",
    });
  };

  useEffect(() => {
    Api.get("/user/me").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  // const incrementLike = () => {
  //   const url = "/reactions/" + reaction.id + "?incrementTarget=like";
  //   Api.put(url, reaction).then((r) => {
  //     setReaction(r.data);
  //   });
  // };

  // const incrementDislike = () => {
  //   const url = "/reactions/" + reaction.id + "?incrementTarget=dislike";
  //   Api.put(url, reaction).then((r) => {
  //     setReaction(r.data);
  //   });
  // };

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

      {/* <div>
        <button onClick={incrementLike}>
          <i></i> {reaction.like}
        </button>
        <button onClick={incrementDislike}>
          <i></i> {reaction.dislike}
        </button>
      </div> */}

      <div className="button-group">
        {comment.user.name === user.name ? (
          <div>
            <button className="medium-button" onClick={handleUpdateClick}>
              Update
            </button>

            <button
              className="medium-button"
              onClick={() => onDeleteClick(comment.id)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CommentCard;
