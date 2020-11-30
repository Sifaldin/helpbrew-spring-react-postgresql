import React, { useEffect, useState } from "react";
import PostCard from "../molecules/PostCard";
import Api from "../../../api/Api";

//The PostsPage displays a listing of posts belonging to the category(skills, giveaways or monetary support)
// selected by the user
export default function PostsPage({ category, posts }) {
  const getPosts = () => {
    return posts.filter((post) => post.category === category);
  };

  return (
    <div className="posts">
      <h1>{category}</h1>
      {/* The fetched posts are mapped through and a post card is displayed
      for each of the posts by PostCard component.
      */}
      {getPosts().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
