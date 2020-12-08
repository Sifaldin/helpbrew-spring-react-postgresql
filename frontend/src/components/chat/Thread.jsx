import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Api from "..//..//api/Api";


function Thread({ thread, setMessageBox }) {
  const senderMail = window.sessionStorage.getItem('userEmail');
  const receiverEmail = senderMail === thread.p1Email ? thread.p2Email : thread.p1Email;
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
        {' '}
        <img src="/images/sender.jpeg" alt="name" />{' '}
      </div>
      <div >
        <h5>
          <Link to="/chat" onClick={clickHandler}>
           {user.name}
          </Link>
          <span >{lastDate}</span>
        </h5>
        <p>{receiverMessage}</p>
      </div>
    </div>
  );
}

export default Thread;
