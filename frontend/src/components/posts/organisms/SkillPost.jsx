import { useState } from "react";
import MaterialUiCalendar from "../../Calendar/MaterialUiCalendar";
import ReactCalendar from "../../Calendar/ReactCalendar";
import SharedSinglePost from "./SharedSinglePost";

//Displays post belonging to skills category.
export default function SkillPost({ post, setPosts, user }) {
  const [displayCalendar, setDisplayCalendar] = useState(true);

  const handleCalendarToggle = () => {
    displayCalendar ? setDisplayCalendar(false) : setDisplayCalendar(true);
  };

  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      {/* consists of SharedSinglePost - component that displays post information
      {/* !!! A calendar or any other piece of information unique
        to SKillPost component shall be inserted into this div */}

      <button
        className="medium-button location-button"
        onClick={handleCalendarToggle}
      >
        {displayCalendar ? "Hide calendar" : "Edit event time"}
      </button>
      {displayCalendar ? (
        <div className="show-map map">
          <MaterialUiCalendar />
        </div>
      ) : null}

      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}
      <div className="single-post-card">
        <SharedSinglePost post={post} setPosts={setPosts} user={user} />
      </div>
    </div>
  );
}
