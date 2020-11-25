import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="product-grid4">
        <div className="product-image4">
          <a href={post.imageUrl}>
            <img
              className={post.claimed ? 'claimed pic-1' : 'pic-1'}
              src={post.imageUrl}
              alt=""
            />
            <img
              className={post.claimed ? 'claimed pic-2' : 'pic-2'}
              src={post.imageUrl}
              alt=""
            />
          </a>
          {post.claimed ? (
            <span className="product-new-label">Claimed</span>
          ) : (
            <span className="product-new-label">Available</span>
          )}
        </div>
        <div className="product-content">
          <h3 className="title">
            <a href={post.title}>{post.title}</a>
          </h3>
          <div className="info">
            <span>{post.date}</span>
            <br />
          </div>
          <Link className="claim" to={{ pathname: `/posts/${post.id}`, state: { post } }}>
            View Harvest
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
