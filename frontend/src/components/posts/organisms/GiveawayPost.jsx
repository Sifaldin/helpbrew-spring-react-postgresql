import React, { useRef, useState } from "react";
import Map from "../molecules/Map";
import SharedSinglePost from "./SharedSinglePost";

export default function GiveawayPost({
  post,
  setPosts,
  deletePost,
  user,
  posts,
}) {
  const [mapVisible, setMapVisible] = useState(false);

  const handleMapToggle = () => {
    mapVisible ? setMapVisible(false) : setMapVisible(true);
  };

  return (
    // consists of hero image for post and single-post-card
    <div className="single-post">
      {/* conssits of SharedSinglePost - component that displays post information
            which is common to posts of all the three categories, and a map */}

      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      {post.user.email === user.email ? null : (
        <p>{`Contact ${post.user.name} to reserve the item`}</p>
      )}

      {/* Map is a component unique to giveaway post */}
      {post.location ? (
        <div>
          <button
            className="medium-button location-button"
            onClick={handleMapToggle}
          >
            {mapVisible ? "Hide map" : "See location"}
          </button>
          {mapVisible ? (
            <div className="show-map map">
              <Map position={post.position} />
            </div>
          ) : (
            <div className="map">
              <Map position={post.position} style={{ display: "none" }} />
            </div>
          )}
        </div>
      ) : null}

      {/* <div className="single-post-card"> */}
      <SharedSinglePost
        post={post}
        setPosts={setPosts}
        deletePost={deletePost}
        user={user}
        posts={posts}
      />
      {/* </div> */}
    </div>
  );
}
