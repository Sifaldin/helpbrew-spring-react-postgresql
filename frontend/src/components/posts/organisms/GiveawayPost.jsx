import React from "react";
import Map from "../molecules/Map";

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
    <div className="map-wrapper">
      <Map position={post.position} />
    </div>
  );
}
