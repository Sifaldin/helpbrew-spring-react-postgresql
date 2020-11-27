import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/Components/profilePage/profile.css";

export default function ProfilePage() {

    const [user, setUser] = useState('');

    useEffect(() => {
        Api.get("/user/me").then((response) => {
            const user = response.data;
            setUser(user);
        });
    }, []);




    return (
        
        <div className="profilePage">
            <h1>{user.name}</h1>

            <h2>{user.email}</h2>
        </div>
    )
}