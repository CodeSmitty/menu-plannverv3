import React, { useState, useEffect } from "react";
import "./serviceform.scss";
import { useStore } from "../../utility/reducers";
import ImageSelector from "../ImageSelector/ImageSelector";
//import axios from "../../utility/axios.orders";
import { inputFormData } from "../../utility/inputElementsData";
import useSubmitForm from "../../utility/customHooks/useSubmitForm";
import {
  handleDateFormats,
  handleEditFromData,
  handleValue,
} from "../../utility/utility.functions";
import useFetchedDataForm from "../../utility/customHooks/useFetchedData";
import Inputs from "./inputs/inputs";

const ServiceForm = (props) => {
  const [state, dispatch] = useStore();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [
    currentWeekStart,
    currentWeekEnd,
    weekToDate,
    yearToDate,
    currMoment,
  ] = handleDateFormats(props.dates);

  const [dataPreview, setDataPreview] = useState();

  const [handleSubmit] = useSubmitForm(props, dispatch);
  const [
    fetchMealData,
    currentMeals,
    retrievedData,
    setRetrievedData,
    retrieveOnLoadData,
    retrievedDataForPreview,
    setRetrievedDataForPreview,
  ] = useFetchedDataForm(currentWeekStart, currentWeekEnd);

  const [lunch, setLunch] = useState(false);
  const [dateChange, setDateChange] = useState();

  function findInputElements(dataInput) {
    let elArr = [];

    Object.keys(dataInput).forEach((el) => {
      elArr.push({ id: el, inputForm: dataInput[el] });
    });
    return elArr;
  }

  useEffect(
    (e) => {
      fetchMealData(yearToDate, weekToDate);
      const fetchedData = retrieveOnLoadData(yearToDate, weekToDate);
      setDataPreview(fetchedData);
      setDateChange(props.dates);
    },
    [props.dates, state]
  );

  // if(props.dateChanged === true){
  //   console.log(props.dateChanged)

  // }

  function handleCheckboxChange(e, data) {
    

    return dispatch({
      type: data?.id?.toUpperCase(),
      payload: e,
      servType: data.id,
    });
    
    

   
  }

  function handleLunchDinnerCheckbox(e){
    const existedMeals = handleEditFromData(
      props.dates,
      state,
      dataPreview,
      dispatch
    );

    console.log(existedMeals)
    handleValue(e, existedMeals, dispatch, state);
  }

  const handleInputTextChange = (e, data, fetchedData) => {
    dispatch({
      type: data.id.toUpperCase() + "_TEXT",
      payload: e.target.value,
      servType: data.id,
    });
  };
  //retrievedData ? existedMeals? existedMeals[x.id] :state[x.id].value: state[x.id].value
  let findInputs = findInputElements(inputFormData);
  let mapInputs = findInputs.map((x, i) => {
    return (
      <div key={`entre${i}`} className="form-container">
        <div className="entre-form">
          <Inputs
            elementConfig={x.inputForm.elementConfig}
            value={state[x.id].value}
            name={"entre.value"}
            elType={x.inputForm.elementType}
            changed={(event) => handleInputTextChange(event, x)}
            className="input-text"
          />
        </div>

        <div key={`diets${i}`} className="diets-checkbox">
          <Inputs
            elType={x.inputForm.checkbox?.veg?.elementType}
            elementConfig={x.inputForm.checkbox?.veg?.elementConfig}
            changed={(event) => handleCheckboxChange(event.target.name, x)}
            checked={state[x.id].veg}
          />
          <label>veg</label>
          <Inputs
            elType={x.inputForm.checkbox?.gluten?.elementType}
            elementConfig={x.inputForm.checkbox?.gluten?.elementConfig}
            changed={(event) => handleCheckboxChange(event.target.name, x)}
            checked={state[x.id].glut}
          />
          <label>gluten</label>
          <Inputs
            elType={x.inputForm.checkbox?.dairy?.elementType}
            elementConfig={x.inputForm.checkbox?.dairy?.elementConfig}
            checked={state[x.id].dairy}
            changed={(event) => handleCheckboxChange(event.target.name, x)}
          />
          <label>dairy</label>
        </div>
      </div>
    );
  });

  function handleChange(e) {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validationType = ["image/gif", "image/jpeg", "image/png"];

      if (validationType.includes(fileType)) {
        setError("");
        setImage(file);
      }
    }
  }

  return (
    <div className="container-box">
      <form onSubmit={(e) => handleSubmit(e, image)} className="form" action="">
        <div class="serviceType-checkboxes">
          <input
            className="svc-type"
            onChange={(e) => {
              handleLunchDinnerCheckbox(e);
            }}
            checked={state?.serviceType?.lunch}
            name="lunch"
            type="checkbox"
          />
          <label>Lunch</label>
          <input
            className="svc-type"
            onChange={(e) => handleLunchDinnerCheckbox(e)}
            checked={state?.serviceType?.dinner}
            name="dinner"
            type="checkbox"
          />
          <label>Dinner</label>
        </div>
        {mapInputs}
        <div className="btn-uploader-wrapper">
          <ImageSelector
            error={error}
            handleChange={handleChange}
            className="uploader"
          />
          <button
            className="submit-btn"
            onClick={(e) => {
              state?.serviceType?.dinner || state?.serviceType?.lunch === true
                ? handleSubmit(e, image)
                : alert("Please Select a Service Type");
            }}
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
