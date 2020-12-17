import { useState } from "react";
import Api from "../../../api/Api";
import MaterialUiCalendar from "../../Calendar/MaterialUiCalendar";
import SharedSinglePost from "./SharedSinglePost";
import ChatApi from "../../../api/ChatApi";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { BsClock } from "react-icons/bs";
import Warning from "../../notifications/Warning";

//Displays post belonging to skills category.
export default function SkillPost({
  post,
  setPosts,
  user,
  posts,
  threadHandler,
}) {
  
  const history = useHistory();
  const [selectedDateAndTime, setSelectedDateAndTime] = useState(
    post.meetingTimeAndDate
  );
  const [displayBookedConfirmation, setDisplayBookedConfirmation] = useState(
    false
  );
  const [
    displayUnbookedConfirmation,
    setDisplayUnbookedConfirmation,
  ] = useState(false);
  const [showList, setShowList] = useState(false);

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

  const getParticipants = () => {
    return post.registeredUsers.map((user) => {
      return (
        <li>
          {user.name}, {user.email}
        </li>
      );
    });
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

  const sendUserConfirmation = (action) => {
    const messageBooking = `This is a confirmation of your booking to the event ${
      post.title
    } held by ${
      post.user.name
    } on ${dateDisplay()} at ${timeDisplay()}. Use Unbook button on the post page if you cannot make it.`;

    const messageUnbooking = `You have successfully unbooked your spot at the event ${
      post.title
    } held by ${
      post.user.name
    } on ${dateDisplay()} at ${timeDisplay()}. Use Unbook button on the post page if you cannot make it.`;

    const createOrDirect = async () => {
      try {
        const response = await ChatApi.createThread(user, {
          title: `${
            action === "book" ? "Booking confirmation" : "Unbooked"
          } - ${post.title}, ${format(new Date(), "dd-MMM-yyyy HH:MM")}`,
        });
        const thread = response.data;
        

        ChatApi.createMessage(thread.id, user, {
          messageBody: `${
            action === "book" ? messageBooking : messageUnbooking
          }`,
          thread: { id: thread.id },
          date: format(new Date(), "dd-MMM-yyyy HH:MM"),
        });

        history.push({
          pathname: `/posts/${post.id}`,
          state: { thread },
        });
      } catch (e) {
        console.log(e);
      }
    };
    createOrDirect();
  };

  const handleBooking = () => {
    if (alreadyRegistered()) {
      window.alert("You have already reserved a spot at this event");
    } else if (yourEvent()) {
      window.alert("You cannot book spot at your own event");
    } else {
      bookSpot();
      sendUserConfirmation("book");
      setDisplayBookedConfirmation(true);
     
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
      sendUserConfirmation("unbook");
      setDisplayUnbookedConfirmation(true);
      
    });
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

      {post.postType === "give" ? (
        <div className="time-related">
          <div className="show-map date-booking">
            <div className="time-box">
              {post.meetingTimeAndDate !== null ? (
                <div className="event-time">
                  <BsClock></BsClock>
                  <div>
                    <span>
                      {dateDisplay()} at {timeDisplay()}
                    </span>
                    
                  </div>
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
            </div>
            <div className="participants-wrapper">
              {yourEvent() ? (
                <div className="participants">
                  {showList ? (
                    <div>
                      <button
                        className="medium-button"
                        onClick={() => setShowList(false)}
                      >
                        Hide participants
                      </button>
                      {getParticipants()}
                    </div>
                  ) : (
                    <button
                      className="medium-button"
                      onClick={() => setShowList(true)}
                    >
                      See participants
                    </button>
                  )}
                  {eventFull() ? (
                    <button className="medium-button">Fully booked</button>
                  ) : (
                    <span>{`${post.registeredUsers.length} out of ${post.eventCapacity} spot(s) have been booked at your event`}</span>
                  )}
                </div>
              ) : (
                <div>
                  <div className="unbook-user">
                    {alreadyRegistered() ? (
                      <div className="unbook-user">
                        <p>You have reserved a spot at this event.</p>
                        <button
                          className="medium-button"
                          onClick={handleUnbooking}
                        >
                          Unbook
                        </button>
                      </div>
                    ) : eventFull() ? (
                      <button
                        className="medium-button"
                        style={{ backgroundColor: "red" }}
                      >
                        Fully booked
                      </button>
                    ) : (
                      <div className="book-user">
                        <button
                          className="medium-button"
                          onClick={handleBooking}
                        >
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
        </div>
      ) : null}

      {displayBookedConfirmation ? (
        <Warning
          message="You have booked a spot and a confirmation message has been sent to you."
          setDisplayError={setDisplayBookedConfirmation}
        />
      ) : null}

      {displayUnbookedConfirmation ? (
        <Warning
          message="Your spot has been unbooked."
          setDisplayError={setDisplayUnbookedConfirmation}
        />
      ) : null}
      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}
      <SharedSinglePost
        post={post}
        posts={posts}
        setPosts={setPosts}
        user={user}
        threadHandler={threadHandler}
      />
    </div>
  );
}
