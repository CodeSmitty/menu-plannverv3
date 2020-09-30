import React, { useContext, useState, useEffect } from "react";
import "./serviceform.scss";
import { Context } from "../../utility/reducers";
import Uploader from "../uploader/uploader";
import axios from "../../utility/axios.orders";
//import moment from "moment";
//import firebase from "../../utility/firebase.utility";
import { useDatabase } from "../../utility/utility.functions";

const ServiceForm = (props) => {
  const [state, dispatch] = useContext(Context);

  const [newState, setNewState] = useState({
    id: null,
    date: null,
    serviceType: {
      lunch: null,
      dinner: null,
    },
    mealService: null,
  });
  //const [updatedState, setUpdatedState] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewState({
      ...newState,
      date: props.dates,
      mealService: state,
    });
  };

  useEffect(() => {
    axios
      .post(`/meals.json`, newState)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [newState]);

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
              placeholder="entree"
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
              placeholder="Side One"
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
              placeholder="Side Two"
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
              name="description"
              placeholder="description"
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
              <input
                onChange={(e) => {
                  dispatch({ type: "LUNCH", payload: e.target.name });
                }}
                checked={state.serviceType.lunch}
                name="lunch"
                type="checkbox"
              />
              <label>Lunch</label>
              <input
                onChange={(e) => {
                  dispatch({ type: "DINNER", payload: e.target.name });
                }}
                checked={state.serviceType.dinner}
                name="dinner"
                type="checkbox"
              />
              <label>Dinner</label>
            </div>
          </div>
          <Uploader className="uploader" />
          <button className="submit-btn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;

//  updatedState.filter((meal) => {
//    const newId = firebase.database().ref("meals").child(meal.id);

//    if (newId) {
//      newId.update(newState);
//    } else {
//      console.log("id doesnt click");
//    }
//  });
