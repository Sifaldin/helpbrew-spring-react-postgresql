import React, { useState } from "react";
import Api from "../../api/Api";
import { useNotification } from "../notifications/NotificationProvider";
import ProfileImageUploader from "./ProfileImageUploader";
import { IoMdCloseCircle } from "react-icons/io";

export default function ImageEditMenu({ user, setUser, setShowImageEdit }) {
  const [imgUrl, setImgUrl] = useState(user.imageUrl);

  //Notification Creator
  const dispatch = useNotification();
  const handleNewNotification = () => {
    dispatch({
      type: "SUCCESS",
      message: "Image Uploaded",
    });
  };

  //Notification Creator
  const deleteImageNotification = () => {
    dispatch({
      type: "ERROR",
      message: "Image Deleted",
    });
  };

  //Callback function that will send a user update call to the server
  const updateUser = () => {
    const updated = { ...user, imageUrl: imgUrl };
    Api.put("/user/me", updated).then((res) => setUser(res.data));
   
  };

  //Callback function that will return the image uploader to change the image
  const changeImage = () => {
    setImgUrl(null);
    updateUser();
    deleteImageNotification();
  };
  return (
    <div className="image-menu-wrapper">
      <div className="modal-backdrop">
        <div className="modal-box">
          <div className="modal-icon">
            <IoMdCloseCircle
              color="lightblue"
              onClick={() => setShowImageEdit(false)}
            />
          </div>


        <div className="image-edit-body">
            <img className={"profileImg"} src={imgUrl} />
          <div className={"uploader"}>
           <ProfileImageUploader setImgUrl={setImgUrl}
            />
            
            <button
              className="share-btn"
              onClick={() => {
                updateUser();
                handleNewNotification();
                setShowImageEdit(false);
              }}
            >
              Upload
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
