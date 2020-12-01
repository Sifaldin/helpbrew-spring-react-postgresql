import { format } from "date-fns";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Api from "../../../api/Api";
import App from "../../../App";
import ImageUploader from "../molecules/ImageUploader";

//Displays the form for creation of a new post by user
function NewGiverPost({ setPosts, user }) {
  const history = useHistory();

  const [imgUrl, setImgUrl] = useState("");
  const [postType, setPostType] = useState("");
  const [details, setDetails] = useState("");
  const [postAs, setPostAs] = useState("");
  const [uploading, setUploading] = useState(true);
  const [postCategory, setPostCategory] = useState("giveaways");

  const getAll = () => {
    Api.get("/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newPost = {
      body: details,
      claimed: false,
      imageUrl: imgUrl,
      postType: postType,
      date: format(new Date(), "dd-MMM-yyyy"),
      poster: postAs,
      category: postCategory,
    };
    console.log(newPost.imageUrl);
    Api.post("/posts", newPost).then((res) => {
      getAll();
      history.push(`/posts/category/${postCategory}`);
    });
  };

  return (
    <form style={{ width: "100%" }} onSubmit={submitHandler}>
      <h1 style={{ textAlign: "center", color: "#6C6C6C" }}>Offer help</h1>
      <div>
        <div>
          <div>
            <label>{user.name}</label>
          </div>
          <div>
            <label>Donation Title</label>
            <input
              type="text"
              placeholder="What are you donating?"
              onChange={(e) => setPostType(e.target.value)}
            />
          </div>
          <div>
            <label>Details about donation:</label>
            <textarea
              type="text"
              placeholder="Details about the donation?...  expiry date, quantity, or anything else you would like to share."
              rows="3"
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div>
            <label>Choose a category:</label>
            <select
              name="category"
              onChange={(e) => setPostCategory(e.target.value)}
            >
              <option value="giveaways">giveaways</option>
              <option value="skills">skills</option>
              <option value="monetary-support">monetary-support</option>
            </select>
          </div>
          <button disabled={uploading ? true : false} type="submit">
            {uploading ? "- - - - -" : "Submit"}
          </button>
        </div>

        <div>
          <ImageUploader setUploading={setUploading} setImgUrl={setImgUrl} />
        </div>
        <div>
          <button onClick= "">Add to calender</button>
        </div>
      </div>
    </form>
  );
}

export default NewGiverPost;
