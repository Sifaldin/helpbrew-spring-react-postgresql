import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChatApi from "../../api/ChatApi";
import ChatPage from "./ChatPage";
import Thread from "./Thread";

// Todo: We should still filter out message threads based on user.
// Also, sometimes a second thread is generated even though one between the participants exist.
// We should revisit the backend to sort this issue.

function ThreadPage({ loggedInUser }) {
  const threadRef = useRef();
  const [threads, setThreads] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const thread = state === null || state === undefined ? "" : state.thread;
  const [messageBox, setMessageBox] = useState({
    threadId: id,
    thread: thread,
  });

  console.log(thread);
  useEffect(() => {
    const getThreads = async () => {
      const response = await ChatApi.getAllThread();
      const filtered = response.data.filter((thread) => {
        console.log(thread.user2.email);
        console.log(loggedInUser.email);
        return (
          thread.user2.email === loggedInUser.email ||
          thread.user1.email === loggedInUser.email
        );
      });
      setThreads(filtered);
    };
    getThreads();
  }, [loggedInUser]);

  useEffect(() => {
    console.log(state === undefined);
    if (state !== undefined) {
      setMessageBox({ threadId: thread.id, thread: thread });
      selectItem(thread);
    } else if (threads.length > 0) {
      setMessageBox({ threadId: threads[0].id, thread: threads[0] });
      threadRef.current.childNodes[0].className = "chat_people selected";
    }
  }, [threads, state]);

  const listOfThreads = threads.map((thread) => (
    <Thread
      threadRef={threadRef}
      key={thread.id}
      id={thread.id}
      setMessageBox={setMessageBox}
      thread={thread}
      threads={threads}
      loggedInUser={loggedInUser}
      selectItem={selectItem}
    />
  ));

  // console.log(threadRef.current.childNodes);

  function selectItem(item) {
    Array.from(threadRef.current.childNodes).map((thread) => {
      if (thread.id == item.id) {
        thread.className = "chat_people selected";
      } else {
        thread.className = "chat_people";
      }
    });
  }

  return (
    <div>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Messages</h4>
              </div>
            </div>
            <div className="inbox_chat scroll">
              <div ref={threadRef} className="chat_list active_chat">
                {threads === [] ? "loading..." : listOfThreads}
              </div>
            </div>
          </div>
          <div className="mesgs">
            {messageBox.thread === "" ? null : (
              <ChatPage
                id={messageBox.threadId}
                thread={messageBox.thread}
                loggedInUser={loggedInUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;
