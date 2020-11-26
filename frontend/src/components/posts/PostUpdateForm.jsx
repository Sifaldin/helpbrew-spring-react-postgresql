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
        
        placeholder="What else do you wanna add?"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        
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
