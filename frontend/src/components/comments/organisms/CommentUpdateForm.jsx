import React, { useState } from "react";
import { useNotification } from "../../notifications/NotificationProvider";

function CommentUpdateForm({ oldComment, onUpdateClick, setIsUpdating }) {
  const [body, setBody] = useState(oldComment.body);

  //Notification Creator
  const dispatch = useNotification();
  const handleUpdateNotification = () => {
    dispatch({
      type: "SUCCESS",
      message: "Updating Comment!",
    });
  };

  return (
    <div className="comment-area">
      <textarea
        placeholder="type your comment here.."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        className="medium-button"
        onClick={() => {
          onUpdateClick({ ...oldComment, body });
          setIsUpdating(false);
          handleUpdateNotification();
        }}
      >
        Save
      </button>
    </div>
  );
}

export default CommentUpdateForm;
