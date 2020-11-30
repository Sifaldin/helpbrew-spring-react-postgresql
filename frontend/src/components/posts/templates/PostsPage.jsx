import React, { useEffect, useState } from "react";
import PostCard from "../molecules/PostCard";
import Api from "../../../api/Api";

//The PostsPage displays a listing of posts belonging to the category(skills, giveaways or monetary support)
// selected by the user
export default function PostsPage({ category }) {
  const [posts, setPosts] = useState([]);

  //The component fetches posts belonging to the category passed as props.
  //The category string is inserted into the endpoint ensuring that
  //the posts from the right category are fetched.
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await Api.get(`/posts/category/${category}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, [category]); //refetches posts every time category changes

  return (
    <div className="posts">
      <h1>{category}</h1>
      {/* The fetched posts are mapped through and a post card is displayed
      for each of the posts by PostCard component.
      */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
