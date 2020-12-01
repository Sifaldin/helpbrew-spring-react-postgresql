import React, { useState } from "react";
import Api from "../../api/Api";
import "../../css/Components/profilePage/profile.css";
import Auth from "../../services/Auth";
import ProfileImageUploader from "./ProfileImageUploader";

export default function ProfilePage({ user, setUser }) {

    const onLogout = () => Auth.logout();
    const [imgUrl, setImgUrl] = useState("");

    const updateUser = () => {
        const img = { ...user, imageUrl: imgUrl }
        Api.put("/user/me", img).then((res) => setUser(res.data));
    };

    return (

        <div className="profilePage">

            { (user.imageUrl === null) ? null : 
              <div className={"imgOuterContainer"}>
                <div className="img-container">
                    <img className="profileImg" src={user.imageUrl} />
                </div>
              </div>  }

            <div>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
            </div>

            <div className="profileTools">
                <div><i class="fas fa-bell"></i></div>
                <div><i class="fas fa-inbox"></i></div>
                <div><i class="fas fa-calendar-alt"></i></div>
            </div>

            {(user.imageUrl === null) ? 
            <div>
                <ProfileImageUploader setImgUrl={setImgUrl} />
                <button onClick={updateUser}>Share</button>
            </div> : null}

            <button onClick={onLogout}>Logout</button>

        </div>
    )
}