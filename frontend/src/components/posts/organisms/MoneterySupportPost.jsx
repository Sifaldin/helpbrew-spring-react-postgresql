import React from "react";
import SharedSinglePost from "./SharedSinglePost";
//Displays post belonging to monetary support category. Attention when you write delete block
//for the post. Check comment in SkillPost.

export default function GiveawayPost({
  post,
  handleUpdateClick,
  deletePost,
  user,
}) {
  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}
      <div className="single-post-card">
        <SharedSinglePost
          post={post}
          handleUpdateClick={handleUpdateClick}
          deletePost={deletePost}
          user={user}
        />
        {/* !!! Any piece of information unique
        to MonetarySupportPost component shall be inserted into this div */}
        <div></div>
      </div>
    </div>
  );
}
