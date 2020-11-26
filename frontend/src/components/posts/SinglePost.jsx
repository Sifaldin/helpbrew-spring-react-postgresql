import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ErrorScreen from "../tempscreens/ErrorScreen";
import ChatApi from "../../api/ChatApi";
import CommentsPage from "../comments/CommentsPage";
import PostUpdateForm from "./PostUpdateForm";
import Api from "../../api/Api";

function SinglePost(onUpdateClick) {
  const userEmail = window.sessionStorage.getItem("userEmail");
  const { state } = useLocation();
  const passedPost = state === undefined ? null : state.post;
  const [post, setPost] = useState(passedPost);
  const history = useHistory();
  const isPoster = userEmail === post.email;
  const [isUpdating, setIsUpdating] = useState(false);

  // const handleClaim = () => {
  //   const setClaimed = async () => {
  //     try {
  //       const response = await PostsApi.updatePost({
  //         ...post,
  //         claimed: !post.claimed,
  //       });
  //       setPost(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   setClaimed();
  // };

  const messageHandler = () => {
    const createOrDirect = async () => {
      try {
        const response = await ChatApi.createThread(post.email, {});
        const thread = response.data;
        history.push({ pathname: `/chat/${thread.id}`, state: { thread } });
      } catch (e) {
        console.log(e);
      }
    };
    createOrDirect();
  };

  const deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      Api.delete("/posts/" + post.id).then((res) => {
        history.push("/posts");
      });
    }
  };

  const updatePost = (updatedPost) => {
    Api.put("/posts", updatedPost).then((res) => setPost(res.data));
  };

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  try {
    return isUpdating ? (
      <PostUpdateForm
        oldPost={post}
        onUpdateClick={updatePost}
        setIsUpdating={setIsUpdating}
      />
    ) : (
      <div >
        <div >
          <div >
            <div >
              <div >
                <div  id="pic-1">
                  <img src={post.imageUrl} alt="Single post img" />
                </div>
              </div>
            </div>
            <div >
              <h3 >{post.title}</h3>
              <p >{post.body}</p>
              <div>
                <button  onClick={() => deletePost()}>
                  Delete
                </button>

                <button onClick={handleUpdateClick}>
                  Update
                </button>
              </div>

              <CommentsPage post={post} />

              {/* <div className="action">
                {isPoster ? (
                  <button
                    className="singlePost-btn btn btn-default"
                    onClick={handleClaim}
                    type="button"
                  >
                    {post.claimed ? "Set Available" : "Set Claimed"}
                  </button>
                ) : null}

                {isPoster ? null : (
                  <button
                    className="singlePost-btn btn btn-default"
                    onClick={messageHandler}
                    type="button"
                  >
                    Message Poster
                  </button>
                )}

                <button className="like btn btn-default" type="button">
                  <span className="fa fa-heart"></span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return <ErrorScreen />;
  }
}
export default SinglePost;
