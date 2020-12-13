import { useState } from "react";
import Api from "../../../api/Api";
import MaterialUiCalendar from "../../Calendar/MaterialUiCalendar";
import SharedSinglePost from "./SharedSinglePost";

//Displays post belonging to skills category.
export default function SkillPost({ post, setPosts, user, posts }) {
  const [selectedDateAndTime, setSelectedDateAndTime] = useState(
    post.meetingTimeAndDate
  );

  const updatePost = () => {
    const updatedPost = { ...post, meetingTimeAndDate: selectedDateAndTime };
    Api.put("/posts", updatedPost).then((res) => {
      const updatedPosts = posts.map((post) =>
        post.id === res.data.id ? res.data : post
      );
      setPosts(updatedPosts);
    });
  };

  const dateDisplay = () => {
    if (post.meetingTimeAndDate !== null) {
      return post.meetingTimeAndDate.slice(0, 10);
    }
  };
  const timeDisplay = () => {
    if (post.meetingTimeAndDate !== null) {
      return post.meetingTimeAndDate.slice(16, 21);
    }
  };

  const bookSpot = () => {
    const spotsAfterBooking = post.bookedSpots + 1;
    const updatedPost = { ...post, bookedSpots: spotsAfterBooking };
    Api.put("./posts", updatedPost).then((res) => {
      const updatedPosts = posts.map((post) =>
        post.id === res.data.id ? res.data : post
      );
      setPosts(updatedPosts);
    });
  };

  {
    /* 
               HIDING CALENDAR CODE

       const [displayCalendar, setDisplayCalendar] = useState(true);

       const handleCalendarToggle = () => {
       displayCalendar ? setDisplayCalendar(false) : setDisplayCalendar(true);
       };
      
      <button
        className="medium-button location-button"
        onClick={handleCalendarToggle}
      >
        {displayCalendar ? "Hide calendar" : "Edit event time"}
      </button> 
      
       {/* {displayCalendar ? (
          
        ) : null} */
  }

  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>
      {/* consists of SharedSinglePost - component that displays post information
      {/* !!! A calendar or any other piece of information unique
        to SKillPost component shall be inserted into this div */}

      <div className="show-map">
        {post.meetingTimeAndDate !== null ? (
          <div>
            <h1>{` Meeting date: ${dateDisplay()}`}</h1>
            <h1>{` Meeting Time: ${timeDisplay()}`}</h1>
          </div>
        ) : null}

        {post.user.id === user.id && post.meetingTimeAndDate !== null ? (
          <div>
            <MaterialUiCalendar
              selectedDateAndTime={selectedDateAndTime}
              setSelectedDateAndTime={setSelectedDateAndTime}
            />
            <button
              className="medium-button edit"
              onClick={(e) => {
                updatePost();
              }}
            >
              edit date
            </button>
          </div>
        ) : null}

        <span className="available-spots">{`There are ${
          post.eventCapacity - post.bookedSpots
        } out of ${post.eventCapacity} spots availbale at this event`}</span>
        <button className="medium-button" onClick={bookSpot}>
          Book your spot
        </button>
      </div>

      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}
      <SharedSinglePost
        post={post}
        posts={posts}
        setPosts={setPosts}
        user={user}
      />
    </div>
  );
}
