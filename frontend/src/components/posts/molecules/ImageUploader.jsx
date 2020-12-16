import React, { useEffect, useState } from "react";
import ReactImageUploadComponent from "react-images-upload"; 
/*
Image Uploading Note:
Ideally the API should be in the backend, however, with testing, sending the image to the backend and then uploading takes too long.
Ideally, the backend should just sign an upload request, return the signed request to the frontend, which then uploads the image 
with the signed request. Unfortunately cloudinary's java documentation is very limited in this regard and we just did not have 
the time to figure it out. I'm sure with more time, we could do it.
*/

function ImageUploader({ setImgUrl, setUploading }) {
  const [payload, setPayload] = useState(null);

  const updateImage = (event) => {
    var file = event[0];
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "teamphoenix");
    setPayload(data);
  };

  useEffect(() => {
    const abortFetch = new AbortController();
    const sendImage = async () => {
      try {
        if (payload !== null) {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dvmod9mrk/image/upload", 
            {
              method: "post",
              body: payload,
              signal: abortFetch.signal,
            }
          );
          const jsonResponse = await response.json();
          setImgUrl(jsonResponse["secure_url"]);
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
    <div className="">
    <ReactImageUploadComponent
      singleImage={true}
      onChange={updateImage}
      buttonText="Upload Image"
      withPreview={true}
      withLabel={false}
      withIcon={false}
      buttonStyles={{ background: "#1e6fbf", borderRadius: "8px" }}
      buttonClassName="upload-button"
      fileContainerStyle={{  boxShadow: "none" }}
      
    />
    </div>
  );
}

export default ImageUploader;
