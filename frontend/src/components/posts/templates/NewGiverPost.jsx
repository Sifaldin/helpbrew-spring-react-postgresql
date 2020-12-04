import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Api from "../../../api/Api";
import ImageUploader from "../molecules/ImageUploader";
import Map from "../molecules/Map";
import { useNotification } from "../../notifications/NotificationProvider";
import axios from "axios";

//Displays the form for creation of a new post by user
function NewGiverPost({ setPosts, user }) {
  const history = useHistory();
  const location = useLocation();
  const [imgUrl, setImgUrl] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [details, setDetails] = useState("");
  const [uploading, setUploading] = useState(true);
  const [postCategory, setPostCategory] = useState("giveaways");
  const [locationInput, setLocationInput] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState([]);

  const getAll = () => {
    Api.get("/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const dispatch = useNotification();
  const handleNewNotification = () => {
    dispatch({
      type: "SUCCESS",
      message: "Posted!",
    });
  };

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
      location: address,
      position: position,
    };

    Api.post("/posts", newPost).then((res) => {
      console.log(res.data);
      getAll();
      history.push(`/posts/category/${postCategory}`);
    });
  };

  // The geocoder api used in this components requires the address string to be at least 3 characters long.
  // That is when a request to the api will be made.
  useEffect(() => {
    if (address.length >= 3) {
      fetchPosition();
    }
  }, [address]);

  //The geocoder api positionstack allows to convert address string into lat, lng coordinates,
  //which can the be passed to Map component for map display.
  async function fetchPosition() {
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=26f92b100e63df8995a3669559ae5d78&query=${address}&limit=10&output=json`
    );
    setPosition([
      response.data.data[0].latitude,
      response.data.data[0].longitude,
    ]);
  }

  return (
    <div className="card-container">
      <form className="createcard" onSubmit={submitHandler}>
        <div className="card-body">
          <div className="page-title">
            <h1>OFFER HELP</h1>
          </div>

          <label className="custom-field">
            <select
              required
              name="category"
              className="card-input"
              onChange={(e) => {
                setPostCategory(e.target.value);
              }}
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

          <div>
            {/* Depending on the category chosen by user from drop-down menu,
            a field for entering a pick-up location will be displayed or not */}
            {postCategory === "giveaways" ? (
              /* The field allows user to enter a pick-up location for giveaway posts and search for
              it on the map when the button Find location is pushed */
              <label className="custom-field">
                <input
                  type="text"
                  required
                  className="card-input"
                  onChange={(e) => setLocationInput(e.target.value)}
                />
                <span className="placeholder">
                  Enter Pick-Up Location(street, area or city name){" "}
                </span>
                <br />
                <button
                  style={{ marginLeft: "10px" }}
                  type="button"
                  className="small-button"
                  onClick={() => setAddress(locationInput)}
                >
                  Find location
                </button>
              </label>
            ) : null}
            <ImageUploader setUploading={setUploading} setImgUrl={setImgUrl} />
          </div>

          {/* Displays Map if coordinates(position) of the address searched above have been fetched */}
          <div>{position.length > 0 ? <Map position={position} /> : null}</div>

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
