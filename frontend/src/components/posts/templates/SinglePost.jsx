import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorScreen from "../../tempscreens/ErrorScreen";
import SkillPost from "../organisms/SkillPost";
import GiveawayPost from "../organisms/GiveawayPost";
import MonetarySupportPost from "../organisms/MoneterySupportPost";
import Api from "../../../api/Api";

function SinglePost({ id, setPosts, user, posts }) {
  // console.log(posts);
  // const post = posts.filter((p) => p.id === parseInt(id))[0];

  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchPost = async () => {
      const response = await Api.get(`/posts/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id, posts]);

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

  //getPost() function reads post variable passed as props and checks its category.
  //Depending on the category of the passed post a component relevant to that category is called.
  //This process is handled by the switch statement below.
  const getPost = () => {
    switch (post.category) {
      case "skills":
        return <SkillPost post={post} setPosts={setPosts} user={user} />;
      case "giveaways":
        return <GiveawayPost post={post} setPosts={setPosts} user={user} />;
      case "monetary-support":
        return (
          <MonetarySupportPost post={post} setPosts={setPosts} user={user} />
        );
      default:
        return null;
    }
  };

  try {
    return (
      //Otherwise details of the post passed as props are displayed(managed by getPost() function above)
      //followed by comments to that post.
      <div className="post-wrapper">
        {getPost()}
        {/* <Comments post={post} /> */}
      </div>
    );
  } catch (e) {
    console.log(e);
    return <ErrorScreen />;
  }
}
export default SinglePost;
