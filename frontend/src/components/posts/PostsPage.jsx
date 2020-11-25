import React, { useEffect, useState } from 'react';
import PostsApi from '../../api/PostsApi';
import PostCard from './PostCard';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostsApi.getAllPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const postList = posts.map(post => <PostCard key={post.id} post={post} />);

  return posts === [] ? 'Loading....' : <div className="row">{postList}</div>;
}

export default PostsPage;
