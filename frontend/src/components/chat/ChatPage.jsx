import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ChatApi from "../../api/ChatApi";
import { useHistory } from "react-router-dom";
import DropDownItem from "../profile/DropDownItem";

function ChatPage({ id, thread, loggedInUser }) {
  // const loggedInUser = window.sessionStorage.getItem('userEmail');
  var receiverEmail = loggedInUser.name;
  // if (id != 0) {
  //   receiverEmail =
  //     loggedInUser === thread.user1.email ? thread.user2.email : thread.user1.email;
  // } else {
  //   thread = { id: "0", user1.email: "", thread.user2.email: "", thread: "" };
  // }

  var [messageText, setMessageText] = useState({ text: "" });
  var [messageArray, setMessageArray] = useState(thread.thread);

  //messageArray = null;
  const sendMessage = async () => {
    try {
      const response = await ChatApi.createMessage(id, receiverEmail, {
        messageBody: messageText.text,
        thread: { id: id },
        date: format(new Date(), "dd-MMM-yyyy HH:MM"),
      });
      setMessageArray([...messageArray, response.data]);
      setMessageText({ text: "" });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const poll = setInterval(() => {
      const updateThread = async () => {
        const response = await ChatApi.getThreadById(id);
        setMessageArray(response.data.thread);
      };
      updateThread();
    }, 1000);
    return () => clearInterval(poll);
  }, [id]);

  // const handleClick = e => {
  //   e.preventDefault();
  //   //sendMessage();
  // };

  const messageHandler = (e) => {
    e.preventDefault();
    const createOrDirect = async () => {
      try {
        const response_message = await ChatApi.createMessage(
          thread.id,
          receiverEmail,
          {
            messageBody: messageText.text,
            thread: { id: thread.id },
            date: format(new Date(), "dd-MMM-yyyy HH:MM"),
          }
        );
        setMessageArray([...messageArray, response_message.data]);
        setMessageText({ text: "" });
        /*history.push({ pathname: `/chat/${thread.id}`, state: { thread } });*/
      } catch (e) {
        console.log(e);
      }
    };
    createOrDirect();
  };

  const messages =
    messageArray === null
      ? null
      : messageArray.map((message) => {
          if (message.senderEmail === loggedInUser) {
            return (
              <div className="outgoing_msg" key={message.id}>
                <div className="sent_msg">
                  <p>{message.messageBody}</p>
                  <span className="time_date"> {message.date}</span>{" "}
                </div>
              </div>
            );
          } else {
            return (
              <div className="incoming_msg" key={message.id}>
                <div className="incoming_msg_img">
                  {" "}
                  <img src="/images/sender.jpeg" alt="name" />{" "}
                </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{message.messageBody}</p>
                    <span className="time_date"> {message.date}</span>
                  </div>
                </div>
              </div>
            );
          }
        });

  return (
    <form onSubmit={(e) => messageHandler(e)}>
      <div className="msg_history">{messages}</div>
      <div className="type_msg">
        <div className="input_msg_write">
          <input
            autoFocus
            value={messageText.text}
            id="chatInput"
            type="text"
            className="write_msg"
            onChange={(e) => setMessageText({ text: e.target.value })}
            placeholder="Type a message"
          />
          <button className="msg_send_btn" type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatPage;
