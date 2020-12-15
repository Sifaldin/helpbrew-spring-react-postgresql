import React, { useState } from "react";
import Api from "../../../api/Api";
import { useHistory, useLocation } from "react-router-dom";
import ChatApi from "../../../api/ChatApi";
import { Link } from "react-router-dom";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

//PostCard displays a post in a listing of posts on PostsPage.

//The code below should be worked through. What information should be displayed on
//PostCard? Shall tags "Available"/"Claimed" stay as they are or are we changing that?
function PostCard({ post, loggedInUser }) {
  console.log(loggedInUser);
  const [reaction, setReaction] = useState(post.reaction);
  const history = useHistory();

  const getAvailability = () => {
    //Available variable checks if there are any spots available at the event or if
    // an item has been reserved by someone in case of giveaway post
    //When a giveaway post created eventCapacity is set to 1 automatically

    const available = post.eventCapacity - post.registeredUsers.length;

    switch (available) {
      case 0: {
        switch (post.category) {
          case "skills": {
            return (
              <span className="small-button" style={{ backgroundColor: "red" }}>
                Full
              </span>
            );
          }

          case "giveaways": {
            return (
              <span className="small-button" style={{ backgroundColor: "red" }}>
                Reserved
              </span>
            );
          }

          default:
            return null;
        }
      }
      case 1: {
        switch (post.category) {
          case "skills": {
            return (
              <span
                className="small-button"
                style={{ backgroundColor: "green" }}
              >
                1 spot
              </span>
            );
          }

          case "giveaways": {
            return (
              <span
                className="small-button"
                style={{ backgroundColor: "green" }}
              >
                Available
              </span>
            );
          }

          default:
            return null;
        }
      }
      default: {
        return (
          <span className="small-button" style={{ backgroundColor: "green" }}>
            {`${available} spots`}
          </span>
        );
      }
    }
  };

  const incrementLike = () => {
    const url = "/reactions/" + reaction.id + "?incrementTarget=like";
    Api.put(url, reaction).then((r) => {
      setReaction(r.data);
    });
  };

  const incrementDislike = () => {
    const url = "/reactions/" + reaction.id + "?incrementTarget=dislike";
    Api.put(url, reaction).then((r) => {
      setReaction(r.data);
    });
  };

  const threadHandler = () => {
    const createOrDirect = async () => {
      console.log(post.title);
      try {
        const response = await ChatApi.createThread(post.user, {
          title: post.title,
        });
        const thread = response.data;
        console.log(thread);
        history.push({ pathname: `/chat/${thread.id}`, state: { thread } });
      } catch (e) {
        console.log(e);
      }
    };
    createOrDirect();
  };

  return (
    <div className="postcard">
      <Link to={{ pathname: `/posts/${post.id}`, state: { post } }}>
        <img
          className="post-image"
          // className={post.claimed ? "claimed pic-1" : "pic-1"}
          src={post.imageUrl}
          alt=""
        />
      </Link>

      <div className="post-bottom">
        <div className="signature">
          <img
            className="comment-user"
            src={post.user.imageUrl}
            alt="Single post img"
          />
          <div className="spans">
            <span className="user-name">Posted by {post.user.name}</span>
            <span className="date">{post.date}</span>
          </div>
        </div>
        {/* Header includes post title and type(giving or requesting) */}
        <div className="header">
          <h3 className="title">{post.title}</h3>
          <span className="type-tag">{post.postType}</span>
          {/* Uncomment when Hassan fixes type for posts */}
          {/* <span>{post.type}</span> */}
        </div>
        {/* Post body */}
        <p className="post-text">{post.body}</p>
        {/* Signature includes post status and date */}
        <div className="signature">
          {post.claimed ? (
            <span className="small-button">Claimed</span>
          ) : (
            getAvailability()
          )}
          {/* <span className="post-date">{post.date}</span> */}
        </div>
        <hr />
        {/* React container includes reactions and link to the post details */}
        <div className="react">
          <div className="reaction">
            <button onClick={incrementLike}>
              <FaLongArrowAltUp className="up" />
              <span>{reaction.like}</span>

              {/* <i className="fas fa-thumbs-up"></i> {reaction.like} */}
            </button>
            <button onClick={incrementDislike}>
              <FaLongArrowAltDown className="down" />
              <span>{reaction.dislike}</span>

              {/* <i className="fas fa-thumbs-down"></i> {reaction.dislike} */}
            </button>
          </div>

          <Link className="medium-button" to={`/posts/${post.id}`}>
            View post
          </Link>

          {loggedInUser.email === post.user.email ? null : (
            <div>
              <button
                className="mes-button"
                onClick={threadHandler}
                type="submit"
              >
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>
        <hr />
        {/* Once View Post button is clicked by user, user is redirected to 
          the SinglePost page where all the details about the post are specified.
          */}
      </div>
    </div>
  );
}

export default PostCard;
