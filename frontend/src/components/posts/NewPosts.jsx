import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostsApi from '../../api/PostsApi';
import NewPostForm from './NewPostForm';

function NewPosts() {
  const [post, setPost] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const createPost = async () => {
      try {
        if (post !== null) {
          const response = await PostsApi.createPost(post); // We need to check response success before redirecting.
          history.push('/posts');
        }
      } catch (error) {
        console.log(error);
      }
    };
    createPost();
  }, [history, post]);

  return <NewPostForm setPost={setPost} />;
}

export default NewPosts;
