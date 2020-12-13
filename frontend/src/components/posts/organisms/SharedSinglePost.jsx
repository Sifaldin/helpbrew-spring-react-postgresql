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
export default function SharedSinglePost({ post, setPosts, user, posts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const history = useHistory();
  const receiverEmail = window.sessionStorage.getItem("userEmail");

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const updatePost = (updatedPost) => {
    Api.put("/posts", updatedPost).then((res) => {
      console.log(res.data);
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

  const threadHandler = () => {
    const createOrDirect = async () => {
      try {
        const response = await ChatApi.createThread(receiverEmail, {});
        console.log(response);
        const thread = response.data;
        history.push({ pathname: `/chat/${thread.id}`, state: { thread } });
      } catch (e) {
        console.log(e);
      }
    };
    createOrDirect();
  };

  return (
    <div className="single-post-card">
      {/* consists of post area and comment area */}
      {/* <div className="main"> */}
      {/* consists of signature(photo, name, date), post block and comment block */}
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

        <h3 className="post-title">{post.title}</h3>

        {isUpdating ? (
          <PostUpdateForm
            post={post}
            onUpdateClick={updatePost}
            setIsUpdating={setIsUpdating}
          />
        ) : (
          <p className="post-body">{post.body}</p>
        )}

        <div className="button-group">
          <button className="mes-button" onClick={threadHandler} type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>

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

              <button className="medium-button" onClick={openModal}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Comments post={post} />
      {/* </div> */}
      <ConfirmModal ref={modalRef} handleConfirm={deletePost} />
    </div>
  );
}
