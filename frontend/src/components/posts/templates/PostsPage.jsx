import React, { useEffect, useState } from "react";
import PostCard from "../molecules/PostCard";
import Api from "../../../api/Api";

export default function PostsPage({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await Api.get(`/posts/category/${category}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, [category]);

  return (
    <div className="posts">
      <h1>{category}</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
