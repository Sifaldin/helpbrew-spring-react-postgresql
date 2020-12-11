import { useState } from "react";
import Api from "../../../api/Api";
import MaterialUiCalendar from "../../Calendar/MaterialUiCalendar";
import SharedSinglePost from "./SharedSinglePost";

//Displays post belonging to skills category.
export default function SkillPost({ post, setPosts, user }) {

  const [selectedDateAndTime, setSelectedDateAndTime] = useState(post.meetingTimeAndDate);
  const [currentPost, setCurrentPost] = useState(post);

  const updatePost = () => {
    const date = { ...currentPost, meetingTimeAndDate: selectedDateAndTime }
    Api.put("/posts", date).then((res) => {
      setCurrentPost(res.data);
      window.location.reload();
    });
  };

  const dateDisplay = post.meetingTimeAndDate.slice(0, 10);
  const timeDisplay = post.meetingTimeAndDate.slice(16, 21);

    {/* 
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
          
        ) : null} */}

  return (

    // consists of hero image for post and single-post-card
   <div className="single-post">

      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      {/* consists of SharedSinglePost - component that displays post information
      {/* !!! A calendar or any other piece of information unique
        to SKillPost component shall be inserted into this div */}

      <div className="show-map map">

        <h1>{` Meeting date: ${dateDisplay}`}</h1>
        <h1>{` Meeting Time: ${timeDisplay}`}</h1>
        {post.user.id === user.id ? <div>
          <MaterialUiCalendar selectedDateAndTime={selectedDateAndTime} setSelectedDateAndTime={setSelectedDateAndTime} />
          <button className="medium-button" onClick={(e) => { updatePost() }}>edit date</button>
        </div> : null}

      </div>

      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}
      <SharedSinglePost post={post} setPosts={setPosts} user={user} />
    </div>
  );

}


