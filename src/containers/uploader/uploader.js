import React, { useState, useContext } from "react";
import { storage } from "../../utility/firebase.utility";
import { Context } from "../../utility/reducers";
import "./uploader.scss";

const Uploader = (props) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [state, dispatch] = useContext(Context);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validationType = ["image/gif", "image/jpeg", "image/png"];

      if (validationType.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        setError("Please select a correct image file type");
      }
    }
  };

  const handleUpdate = () => {
    console.log("clicked");
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setProgress(0);
              dispatch({ type: "IMAGE", payload: url });
            });
        }
      );
    } else {
      setError("Error Please Choose an Image to Upload");
    }
  };

  return (
    <div className="uploader">
      <div>
        <input
          id="file"
          className="uploader-input"
          type="file"
          onChange={handleChange}
          placeholder=""
        />
        <label htmlFor="file" className="label-upload">
          Upload Img
        </label>
        <button onClick={handleUpdate} id="submit-btn">
          upload photo
        </button>
      </div>
      <div style={{ height: "100px" }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </div>
  );
};

export default Uploader;
