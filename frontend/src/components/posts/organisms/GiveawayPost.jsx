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
  return <Map address={"Moscow"} />; //should be post.location instead of hardcoded value
}
