import DateFnsUtils from "@date-io/date-fns";
import { date } from "date-fns/locale/af";
import { useState } from "react";
import MaterialUiCalendar from "../../Calendar/MaterialUiCalendar";
import SharedSinglePost from "./SharedSinglePost";

//Displays post belonging to skills category.
export default function SkillPost({ post, setPosts, user }) {
  const [displayCalendar, setDisplayCalendar] = useState(true);

  const handleCalendarToggle = () => {
    displayCalendar ? setDisplayCalendar(false) : setDisplayCalendar(true);
  };

  const dateDisplay = () => {
    return post.meetingTimeAndDate.slice(0, 10);
  };
  const timeDisplay = () => {
    return post.meetingTimeAndDate.slice(11, 16);
  };

  console.log(dateDisplay);
  console.log(timeDisplay);
  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>
      {/* consists of SharedSinglePost - component that displays post information
      {/* !!! A calendar or any other piece of information unique
        to SKillPost component shall be inserted into this div */}

      {/* The ternary operator avoids getting an error if the field meetingTimeAndDate is null in database */}
      {post.meetingTimeAndDate ? (
        <div>
          {/* ( */}
          {/* <button
            className="medium-button location-button"
            onClick={handleCalendarToggle}
          >
            {displayCalendar ? "Hide calendar" : "Edit event time"}
          </button>
          <div className="show-map map"> */}
          <h1>{` Meeting date: ${dateDisplay()}`}</h1>
          <h1>{` Meeting Time: ${timeDisplay()}`}</h1>
          {/* {displayCalendar ? (
              <div>
                <MaterialUiCalendar />
              </div>
            ) : null} */}
          {/* </div> */}
        </div>
      ) : null}
      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}
      <SharedSinglePost post={post} setPosts={setPosts} user={user} />
    </div>
  );
}
