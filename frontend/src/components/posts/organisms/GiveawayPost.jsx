import React from "react";
import Map from "../molecules/Map";
import Comments from "../../comments/templates/Comments";

//Displays post belonging to giveaway category. Attention when you write delete block
//for the post. Check comment in SkillPost.
export default function GiveawayPost({
  post,
  handleUpdateClick,
  deletePost,
  user,
  address,
}) {
  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>
      {/* consists of main info displayed on the left and map */}
      <div className="single-post-card">
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

            {/* !!NB: This block of code will be the same for GiveawayPost and MonetarySupoprtPost.
              It would be good to refactor the block and put it one level above(for example, in 
              delete function in SinglePost component) to avoid code duplication
              */}
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
        <div className="map-wrapper">
          <Map position={post.position} />
        </div>
      </div>
    </div>
  );
}
