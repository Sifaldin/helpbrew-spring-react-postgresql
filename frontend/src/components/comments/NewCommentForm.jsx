import React, { useEffect, useState } from 'react';

export default function NewCommentForm({ onSubmit }) {
  const [authorName, setAuthorName] = useState('');
  const [body, setBody] = useState('');

  // Something still happing here?
  return (
    <div>
      <label>Comment</label>
      <textarea
        className="form-control comment-text"
        placeholder="type your comment here.."
        value={body}
        onChange={event => setBody(event.target.value)}
      />

      {/* <label> User </label>
            <textarea
            placeholder="type here"
            value= {authorName}
       onChange = {event => setAuthorName(event.target.value)}/>*/}

      <button className="comment-btn" onClick={() => onSubmit({ body, authorName })}>
        Comment
      </button>
    </div>
  );
}
