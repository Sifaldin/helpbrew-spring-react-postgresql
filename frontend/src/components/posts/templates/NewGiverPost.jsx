import { format } from "date-fns";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Api from "../../../api/Api";
import ImageUploader from "../molecules/ImageUploader";
import Map from "../molecules/Map";

//Displays the form for creation of a new post by user
function NewGiverPost({ setPosts, user }) {
  const history = useHistory();
  const location = useLocation();
  const [imgUrl, setImgUrl] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [details, setDetails] = useState("");
  const [uploading, setUploading] = useState(true);
  const [postCategory, setPostCategory] = useState("giveaways");
  const [pickupLocation, setPickupLocation] = useState("");

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
      title: postTitle,
      date: format(new Date(), "dd-MMM-yyyy"),
      category: postCategory,
      postType: location.state.type,
      location: pickupLocation,
    };

    Api.post("/posts", newPost).then((res) => {
      console.log(res.data);
      getAll();
      history.push(`/posts/category/${postCategory}`);
    });
  };

  return (
    <div className="card-container">
      <form className="createcard" onSubmit={submitHandler}>
        <div className="card-body">
          <div className="page-title">
            <h1>OFFER HELP</h1>
          </div>
          <ImageUploader setUploading={setUploading} setImgUrl={setImgUrl} />
          <label className="custom-field">
            <select
              required
              name="category"
              className="card-input"
              onChange={(e) => setPostCategory(e.target.value)}
            >
              <option disabled selected>
                Choose Category
              </option>
              <option value="giveaways">Giveaways</option>
              <option value="skills">Skills</option>
              <option value="monetary-support">Monetary support</option>
            </select>
          </label>

          <label className="custom-field">
            <input
              type="text"
              required
              className="card-input"
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <span className="placeholder">Enter Title </span>
          </label>
          <label className="custom-field">
            <textarea
              type="text"
              required
              className="card-input"
              rows="3"
              onChange={(e) => setDetails(e.target.value)}
            />
            <span className="placeholder">Enter Details</span>
          </label>

          <label className="custom-field">
            <input
              type="text"
              required
              className="card-input"
              onChange={(e) => setPickupLocation(e.target.value)}
            />
            <span className="placeholder">Enter Pick-Up Location </span>
          </label>

          {pickupLocation ? <Map address={pickupLocation} /> : null}

          <button
            className="medium-button"
            disabled={uploading ? true : false}
            type="submit"
          >
            {uploading ? "Submit" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewGiverPost;
