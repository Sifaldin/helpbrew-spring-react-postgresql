import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "../profile/DropDownMenu";

import Api from "..//..//api/Api";

function Thread({
  thread,
  setMessageBox,
  loggedInUser,
  threads,
  selectItem,
  id,
}) {
  const receiver =
    loggedInUser.email === thread.user1.email ? thread.user2 : thread.user1;
  const receiverMessage = thread.receiverMessage;

  const clickHandler = (e) => {
    setMessageBox({ threadId: thread.id, thread: thread });
    selectItem(e.target);
  };
  const lastMessage = thread.thread.slice(-1)[0];
  const lastDate = lastMessage === undefined ? null : lastMessage.date;

  return (
    <div
      id={thread.id}
      className={`chat_people`}
      onClick={(e) => clickHandler(e)}
    >
      <div className="chat_img">
        <img src={receiver.imageUrl} alt="name" />
      </div>
      <div>
        <h5 className="chat-user-name">
          <Link className="name" to="/chat">
            {receiver.email === loggedInUser.email ? null : (
              <span>To: {receiver.name}</span>
            )}

            <span>
              Post: <strong>{thread.title}</strong>
            </span>
          </Link>
          {/* <span>{lastDate}</span> */}
        </h5>
        <p>{receiverMessage}</p>
      </div>
    </div>
  );
}

export default Thread;
