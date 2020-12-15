
import { format } from "date-fns";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../../../api/Api";
import { useNotification } from "../../notifications/NotificationProvider";
import ImageUploader from "../molecules/ImageUploader";
import giveAwaycreate from "../../../assets/createPost.png";

function NewRequestPost({ setPosts, user }) {
    const history = useHistory();
    const location = useLocation();
    const [imgUrl, setImgUrl] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [details, setDetails] = useState("");
    const [uploading, setUploading] = useState(true);
    const [postCategory, setPostCategory] = useState("");
    

    const getAll = () => {
        Api.get("/posts").then((res) => {
            setPosts(res.data);
        });
    };

    const dispatch = useNotification();
  const handleNewNotification = () => {
      dispatch({
          type: "SUCCESS",
          message: "Posted!"
      })
  } 

    const submitHandler = (event) => {
        handleNewNotification();
        event.preventDefault();
        const newPost = {
            body: details,
            claimed: false,
            imageUrl: imgUrl,
            title: postTitle,
            date: format(new Date(), "dd-MMM-yyyy"),
            category: postCategory,
            postType: location.state.type,
            user: user
        };
       
        Api.post("/posts", newPost).then((res) => {
            getAll();
            history.push(`/posts/category/${postCategory}`);
        });
    };

    return (
        <div className="create-container">
        
            <form className="createcard" onSubmit={submitHandler}>
                    <div className="card-body">    
                        <div className="page-title">
                            <h1>Need help?</h1>
                        </div>
                                <ImageUploader setUploading={setUploading} setImgUrl={setImgUrl} />

                                    <label className="custom-field">
                                        <select
                                            required
                                            name="category"
                                            className={`${postCategory.length>0 ? 'card-input' : 'waitInput'}`}
                                            onChange={(e) => setPostCategory(e.target.value)}>
                                            <option disabled selected>Choose a category</option>
                                            <option value="giveaways">Giveaways</option>
                                            <option value="skills">Skills</option>
                                            <option value="monetary-support">Monetary support</option>
                                        </select>
                                    </label>

                                    <label className="custom-field">
                                        <input
                                            type="text"
                                            required
                                            className={`${postTitle.length>0 ? 'card-input' : 'waitInput'}`}
                                            onChange={(e) => setPostTitle(e.target.value)}
                                        />
                                        <span className="placeholder">Enter Title</span>
                                    </label>

                                    <label className="custom-field">
                                        <textarea
                                            type="text"
                                            required
                                            className={`${details.length>0 ? 'card-input' : 'waitInput'}`}
                                            rows="3"
                                            onChange={(e) => setDetails(e.target.value)}
                                        />
                                        <span className="placeholder">Ask for help</span>
                                    </label>
                                 <div className="ask-button">  
                                <button  className="medium-button" disabled={uploading ? true : false} type="submit">
                                    {uploading ? "Submit" : "Submit"}
                                </button>
                    </div> 
                        </div>
            </form>

            <div className="right">
                <img src={giveAwaycreate} className="ask-image" alt="ask For help" />
            </div>

        </div>
        
        
    );
}

export default NewRequestPost
