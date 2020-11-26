import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChatApi from '../../api/ChatApi';
import ChatPage from './ChatPage';
import Thread from './Thread';

// Todo: We should still filter out message threads based on user.
// Also, sometimes a second thread is generated even though one between the participants exist.
// We should revisit the backend to sort this issue.

function ThreadPage() {
  const [threads, setThreads] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const locationState = state === null || state === undefined ? '' : state.thread;
  const [messageBox, setMessageBox] = useState({ threadId: id, thread: locationState });

  useEffect(() => {
    const getThreads = async () => {
      const response = await ChatApi.getAllThread();
      setThreads(response.data);
    };
    getThreads();
  }, []);

  const listOfThreads = threads.map(thread => (
    <Thread key={thread.id} setMessageBox={setMessageBox} thread={thread} />
  ));
  return (
    <div>
      <div >
        <div >
          <div >
            <div >
              <div >
                <h4>Recent</h4>
              </div>
              <div >
                <div >
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
            <div >
              <div >
                {threads === [] ? 'loading...' : listOfThreads}
              </div>
            </div>
          </div>
          <div >
            {messageBox.thread === '' ? null : (
              <ChatPage id={messageBox.threadId} thread={messageBox.thread} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;
