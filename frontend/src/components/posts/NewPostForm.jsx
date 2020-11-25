import { format } from 'date-fns';
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

function NewPostForm({ setPost }) {
  const [imgUrl, setImgUrl] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [details, setDetails] = useState('');
  const [postAs, setPostAs] = useState('');
  const [uploading, setUploading] = useState(true);

  const submitHandler = event => {
    event.preventDefault();
    setPost({
      title: postTitle,
      body: details,
      claimed: false,
      imageUrl: imgUrl,
      date: format(new Date(), 'dd-MMM-yyyy'),
      poster: postAs
    });
  };

  return (
    <form style={{ width: '100%' }} onSubmit={submitHandler}>
      <h1 style={{ textAlign: 'center', color: '#6C6C6C' }}>Upload Details</h1>
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Post as</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Post as..."
              onChange={e => setPostAs(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Donation Title</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput1"
              placeholder="What are you donating?"
              onChange={e => setPostTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Details about donation:</label>
            <textarea
              type="text"
              className="form-control"
              id="formGroupExampleInput3"
              placeholder="Details about the donation?...  expiry date, quantity, or anything else you would like to share."
              rows="3"
              onChange={e => setDetails(e.target.value)}
            />
          </div>
          <button
            disabled={uploading ? true : false}
            type="submit"
            className="btn-newPost">
            {uploading ? '- - - - -' : 'Submit'}
          </button>
        </div>

        <div className="col-md-6 col-sm-6">
          <ImageUploader setUploading={setUploading} setImgUrl={setImgUrl} />
        </div>
      </div>
    </form>
  );
}

export default NewPostForm;
