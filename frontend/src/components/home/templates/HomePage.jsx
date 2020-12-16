import React, { useState } from "react";
import CategoryBox from "../organisms/CategoryBox";
import Warning from "../../notifications/Warning";
import WelcomeScreen from "../../notifications/WelcomeScreen";

// The page should show posts posted by the logged in user,
// split into three main categories.

export default function HomePage({ userPosts }) {
  const [displayWelcome, setDisplayWelcome] = useState(true);

  const popup = localStorage.getItem("popup");
  const seenPopup = () => {
    localStorage.setItem("popup", false);
  };

  const skills = userPosts.filter((post) => post.category === "skills");
  const giveaways = userPosts.filter((post) => post.category === "giveaways");
  const monetary = userPosts.filter(
    (post) => post.category === "monetary-support"
  );

  return (
    <div>
      <div className="dashboard">
        <CategoryBox category={"skills"} posts={skills} />
        <CategoryBox category={"giveaways"} posts={giveaways} />
        <CategoryBox category={"monetary-support"} posts={monetary} />
      </div>
      {popup === "true" && displayWelcome ? (
        <WelcomeScreen
          setDisplayError={setDisplayWelcome}
          seenPopup={seenPopup}
        />
      ) : null}
    </div>
  );
}
