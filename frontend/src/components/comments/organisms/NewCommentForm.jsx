import React, { useEffect, useState } from "react";
import Api from "../../../api/Api";

export default function NewCommentForm({ onSubmit, post }) {
  const [user, setUser] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    Api.get("/user/me").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  // Something still happing here?
  return (
    <div className="comment-area">
      <textarea
        placeholder="type your comment here.."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      {/* <label> User </label>
            <textarea
            placeholder="type here"
            value= {authorName}
       onChange = {event => setAuthorName(event.target.value)}/>*/}

      <button
        className="medium-button"
        onClick={() => onSubmit({ body, user, post })}
      >
        Comment
      </button>
    </div>
  );
}
