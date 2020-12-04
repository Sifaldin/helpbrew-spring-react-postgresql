import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CategoryBox from "../organisms/CategoryBox";

// The page should show posts posted by the logged in user,
// split into three main categories.

export default function HomePage({ userPosts }) {
  console.log(userPosts);
  const skills = userPosts.filter((post) => post.category === "skills");
  const giveaways = userPosts.filter((post) => post.category === "giveaways");
  const monetary = userPosts.filter(
    (post) => post.category === "monetary-support"
  );

  return (
    <div className="dashboard">
      <CategoryBox category={"skills"} posts={skills} />
      <CategoryBox category={"giveaways"} posts={giveaways} />
      <CategoryBox category={"monetary-support"} posts={monetary} />
    </div>
  );
}
