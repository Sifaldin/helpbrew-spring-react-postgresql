import React from "react";
import Map from "../molecules/Map";
import SharedSinglePost from "./SharedSinglePost";

export default function GiveawayPost({
  post,
  handleUpdateClick,
  deletePost,
  user,
}) {
  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}

      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      <div className="single-post-card">
        <SharedSinglePost
          post={post}
          handleUpdateClick={handleUpdateClick}
          deletePost={deletePost}
          user={user}
        />
        {/* Map is a component unique to giveaway post */}
        <Map position={post.position} />
      </div>
    </div>
  );
}
