import React, { useState } from "react";
import Map from "../molecules/Map";
import SharedSinglePost from "./SharedSinglePost";
import Api from "../../../api/Api";


export default function GiveawayPost({
  post,
  setPosts,
  deletePost,
  user,
  posts,
  threadHandler,
}) {
  const [mapVisible, setMapVisible] = useState(false);
  const [availability, setAvailability] = useState(
    post.eventCapacity ? "Set item as unavailable" : "Set item as available"
  );
  

  const handleMapToggle = () => {
    mapVisible ? setMapVisible(false) : setMapVisible(true);
  };

  const toggleAvailability = () => {
    let updatedPost;

    if (post.eventCapacity === 1) {
      setAvailability("Set item as available");
      updatedPost = {
        ...post,
        eventCapacity: 0,
      };
    } else if (post.eventCapacity === 0) {
      setAvailability("Set item as unavailable");
      updatedPost = {
        ...post,
        eventCapacity: 1,
      };
    }

    Api.put("./posts", updatedPost).then((res) => {
      const updatedPosts = posts.map((post) =>
        post.id === res.data.id ? res.data : post
      );
      setPosts(updatedPosts);
    });
  };

  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}

      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      {post.postType === "give" ? (
        <div className="give-map">
          {post.user.email === user.email ? (
            <button
              className={`${
                availability === "Set item as unavailable"
                  ? "medium-button pink"
                  : "medium-button"
              }`}
              onClick={toggleAvailability}
            >
              {availability}
            </button>
          ) : (
            <p
              className="contact-link"
              onClick={threadHandler}
            >{`Contact ${post.user.name} to reserve the item`}</p>
          )}
          {/* Map is a component unique to giveaway post */}
          {post.location ? (
            <div className="map-group">
              <button
                className="medium-button location-button"
                onClick={handleMapToggle}
              >
                {mapVisible ? "Hide map" : "See location"}
              </button>
              {mapVisible ? (
                <div className="show-map map">
                  <Map position={post.position} address={post.location} />
                </div>
              ) : (
                <div className="map">
                  <Map
                    position={post.position}
                    style={{ display: "none" }}
                    address={post.location}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
     
      <SharedSinglePost
        post={post}
        setPosts={setPosts}
        deletePost={deletePost}
        user={user}
        posts={posts}
        threadHandler={threadHandler}
      />
      {/* </div> */}
    </div>
  );
}
