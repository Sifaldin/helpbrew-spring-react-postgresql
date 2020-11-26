import React, { useState } from 'react';
import CommentUpdateForm from './CommentUpdateForm';
import Api from "../../api/Api";

function CommentCard({ comment, onDeleteClick, onUpdateClick }) {

  const [isUpdating, setIsUpdating] = useState(false);
  const [reaction, setReaction] = useState(comment.reaction);

  const handleUpdateClick = () => {
    setIsUpdating(true);
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

  return isUpdating ? (
    <CommentUpdateForm
      oldComment={comment}
      onUpdateClick={onUpdateClick}
      setIsUpdating={setIsUpdating}
    />
  ) : (
    <div>
      <h5>{comment.authorName}</h5>
      <h4>{comment.body}</h4>

      <div className="comment-option-reaction">
        <button className="one-comment-button" onClick={incrementLike}>
          <i className="fas fa-thumbs-up"></i> {reaction.like}
        </button>
        <button className="one-comment-button" onClick={incrementDislike}>
          <i className="fas fa-thumbs-down"></i> {reaction.dislike}
        </button>
      </div>

      <div>
        <button
          className="comment-btn"
          onClick={() => onDeleteClick(comment.id)}
        >
          Delete
        </button>

        <button className="comment-btn" onClick={handleUpdateClick}>
          Update
        </button>
      </div>
    </div>
  );
}

export default CommentCard;
