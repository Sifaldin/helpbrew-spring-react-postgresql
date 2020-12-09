import React, { useState, useEffect } from 'react'
import ChatApi from '../../api/ChatApi';
import { Link } from 'react-router-dom';

function MessageNotification(thread, setMessageBox) {
    const clickHandler = () => {
        setMessageBox({ threadId: thread.id, thread: thread });
    };
    // const [allThread, setAllThread] = useState([])
    // useEffect(() => {

    //     ChatApi.getAllThread().then((response) => {
    //         const allThread = response.data;
    //         setAllThread(allThread);
    //     });
    // }, []);
    
 console.log(thread)

    return (
        <div>
            {/* <Link to="/chat" >
            <h3>{thread.thread.thread[1].receiverEmail}</h3>
            </Link> */}
            
            {/* {
            thread.map(messages =>(
                
            ))
            } */}
        </div>
    )
}

export default MessageNotification
