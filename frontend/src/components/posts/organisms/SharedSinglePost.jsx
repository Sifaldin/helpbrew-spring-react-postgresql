import React, { useState } from "react";
import Comments from "../../comments/templates/Comments";
import PostUpdateForm from "../templates/PostUpdateForm";
import Api from "../../../api/Api";
import { useHistory } from "react-router-dom";
import ChatApi from "../../../api/ChatApi";

//Displays post belonging to giveaway category. Attention when you write delete block
//for the post. Check comment in SkillPost.
export default function SharedSinglePost({
  post,
  deletePost,
  user,
}) {

  const [isUpdating, setIsUpdating] = useState(false);
  const [curPost, setCurPost] = useState(post);

  const updatePost = (updatedPost) => {
    Api.put("/posts", updatedPost).then((res) => setCurPost(res.data));
  const history = useHistory();
  const receiverEmail = window.sessionStorage.getItem("userEmail");

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
            <img src={curPost.user.imageUrl} alt="Single post img" />
            <div>
              <span className="user-name">{curPost.user.name}</span>
              <span className="date">{curPost.date}</span>
            </div>
          </div>

          <h3>{curPost.title}</h3>
          
          {isUpdating? 
          <PostUpdateForm 
          oldPost={curPost}
          onUpdateClick={updatePost}
          setIsUpdating={setIsUpdating}

          />
          :<p className="post-body">{curPost.body}</p>}
          

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
              <button className="medium-button" onClick={() => deletePost()}>
                Delete
              </button>

              <button className="medium-button" onClick={() => setIsUpdating(true)}>
                Update
              </button>
            </div>
          ) : null}
        </div>
        <Comments post={curPost} />
      </div>
    </div>
  );
}
