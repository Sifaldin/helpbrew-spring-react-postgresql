import React, { useState, useEffect } from "react";
import CommentUpdateForm from "../organisms/CommentUpdateForm";
import Api from "../../../api/Api";
import { useNotification } from "../../notifications/NotificationProvider";

function CommentCard({ comment, onDeleteClick, onUpdateClick }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [reaction, setReaction] = useState(comment.reaction);
  const [name, setName] = useState("");

  //Notification Creator
  const dispatch = useNotification();
  const handleDeletenotification = () => {
    dispatch({
      type: "ERROR",
      message: "Deleting Comment...",
    });
  };


  useEffect(() => {
    Api.get("/user/").then((response) => {
      const name = response.data;
      setName(name);
    });
  }, []);

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  const incrementLike = () => {
    const url = "/reactions/" + reaction.id + "?incrementTarget=like";
    Api.put(url, reaction).then((r) => {
      setReaction(r.data);
    });
  };

  const incrementDislike = () => {
    const url = "/reactions/" + reaction.id + "?incrementTarget=dislike";
    Api.put(url, reaction).then((r) => {
      setReaction(r.data);
    });
  };

  console.log(name);

  return isUpdating ? (
    <CommentUpdateForm
      oldComment={comment}
      onUpdateClick={onUpdateClick}
      setIsUpdating={setIsUpdating}
    />
  ) : (
    <div>
      <h5>{comment.authorName}</h5>
      <h4>{comment.body}</h4>

      {/*<div>
        <button onClick={incrementLike}>
          <i></i> {reaction.like}
        </button>
        <button onClick={incrementDislike}>
          <i></i> {reaction.dislike}
        </button>
      </div>*/}

      {comment.authorName === name ? (
        <div>
          
            
          <button onClick={() => {
            onDeleteClick(comment.id);
            handleDeletenotification();

            }}>Delete</button>

          <button onClick={handleUpdateClick}>Update</button>
          
        </div>
      ) : null}
    </div>
  );
}

export default CommentCard;
