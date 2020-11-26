import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ChatApi from '../../api/ChatApi';

function ChatPage({ id, thread }) {
  const loggedInUser = window.sessionStorage.getItem('userEmail');
  const receiverEmail = loggedInUser === thread.p1Email ? thread.p2Email : thread.p1Email;
  const [messageText, setMessageText] = useState({ text: '' });
  const [messageArray, setMessageArray] = useState(thread.thread);

  const sendMessage = async () => {
    try {
      const response = await ChatApi.createMessage(id, receiverEmail, {
        messageBody: messageText.text,
        thread: { id: id },
        date: format(new Date(), 'dd-MMM-yyyy HH:MM')
      });
      setMessageArray([...messageArray, response.data]);
      setMessageText({ text: '' });
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

  const handleClick = e => {
    e.preventDefault();
    sendMessage();
  };

  const messages =
    messageArray === null
      ? null
      : messageArray.map(message => {
          if (message.senderEmail === loggedInUser) {
            return (
              <div  key={message.id}>
                <div >
                  <p>{message.messageBody}</p>
                  <span > {message.date}</span>{' '}
                </div>
              </div>
            );
          } else {
            return (
              <div  key={message.id}>
                <div >
                  {' '}
                  <img src="/images/sender.jpeg" alt="name" />{' '}
                </div>
                <div >
                  <div >
                    <p>{message.messageBody}</p>
                    <span > {message.date}</span>
                  </div>
                </div>
              </div>
            );
          }
        });

  return (
    <form>
      <div >{messages}</div>
      <div >
        <div >
          <input
            autoFocus
            value={messageText.text}
            id="chatInput"
            type="text"
            onChange={e => setMessageText({ text: e.target.value })}
            placeholder="Type a message"
          />
          <button onClick={handleClick} type="submit">
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatPage;
