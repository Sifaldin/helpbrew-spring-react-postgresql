import React, { useEffect, useState } from 'react';
import NewCommentForm from './NewCommentForm';
import CommentCard from './CommentCard';
import Api from '../../api/Api';
import CommentApi from '..//../api/CommentApi';

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const createComment = commentData => {
    Api.post('/comments', commentData).then(response =>
      setComments([...comments, response.data])
    );
  };

  const getAll = () => {
    Api.get('/comments').then(response => setComments(response.data));
  };

  const deleteComment = id => {
    Api.delete('/comments/' + id).then(response => getAll());
  };

  const updateComment = updatedComment => {
    CommentApi.updateComment('/comments', updatedComment).then(r => getAll());
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="comment-card">
      <NewCommentForm onSubmit={createComment} />
      {comments.map(comment => (
        <CommentCard
          comment={comment}
          key={comment.id}
          onUpdateCick={updateComment}
          onDeleteClick={deleteComment}
        />
      ))}
    </div>
  );
}

export default CommentsPage;
