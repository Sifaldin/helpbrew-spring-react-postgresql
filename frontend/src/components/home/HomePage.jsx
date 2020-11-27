import React from "react";
import { useHistory } from "react-router-dom";

// The page should show posts posted by the logged in user,
// split into three main categories.

function HomePage() {
  const history = useHistory();
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <div className="user-giveaways">
        <p>Giveaway 1</p>
        <p>Giveaway 2</p>
      </div>

      <div className="user-skills">
        <p>Skill 1</p>
        <p>Skill 2</p>
      </div>

      <div className="user-monetary-support">
        <p>Support 1</p>
        <p>Support 2</p>
      </div>
    </div>
  );
}

export default HomePage;
