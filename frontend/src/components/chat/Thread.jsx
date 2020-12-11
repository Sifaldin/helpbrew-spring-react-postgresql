import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "../profile/DropDownMenu";

import Api from "..//..//api/Api";

function Thread({ thread, setMessageBox, loggedInUser }) {
  const receiver =
    loggedInUser.email === thread.user1.email ? thread.user2 : thread.user1;
  const receiverMessage = thread.receiverMessage;
  const [user, setUser] = useState("");

  const clickHandler = () => {
    setMessageBox({ threadId: thread.id, thread: thread });
  };
  const lastMessage = thread.thread.slice(-1)[0];
  const lastDate = lastMessage === undefined ? null : lastMessage.date;

  useEffect(() => {
    Api.get("/user/me").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  return (
    <div className="chat_people">
      <div className="chat_img">
        {" "}
        <img src={receiver.imageUrl} alt="name" />{" "}
      </div>
      <div>
        <h5 className="chat-user-name">
          <Link className="name" to="/chat" onClick={clickHandler}>
            {receiver.name}
          </Link>
          {/* <span>{lastDate}</span> */}
        </h5>
        <p>{receiverMessage}</p>
      </div>
    </div>
  );
}

export default Thread;
