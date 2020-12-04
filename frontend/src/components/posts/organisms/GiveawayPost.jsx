import React from "react";
import Map from "../molecules/Map";
import Comments from "../../comments/templates/Comments";

//Displays post belonging to giveaway category. Attention when you write delete block
//for the post. Check comment in SkillPost.
export default function GiveawayPost({
  post,
  handleUpdateClick,
  deletePost,
  email,
  address,
}) {
  return (
    <div className="single-post-card">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      <div className="post-title">
        <h3>{post.title}</h3>
        <p>{post.body}</p>

        {/* The post is deleted only if the email of the logged in user and 
        email of the user who wrote the post are the same */}

        {/* !!NB: This block of code will be the same for GiveawayPost and MonetarySupoprtPost.
        It would be good to refactor the block and put it one level above(for example, in 
          delete function in SinglePost component) to avoid code duplication
        */}
        {post.email === email ? (
          <div>
            <button onClick={() => deletePost()}>Delete</button>

            <button onClick={handleUpdateClick}>Update</button>
          </div>
        ) : null}

        <Comments post={post} />

        <div className="map-wrapper">
          <Map position={post.position} />
        </div>
      </div>
    </div>
  );
}
