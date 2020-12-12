import React, { useState } from "react";
import { useNotification } from "../../notifications/NotificationProvider";

export default function PostUpdateForm({ post, onUpdateClick, setIsUpdating }) {
  const [body, setBody] = useState(post.body);
  const [title, setTitle] = useState(post.title)
  //Notification Creator
  const dispatch = useNotification();
  const handleUpdateNotification = () => {
    dispatch({
      type: "SUCCESS",
      message: "Updating Post!",
    });
  };

  return (
    <div>
      <label className="custom-field">
        <textarea
          type="text"
          required
          className="updateText"
          rows="1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="placeholder"></span>
      </label>



      <label className="custom-field">
        <textarea
          type="text"
          required
          className="updateText"
          rows="5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <span className="placeholder"></span>
      </label>

      <div>
        <button
          type="submit"
          className="medium-button"
          onClick={() => {
            onUpdateClick({ ...post, body, title });
            handleUpdateNotification();
            setIsUpdating(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
