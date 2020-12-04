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
      <textarea
        
        placeholder="What else do you wanna add?"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        
        onClick={() => {
          onUpdateClick({ ...oldPost, body });
          handleUpdateNotification();
          setIsUpdating(false);
        }}
      >
        Save
      </button>
    </div>
  );
}
