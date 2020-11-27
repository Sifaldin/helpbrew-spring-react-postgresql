import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/Components/profilePage/profile.css";

export default function ProfilePage() {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    const [user, setUser] = useState('');


    useEffect(() => {
        Api.get("/user/me").then((response) => {
            const user = response.data;
            setUser(user);
        });
    }, []);




    return (

        <div className="profilePage">


            <div 
                style={{
                    height: "10rem",
                    width: "10rem",
                    border: "1px solid black",
                    borderRadius: "50%"
                }}
                onClick={() => imageUploader.current.click()}
            >
                <img
                    ref={uploadedImage}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        borderRadius: "50%"

                    }}
                />
                  <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                    display: "none"
                }}
            />

            </div>

           <div>
           <h1>{user.name}</h1>
            <h2>{user.email}</h2>
           </div>
           
            




        </div>


    )
}