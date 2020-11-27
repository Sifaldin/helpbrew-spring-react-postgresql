import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ErrorScreen from "../../tempscreens/ErrorScreen";
import ChatApi from "../../../api/ChatApi";
import Comments from "../../comments/templates/Comments";
import PostUpdateForm from "./PostUpdateForm";
import Api from "../../../api/Api";
import SkillPost from "../organisms/SkillPost";
import GiveawayPost from "../organisms/GiveawayPost";
import MonetarySupportPost from "../organisms/MoneterySupportPost";

function SinglePost() {
  const userEmail = window.sessionStorage.getItem("userEmail");
  const { state } = useLocation();
  const passedPost = state === undefined ? null : state.post;
  const [post, setPost] = useState(passedPost);
  const history = useHistory();
  const isPoster = userEmail === post.email;
  const [isUpdating, setIsUpdating] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    Api.get("/user/").then((response) => {
      const email = response.data;
      setEmail(email);
    });
  }, []);

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
        history.push(`/posts/category/${post.category}`);
      });
    }
  };

  const updatePost = (updatedPost) => {
    Api.put("/posts", updatedPost).then((res) => setPost(res.data));
  };

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  const getPost = () => {
    switch (post.category) {
      case "skills":
        return (
          <SkillPost
            post={post}
            handleUpdateClick={handleUpdateClick}
            deletePost={deletePost}
            email={email}
          />
        );
      case "giveaways":
        return <GiveawayPost />;
      case "monetary-support":
        return <MonetarySupportPost />;
      default:
        return null;
    }
  };

  console.log(post.category === "skills");
  try {
    return isUpdating ? (
      <PostUpdateForm
        oldPost={post}
        onUpdateClick={updatePost}
        setIsUpdating={setIsUpdating}
      />
    ) : (
      <div>
        {getPost()}
        <Comments post={post} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return <ErrorScreen />;
  }
}
export default SinglePost;
