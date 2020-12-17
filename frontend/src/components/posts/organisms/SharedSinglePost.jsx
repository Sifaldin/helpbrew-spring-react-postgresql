import React, { useState, useRef } from "react";
import Comments from "../../comments/templates/Comments";
import PostUpdateForm from "../templates/PostUpdateForm";
import Api from "../../../api/Api";
import { useHistory } from "react-router-dom";
import ChatApi from "../../../api/ChatApi";
import { useNotification } from "../../notifications/NotificationProvider";
import ConfirmModal from "../templates/ConfirmModal";

//Displays post belonging to giveaway category. Attention when you write delete block
//for the post. Check comment in SkillPost.
export default function SharedSinglePost({
  post,
  setPosts,
  user,
  posts,
  threadHandler,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const history = useHistory();

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const updatePost = (updatedPost) => {
    Api.put("/posts", updatedPost).then((res) => {
      
      const updatedPosts = posts.map((post) =>
        post.id === res.data.id ? res.data : post
      );
      setPosts(updatedPosts);
    });
  };

  const deletePost = (id) => {
    Api.delete("/posts/" + post.id).then((res) => {
      const updatedPosts = posts.filter((post) => post.id !== res.data.id);
      setPosts(updatedPosts);
      handleDeleteNotification();
      history.push(`/posts/category/${post.category}`);
    });
  };

  //Notification Creator
  const dispatch = useNotification();
  const handleDeleteNotification = () => {
    dispatch({
      type: "ERROR",
      message: "Deleting Post!",
    });
  };

  return (
    <div className="single-post-card">

      <div className="post-info">
        <div className="signature">
          <img
            className="post-user"
            src={post.user.imageUrl}
            alt="Single post img"
          />
          <div>
            <span className="user-name">{post.user.name}</span>
            <span className="date">{post.date}</span>
          </div>
        </div>

        {isUpdating ? (
          <PostUpdateForm
            post={post}
            onUpdateClick={updatePost}
            setIsUpdating={setIsUpdating}
          />
        ) : (
          <>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </>
        )}

        {/* The post is deleted only if the email of the logged in user and 
              email of the user who wrote the post are the same */}
        {post.user.email === user.email ? (
          <div className="button-group">
            <button
              className="medium-button"
              onClick={() => setIsUpdating(true)}
            >
              Update
            </button>

            <button className="medium-button pink" onClick={openModal}>
              Delete
            </button>
          </div>
        ) : (
          <button className="mes-button" onClick={threadHandler} type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        )}
      </div>
      <Comments post={post} />
     
      <ConfirmModal ref={modalRef} handleConfirm={deletePost} />
    </div>
  );
}
