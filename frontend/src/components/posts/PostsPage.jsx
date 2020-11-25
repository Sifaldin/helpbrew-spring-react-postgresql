import React, { useEffect, useState } from "react";
import PostsApi from "../../api/PostsApi";
import PostCard from "./PostCard";
import Api from "../../api/Api";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(
    () =>
      Api.get("/user/me").then((res) => {
        setUser(res.data);
      }),
    []
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostsApi.getAllPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const postList = posts.map((post) => <PostCard key={post.id} post={post} />);

  return posts === [] ? "Loading...." : <div className="row">{postList}</div>;
}
