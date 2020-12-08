import PostCard from "../molecules/PostCard";
import { BiMessageSquareError } from "react-icons/bi";
import Footer from '../../layout/footer';

//The PostsPage displays a listing of posts belonging to the category(skills, giveaways or monetary support)
// selected by the user
export default function PostsPage({ category, posts }) {
  const getPosts = () => {
    return posts.filter((post) => post.category === category);
  };

  return (
    <div className="posts-page">
      {/* The fetched posts are mapped through and a post card is displayed
      for each of the posts by PostCard component.
      */}
      {getPosts().length === 0 ? (
        <div className="no-posts">
          <BiMessageSquareError />
          <h2>There are no posts available in this category yet.</h2>
        </div>
      ) : (
        <div className="posts">
          {getPosts().map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
        <Footer/>
    </div>
  );
}
