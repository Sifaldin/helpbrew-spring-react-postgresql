import { useState } from "react";
import Api from "../../../api/Api";
import MaterialUiCalendar from "../../Calendar/MaterialUiCalendar";
import SharedSinglePost from "./SharedSinglePost";

//Displays post belonging to skills category.
export default function SkillPost({ post, setPosts, user, posts }) {
  console.log(post);

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

  const alreadyRegistered = () => {
    const emails = post.registeredUsers.map((user) => user.email);
    console.log(emails);
    if (emails.includes(user.email)) {
      return true;
    } else {
      return false;
    }
  };

  const yourEvent = () => {
    if (post.user.email === user.email) {
      return true;
    } else {
      return false;
    }
  };

  const eventFull = () => {
    if (post.eventCapacity === post.registeredUsers.length) {
      return true;
    } else {
      return false;
    }
  };

  const bookSpot = () => {
    const updatedPost = {
      ...post,
      registeredUsers: [...post.registeredUsers, user],
    };
    Api.put("./posts", updatedPost).then((res) => {
      const updatedPosts = posts.map((post) =>
        post.id === res.data.id ? res.data : post
      );
      setPosts(updatedPosts);
    });
  };

  const handleBooking = () => {
    if (alreadyRegistered()) {
      window.alert("You have already reserved a spot at this event");
    } else if (yourEvent()) {
      window.alert("You cannot book spot at your own event");
    } else {
      bookSpot();
      window.alert("Your spot has been booked.");
    }
  };

  const handleUnbooking = () => {
    const updatedUsers = post.registeredUsers.filter(
      (regUser) => regUser.email !== user.email
    );
    const updatedPost = {
      ...post,
      registeredUsers: updatedUsers,
    };
    Api.put("./posts", updatedPost).then((res) => {
      const updatedPosts = posts.map((post) =>
        post.id === res.data.id ? res.data : post
      );
      setPosts(updatedPosts);
      window.alert("Your spot has been unbooked");
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

        <div>
          {yourEvent() ? (
            eventFull() ? (
              <button className="medium-button">Fully booked</button>
            ) : (
              <span>{`${post.registeredUsers.length} out of ${post.eventCapacity} spot(s) have been booked at your event`}</span>
            )
          ) : (
            <div>
              <div>
                {alreadyRegistered() ? (
                  <button className="medium-button" onClick={handleUnbooking}>
                    Unbook
                  </button>
                ) : eventFull() ? (
                  <button className="medium-button">Fully booked</button>
                ) : (
                  <div>
                    <button className="medium-button" onClick={handleBooking}>
                      Book your spot
                    </button>
                    <span className="available-spots">{`There are ${
                      post.eventCapacity - post.registeredUsers.length
                    } spots availbale at this event.`}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
