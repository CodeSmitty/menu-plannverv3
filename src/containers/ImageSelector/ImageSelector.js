import React from "react";
import "./uploader.scss";

const ImageSelector = (props) => (
  <div className="uploader">
    <div>
      <input
        id="file"
        className="uploader-input"
        type="file"
        onChange={props.handleChange}
        placeholder=""
      />
      <label htmlFor="file" className="label-upload">
        Select Image
      </label>
    </div>
    <div >
      {props.progress > 0 ? <progress value={props.progress} max="100" /> : ""}
      <p style={{ color: "red" }}>{props.error}</p>
    </div>
  </div>
);

export default ImageSelector;
