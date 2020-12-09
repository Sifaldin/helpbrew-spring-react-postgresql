import React, { useState } from "react";
import Api from "../../api/Api";
import Auth from "../../services/Auth";
import { useNotification } from "../notifications/NotificationProvider";
import ProfileImageUploader from "./ProfileImageUploader";
import Footer from '../layout/footer';


export default function ProfilePage({ user, setUser }) {

    //Notification Creator
    const dispatch = useNotification();
    const handleNewNotification = () => {
        dispatch({
            type: "SUCCESS",
            message: "Image Uploaded"
        })
    }

    //Notification Creator
    const deleteImageNotification = () => {
        dispatch({
            type: "ERROR",
            message: "Image Deleted"
        })
    }


    //Callback function that will be called upon clicking on the Logout Button
    const onLogout = () => Auth.logout();

    const [imgUrl, setImgUrl] = useState("https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png");

    //Callback function that will send a user update call to the server
    const updateUser = () => {
        const img = { ...user, imageUrl: imgUrl }
        Api.put("/user/me", img).then((res) => setUser(res.data));
    
    };

    //Callback function that will return the image uploader to change the image
    const changeImage = () => {
        setImgUrl(null);
        updateUser();
        deleteImageNotification();
        
    }


    return (



        <div className={"profilePage"}>

            {/*A function that will hide the image container if non existed */}
         

                <div className={"img-container"}>
                    <img className={"profileImg"} src={imgUrl} />
                    <button className={"edit-btn"} onClick={changeImage}><i class="fas fa-camera"></i></button>
                </div>
 

            <div className="user-info">
                <h1><i class="fas fa-user"></i> {user.name}</h1>
                <h4><i class="fas fa-envelope-square"></i> {user.email}</h4>
            </div>

            <div className={"profileTools"}>
                <div><i class="fas fa-bell"></i></div>
                <div><i class="fas fa-inbox"></i></div>
                <div><i class="fas fa-calendar-alt"></i></div>
            </div>
            {/*A function that will hide the image uploader if image existed */}
            {(user.imageUrl === null) ?
                <div className={"uploader"}>
                    <ProfileImageUploader setImgUrl={setImgUrl} updateUser={updateUser}/>
                    <button className="share-btn" onClick={() => {
                        updateUser();
                        handleNewNotification();
                    }}>Share</button>
                </div> : null}

            <button className={"profileLogoutBtn"} onClick={onLogout}>Logout</button>
            <Footer/>
        </div>

    )
}