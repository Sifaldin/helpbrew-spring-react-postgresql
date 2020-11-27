import React, { useState } from "react";

function CommentUpdateForm({ oldComment, onUpdateClick, setIsUpdating }) {
  const [body, setBody] = useState(oldComment.body);

  return (
    <div>
      <textarea
        
        placeholder="type your comment here.."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        
        onClick={() => {
          const updated = { ...oldComment, body };
          console.log(updated);
          onUpdateClick({ ...oldComment, body });
          setIsUpdating(false);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default CommentUpdateForm;
