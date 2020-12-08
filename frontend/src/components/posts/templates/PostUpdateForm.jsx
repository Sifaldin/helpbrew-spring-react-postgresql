import React, { useState } from "react";
import { useNotification } from "../../notifications/NotificationProvider";

export default function PostUpdateForm({
  oldPost,
  onUpdateClick,
  setIsUpdating,
}) {

  const [body, setBody] = useState(oldPost.body);

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
      // className="card-input"
      rows="5"
      value = {body}
      onChange={(e) => setBody(e.target.value)}
    />
    <span className="placeholder"></span>
  </label>

    <div>

      <button
        type="submit"
        className="medium-button"
        onClick={() => {
          onUpdateClick({ ...oldPost, body });
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
