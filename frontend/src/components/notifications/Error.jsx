import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Error({ message, setDisplayError }) {
  return (
    <div className="error-wrapper">
      {/* <div onClick={close} className={"modal-backdrop"} /> */}
      <div className="modal-box">
        <div className="modal-icon">
          <IoMdCloseCircle
            color="lightblue"
            onClick={() => setDisplayError(false)}
          />
        </div>

        <div className="error-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
