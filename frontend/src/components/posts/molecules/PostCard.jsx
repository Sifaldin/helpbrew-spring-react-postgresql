import React, { useState } from "react";
import Api from "../../../api/Api";
import { Link } from "react-router-dom";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

//PostCard displays a post in a listing of posts on PostsPage.

//The code below should be worked through. What information should be displayed on
//PostCard? Shall tags "Available"/"Claimed" stay as they are or are we changing that?
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
    <div className="postcard">
      <img
        className="post-image"
        // className={post.claimed ? "claimed pic-1" : "pic-1"}
        src={post.imageUrl}
        alt=""
      />

      {/* {post.claimed ? <span>Claimed</span> : <span>Available</span>} */}

      <div className="post-bottom">
        {/* Header includes post title and type(giving or requesting) */}
        <div className="header">
          <h3 className="title">
            Post title
            {/* uncomment when Hassan fixes title for posts */}
            {/* {post.title}*/}
          </h3>
          <span className="type-tag">giving</span>
          {/* Uncomment when Hassan fixes type for posts */}
          {/* <span>{post.type}</span> */}
        </div>
        {/* Post body */}
        <p className="post-text">{post.body}</p>
        {/* Signature includes post status and date */}
        <div className="signature">
          <span className="status">active</span>
          <span className="post-date">{post.date}</span>
        </div>
        <hr />
        {/* React container includes reactions and link to the post details */}
        <div className="react">
          <div className="reaction">
            <button onClick={incrementLike}>
              <FaLongArrowAltUp className="up" />
              {/* <i className="fas fa-thumbs-up"></i> {reaction.like} */}
            </button>
            <button onClick={incrementDislike}>
              <FaLongArrowAltDown className="down" />
              {/* <i className="fas fa-thumbs-down"></i> {reaction.dislike} */}
            </button>
          </div>

          <Link
            className="interested-button"
            to={{ pathname: `/posts/${post.id}`, state: { post } }}
          >
            I'm interested
          </Link>
        </div>
        <hr />
        {/* Once View Post button is clicked by user, user is redirected to 
          the SinglePost page where all the details about the post are specified.
          */}
      </div>
    </div>
  );
}

export default PostCard;
