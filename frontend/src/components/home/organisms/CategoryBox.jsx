import giveaways from "../../../assets/giveaways.jpg";
import skills from "../../../assets/skills.jpg";
import monetarySupport from "../../../assets/monetary-support.jpg";
import { Link } from "react-router-dom";

//CategoryBox is a box inside the dashboard. It displays posts within a certain category posted by
//the logged in user.
export default function CategoryBox({ category, posts }) {
  //removes dashes and capitilizes the category. ex. from "monetary-support" to "Monetary support"
  const formatCategory = (category) => {
    const withSpace = category.split("-").join(" ");
    return withSpace.charAt(0).toUpperCase() + withSpace.slice(1);
  };

  //gets a background image URL for the box depending on the category
  const getBackgroundImage = () => {
    switch (category) {
      case "skills":
        return skills;
      case "giveaways":
        return giveaways;
      case "monetary-support":
        return monetarySupport;
      default:
        return null;
    }
  };

  return (
    <div className="category-box">
      {/* the top of the box contains background image, category name and toggle button */}
      <div
        className="top"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
        {/* image should be added as a background here */}
        {/* toggle thing to add */}
        <h2>{formatCategory(category)}</h2>

        {/* !!! Toggle to be implemented once Hassan includes it into NewPostForm */}
        <span>toggle</span>
      </div>

      {/* the bottom of the box contains category name with a number of posts and posts icons and titles */}
      <div className="bottom">
        <span className="category-name">
          Your {formatCategory(category)}({posts.length})
        </span>

        {/* !!! The posts below will be displayed in a different way depending on the category
        This stays to be done during next iteration!
        */}
        <ul className="post-icons">
          {posts.map((post) => {
            return (
              <div className="post-icon">
                <Link to={{ pathname: `/posts/${post.id}`, state: { post } }}>
                  <li key={post.id}>
                    <img src={post.imageUrl} alt="" />
                    <span>{post.title}</span>
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
