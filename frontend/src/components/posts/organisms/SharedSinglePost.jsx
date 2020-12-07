import React from "react";
import Comments from "../../comments/templates/Comments";

//Displays post belonging to giveaway category. Attention when you write delete block
//for the post. Check comment in SkillPost.
export default function SharedSinglePost({
  post,
  handleUpdateClick,
  deletePost,
  user,
}) {
  return (
    <div className="main-wrapper">
      {/* consists of post area and comment area */}
      <div className="main">
        {/* consists of signature(photo, name, date), post block and comment block */}
        <div className="post-info">
          <div className="signature">
            <img src={post.user.imageUrl} alt="Single post img" />
            <div>
              <span className="user-name">{post.user.name}</span>
              <span className="date">{post.date}</span>
            </div>
          </div>

          <h3>{post.title}</h3>
          <p className="post-body">{post.body}</p>

          {/* The post is deleted only if the email of the logged in user and 
              email of the user who wrote the post are the same */}
          {post.user.email === user.email ? (
            <div className="button-group">
              <button className="medium-button" onClick={() => deletePost()}>
                Delete
              </button>

              <button className="medium-button" onClick={handleUpdateClick}>
                Update
              </button>
            </div>
          ) : null}
        </div>
        <Comments post={post} />
      </div>
    </div>
  );
}
