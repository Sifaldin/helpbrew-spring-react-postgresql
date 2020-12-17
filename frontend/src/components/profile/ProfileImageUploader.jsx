import React, { useEffect, useState } from "react";
import ReactImageUploadComponent from "react-images-upload";


export default function ImageUploader({ setImgUrl }) {
  const [payload, setPayload] = useState(null);

 
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

        }
      } catch (error) {
        console.log(error);
      }
    };
    sendImage();
    return () => abortFetch.abort();
  }, [payload, setImgUrl]);

  const updateImage = (event) => {
    var file = event[0];
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "teamphoenix");
    setPayload(data);

  };

  return (
    <ReactImageUploadComponent
      singleImage={true}
      onChange={updateImage}
      buttonText="Edit Image"
      withLabel={false}
      withIcon={false}
      buttonStyles={{ background: "#ff75ac", borderRadius: "8px" }}
      buttonClassName="upload-button"
      fileContainerStyle={{ background: "#5493d2", boxShadow:"none" }}

    />
  );
}
