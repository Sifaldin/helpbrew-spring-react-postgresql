import React from "react";
import { IoMdCloseCircle } from "react-icons/io";


export default function Warning({
  message,
  setDisplayError,
  seenPopup = null,
}) {
  return (
    <div className="error-wrapper">
      <div className="modal-backdrop">
        <div className="modal-box">
          <div className="modal-icon">
            <IoMdCloseCircle
              color="lightblue"
              onClick={() => {
                setDisplayError(false);
                if (seenPopup) seenPopup();
              }}
            />
          </div>

          <div className="error-body">
            <p className="error-mes">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
