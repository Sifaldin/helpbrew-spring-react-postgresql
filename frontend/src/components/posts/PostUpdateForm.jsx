import React, { useState } from "react";

export default function PostUpdateForm({
  oldPost,
  onUpdateClick,
  setIsUpdating,
}) {
  const [body, setBody] = useState(oldPost.body);

  return (
    <div>
      <textarea
        className="form-control comment-text"
        placeholder="What else do you wanna add?"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        className="comment-btn"
        onClick={() => {
          onUpdateClick({ ...oldPost, body });
          setIsUpdating(false);
        }}
      >
        Save
      </button>
    </div>
  );
}
