import React, { useState } from "react";
import Comments from "../../comments/templates/Comments";
import PostUpdateForm from "../templates/PostUpdateForm";
import Api from "../../../api/Api";
import { useHistory } from "react-router-dom";
import ChatApi from "../../../api/ChatApi";
import { useNotification } from "../../notifications/NotificationProvider";

//Displays post belonging to giveaway category. Attention when you write delete block
//for the post. Check comment in SkillPost.
export default function SharedSinglePost({ post, setPosts, user }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [curPost, setCurPost] = useState(post);

  const history = useHistory();
  const receiverEmail = window.sessionStorage.getItem("userEmail");

  const updatePost = (updatedPost) => {
    Api.put("/posts", updatedPost).then((res) => {
      setCurPost(res.data);
      // setPosts([...posts, res.data]);
    });
  };

  const deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      Api.delete("/posts/" + post.id).then((res) => {
        setPosts(res.data);
        handleDeleteNotification();
        history.push(`/posts/category/${post.category}`);
      });
    }
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
    <div className="main-wrapper">
      {/* consists of post area and comment area */}
      <div className="main">
        {/* consists of signature(photo, name, date), post block and comment block */}
        <div className="post-info">
          <div className="signature">
            <img src={post.user.imageUrl} alt="Single post img" />
            <div>
              <span className="user-name">{post.user.name}</span>
              <span className="date">{post.date}</span>
            </div>
          </div>

          <h3>{post.title}</h3>

          {isUpdating ? (
            <PostUpdateForm
              post={curPost}
              onUpdateClick={updatePost}
              setIsUpdating={setIsUpdating}
            />
          ) : (
            <p className="post-body">{curPost.body}</p>
          )}

          <div className="button-group">
            <button
              className="mes-button"
              onClick={threadHandler}
              type="submit"
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>

            {/* The post is deleted only if the email of the logged in user and 
              email of the user who wrote the post are the same */}
            {curPost.user.email === user.email ? (
              <div className="button-group">
                <button
                  className="medium-button"
                  onClick={() => setIsUpdating(true)}
                >
                  Update
                </button>

                <button
                  className="medium-button"
                  onClick={() => deletePost(curPost.id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <Comments post={post} />
      </div>
    </div>
  );
}
