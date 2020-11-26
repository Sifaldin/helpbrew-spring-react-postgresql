import React, { useEffect, useState } from "react";
import NewCommentForm from "./NewCommentForm";
import CommentCard from "./CommentCard";
import Api from "../../api/Api";
import CommentApi from "..//../api/CommentApi";

function CommentsPage({ post }) {
  const [comments, setComments] = useState([]);

  const getAllByPost = () => {
    CommentApi.getAllCommentsByPost(post.id).then((comments) =>
      setComments(comments)
    );
  };

  useEffect(() => {
    getAllByPost();
  }, []);

  const createComment = (commentData) => {
    Api.post("/comments", commentData).then((response) => {
      console.log(response.data);
      setComments([...comments, response.data]);
    });
  };

  const deleteComment = (id) => {
    Api.delete("/comments/" + id).then((response) => getAllByPost());
  };

  const updateComment = (updatedComment) => {
    Api.put("/comments", updatedComment).then((r) => getAllByPost(post));
  };

  return (
    <div className="comment-card">
      <NewCommentForm onSubmit={createComment} post={post} />
      {comments.map((comment) => (
        <CommentCard
          comment={comment}
          key={comment.id}
          onUpdateClick={updateComment}
          onDeleteClick={deleteComment}
        />
      ))}
    </div>
  );
}

export default CommentsPage;
