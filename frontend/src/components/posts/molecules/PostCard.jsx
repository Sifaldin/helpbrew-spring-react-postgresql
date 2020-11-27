import React, { useState } from "react";
import Api from "../../../api/Api";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const [reaction, setReaction] = useState(post.reaction);
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

  return (
    <div>
      <div>
        <div>
          <a href={post.imageUrl}>
            <img
              style={{ width: "100px" }}
              className={post.claimed ? "claimed pic-1" : "pic-1"}
              src={post.imageUrl}
              alt=""
            />
          </a>
          {post.claimed ? <span>Claimed</span> : <span>Available</span>}
        </div>
        <div>
          <h3>
            <a href={post.title}>{post.title}</a>
          </h3>
          <div>
            <span>{post.date}</span>
            <br />
          </div>
          <Link
            className="claim"
            to={{ pathname: `/posts/${post.id}`, state: { post } }}
          >
            View Post
          </Link>

          <div className="reaction">
            <button onClick={incrementLike}>
              <i className="fas fa-thumbs-up"></i> {reaction.like}
            </button>
            <button onClick={incrementDislike}>
              <i className="fas fa-thumbs-down"></i> {reaction.dislike}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
