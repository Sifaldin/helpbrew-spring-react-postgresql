import React, { useEffect, useState } from 'react';
import ReactImageUploadComponent from 'react-images-upload';
/*
Image Uploading Note:
Ideally the API should be in the backend, however, with testing, sending the image to the backend and then uploading takes too long.
Ideally, the backend should just sign an upload request, return the signed request to the frontend, which then uploads the image 
with the signed request. Unfortunately cloudinary's java documentation is very limited in this regard and we just did not have 
the time to figure it out. I'm sure with more time, we could do it.
*/

function ImageUploader({ setImgUrl, setUploading }) {
  const [payload, setPayload] = useState(null);

  const updateImage = event => {
    var file = event[0];
    var data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'harvest');
    setPayload(data);
  };

  useEffect(() => {
    const abortFetch = new AbortController();
    const sendImage = async () => {
      try {
        if (payload !== null) {
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dcbkjgr7c/image/upload', //We should probably put this in .env for now.
            {
              method: 'post',
              body: payload,
              signal: abortFetch.signal
            }
          );
          const jsonResponse = await response.json();
          setImgUrl(jsonResponse['secure_url']);
          setUploading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendImage();
    return () => abortFetch.abort();
  }, [payload, setImgUrl, setUploading]);

  return (
    <ReactImageUploadComponent
      singleImage={true}
      onChange={updateImage}
      buttonText="Choose Image"
      className="imgUploader"
      withPreview={true}
    />
  );
}

export default ImageUploader;
