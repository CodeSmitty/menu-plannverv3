import React, { useState, useEffect } from "react";
import "./serviceform.scss";
import {useStore} from "../../utility/reducers";
import ImageSelector from "../ImageSelector/ImageSelector";
//import axios from "../../utility/axios.orders";
import firebase from "../../utility/firebase.utility";
import { storage } from "../../utility/firebase.utility";

const ServiceForm = (props) => {
  const [state, dispatch] = useStore();
  const [image, setImage] = useState(null);
  //const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [database, setDatabase] = useState(null);
  const [placeholderData, setPlaceholderData] = useState({});
  const db = () => firebase.database();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
              const value = state.serviceType;
              const keys = Object.keys(value);
              var filtered = keys.filter(function (key) {
                return value[key];
              });

              const mealData = db().ref().child("meals");
              
              
              const dateKey = props.dates + filtered;

              const userRef = db().ref("meals");

              userRef.once("value", (snapshot) => {
                if (!snapshot.hasChild(dateKey)) {
                  mealData.child(dateKey).set({
                    date: props.dates,
                    serviceId: dateKey,
                    serviceType: filtered,
                    service: state,
                  });
                } else if (snapshot.hasChild(dateKey)) {
                  db()      
                    .ref(dateKey)
                    .once("value", (snap) => {
                      console.log(snap.val());
                      mealData.child(dateKey).update({
                        service: state,
                      });
                    });
                }
              });
              
              setProgress(0);
            });
        }
      );
    }
    dispatch({ type: 'reset' });
  };

  useEffect(() => {
    if (props.dates) {
      setPlaceholderData({});
    }
  
      db()
        .ref("meals/")
        .on("value", (snapshot) => {
          const snapValue = snapshot.val();
          const lunchOrDinnerValues = snapValue
            ? Object.values(snapValue)
                .filter((x) => {
                  return x? x.date === props.dates && x.serviceType[0] === database : null
                  
                })
                .map((x) => x.date)
            : null;
          if (lunchOrDinnerValues ?  lunchOrDinnerValues[0] === props.dates : null) {
            const serviceData = snapValue
              ? Object.values(snapValue).find((x) => {
                  return (
                    x.date === props.dates && x.serviceType[0] === database
                  );
                })
              : null;
               
            setPlaceholderData({ serviceData });
            
          };
        });
    
  
   
  }, [database, props.dates]);



  const entre =
    placeholderData &&
    placeholderData.serviceData &&
    placeholderData.serviceData.service.entre.value;
  const sideOne =
    placeholderData &&
    placeholderData.serviceData &&
    placeholderData.serviceData.service.sideOne.value;
  const sideTwo =
    placeholderData &&
    placeholderData.serviceData &&
    placeholderData.serviceData.service.sideTwo.value;
  const description =
    placeholderData &&
    placeholderData.serviceData &&
    placeholderData.serviceData.service.description.value;

  return (
    <div className="container-box">
      <form onSubmit={handleSubmit} className="form">
        <div className="meal-container">
          <div className="entre-form">
            <input
              className="input-text"
              type="text"
              name="entre.value"
              onChange={(event) => {
                dispatch({ type: "ENTRE_TEXT", payload: event.target.value });
              }}
              value={state.entre.value ? state.entre.value : entre}
              placeholder={entre ? entre : "entree"}
            />
            <div className="diets">
              <input
                onChange={(event) => {
                  dispatch({ type: "ENTRE", payload: event.target.name });
                }}
                name="veg"
                checked={state.entre.veg}
                type="checkbox"
              />
              <label>Veg</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "ENTRE", payload: event.target.name });
                }}
                checked={state.entre.glut}
                name="glut"
                type="checkbox"
              />
              <label>Gluten</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "ENTRE", payload: event.target.name });
                }}
                checked={state.entre.dairy}
                name="dairy"
                type="checkbox"
              />
              <label>Dairy</label>
            </div>
          </div>

          <div className="entre-form">
            <input
              className="input-text"
              type="text"
              onChange={(event) => {
                dispatch({ type: "SIDE_TEXT", payload: event.target.value });
              }}
              name="sideOne"
              value={state.sideOne.value}
              placeholder={sideOne ? sideOne : "First Side"}
            />
            <div className="diets">
              <input
                onChange={(event) => {
                  dispatch({ type: "SIDE_ONE", payload: event.target.name });
                }}
                name="veg"
                checked={state.sideOne.veg}
                type="checkbox"
              />
              <label>Veg</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "SIDE_ONE", payload: event.target.name });
                }}
                name="glut"
                checked={state.sideOne.glut}
                type="checkbox"
              />
              <label>Gluten</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "SIDE_ONE", payload: event.target.name });
                }}
                name="dairy"
                checked={state.sideOne.dairy}
                type="checkbox"
              />
              <label>Dairy</label>
            </div>
          </div>

          <div className="entre-form">
            <input
              className="input-text"
              onChange={(event) => {
                dispatch({ type: "SIDETWO_TEXT", payload: event.target.value });
              }}
              name="entre.value"
              value={state.sideTwo.value}
              placeholder={sideTwo ? sideTwo : "Second Side"}
            />
            <div className="diets">
              <input
                onChange={(event) => {
                  dispatch({ type: "SIDE_TWO", payload: event.target.name });
                }}
                checked={state.sideTwo.veg}
                name="veg"
                type="checkbox"
              />
              <label>Veg</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "SIDE_TWO", payload: event.target.name });
                }}
                checked={state.sideTwo.glut}
                name="glut"
                type="checkbox"
              />
              <label>Gluten</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "SIDE_TWO", payload: event.target.name });
                }}
                checked={state.sideTwo.dairy}
                name="dairy"
                type="checkbox"
              />
              <label>Dairy</label>
            </div>
          </div>
          <div className="entre-form">
            <textarea
              className="input-text"
              onChange={(event) => {
                dispatch({
                  type: "DESCRIPTION_TEXT",
                  payload: event.target.value,
                });
              }}
              value={state.description.value}
              name="description"
              placeholder={description ? description : "Description"}
            />
            <div className="diets">
              <input
                onChange={(event) => {
                  dispatch({ type: "DESCRIPTION", payload: event.target.name });
                }}
                checked={state.description.veg}
                name="veg"
                type="checkbox"
              />
              <label>Veg</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "DESCRIPTION", payload: event.target.name });
                }}
                checked={state.description.glut}
                name="glut"
                type="checkbox"
              />
              <label>Gluten</label>

              <input
                onChange={(event) => {
                  dispatch({ type: "DESCRIPTION", payload: event.target.name });
                }}
                checked={state.description.dairy}
                name="dairy"
                type="checkbox"
              />
              <label>Dairy</label>
            </div>
            <div class="serviceType-checkboxes">
              <input
                className="svc-type"
                onChange={(e) => {
                  setDatabase(e.target.name);
                  dispatch({ type: "LUNCH", payload: e.target.name });
                }}
                checked={state.serviceType.lunch}
                name="lunch"
                type="checkbox"
              />
              <label>Lunch</label>
              <input
                className="svc-type"
                onChange={(e) => {
                  setDatabase(e.target.name);
                  dispatch({ type: "DINNER", payload: e.target.name });
                }}
                checked={state.serviceType.dinner}
                name="dinner"
                type="checkbox"
              />
              <label>Dinner</label>
              <ImageSelector
                error={error}
                progress={progress}
                handleChange={handleChange}
                className="uploader"
              />
              <button className="submit-btn" onClick={handleSubmit}>
                submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
