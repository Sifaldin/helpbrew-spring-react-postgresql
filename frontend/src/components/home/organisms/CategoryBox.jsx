import giveaways from "../../../assets/giveaways.jpg";
import skills from "../../../assets/skills.jpg";
import monetarySupport from "../../../assets/monetary-support.jpg";

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
      </div>

      {/* the bottom of the box contains category name with a number of posts and posts icons and titles */}
      <div className="bottom">
        <span>
          Your {formatCategory(category)}({posts.length})
        </span>

        <ul className="items">
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <img style={{ width: "40px" }} src={skills} alt="" />
                {/* uncomment when image uploader is fixed */}
                {/* <img style={{ width: "50px" }} src={post.imageUrl} alt="" /> */}
                <span>Post title</span>
                {/* uncomment line below when Hassan fixes title input */}
                {/* <span>{post.title}</span> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
