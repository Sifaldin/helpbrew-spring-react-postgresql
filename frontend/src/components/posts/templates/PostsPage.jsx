import PostCard from "../molecules/PostCard";
import { BiMessageSquareError } from "react-icons/bi";
import { useEffect, useState } from "react";
import Api from "../../../api/Api";

//The PostsPage displays a listing of posts belonging to the category(skills, giveaways or monetary support)
// selected by the user
export default function PostsPage({ category, posts, loggedInUser }) {
  console.log(posts);
  const [postsByCategory, setPostsByCategory] = useState([]);

  //The component fetches posts belonging to the category passed as props.
  //The category string is inserted into the endpoint ensuring that
  //the posts from the right category are fetched.
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await Api.get(`/posts/category/${category}`);
      setPostsByCategory(response.data);
    };
    fetchPosts();
    console.log(postsByCategory);
  }, [category, posts]); //refetches posts every time category changes

  // const [postsByCategory, setPostsByCategory] = useState([]);

  // useEffect(() => {
  //   const filtered = posts.filter((post) => post.category === category);
  //   setPostsByCategory();
  // }, [category, posts]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await Api.get(`/posts`);
  //     const filteredByCategory = response.data.filter(
  //       (post) => post.category === category
  //     );
  //     setPostsByCategory(filteredByCategory);
  //   };
  //   fetchPosts();
  // }, [category]);

  return (
    <div className="posts-page">
      {/* The fetched posts are mapped through and a post card is displayed
      for each of the posts by PostCard component.
      */}
      {postsByCategory.length === 0 ? (
        <div className="no-posts">
          <BiMessageSquareError />
          <h2>There are no posts available in this category yet.</h2>
        </div>
      ) : (
        <div className="posts">
          {postsByCategory.map((post) => (
            <PostCard key={post.id} post={post} loggedInUser={loggedInUser} />
          ))}
        </div>
      )}
    </div>
  );
}
