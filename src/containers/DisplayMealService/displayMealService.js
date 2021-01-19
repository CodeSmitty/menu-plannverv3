import React from "react";

const vegLogo = require("../../assets/vegetarianIcon.png");
const glutenLogo = require("../../assets/glutenFree.png");
const dairyFree = require("../../assets/dairyfree.png");

const DisplayMealService = (props) => {
  const imageMap = {
    veg: vegLogo,
    glut: glutenLogo,
    dairy: dairyFree,
  };



  const arrReducer = (obj) =>
    Object.entries(obj).reduce((accumulator, [k, v]) => {
      if (k !== "value" && v) {
        accumulator.push(k);
      }
      return accumulator;
    }, []);

  const entreItems = arrReducer(props.mealData.entre);

  const sideOneItems = arrReducer(props.mealData.sideOne);
  const sideTwoItems = arrReducer(props.mealData.sideTwo);
  
  return (
    <div className="displayMealService-wrapper" key={props.mealData[0]}>
      <img className="img-prev" src={props.imgs} alt='img' />
      <p className="entre-text">{props.mealData.entre.value}</p>
      {entreItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideOne-text">{props.mealData.sideOne.value}</p>
      {sideOneItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideTwo-text">{props.mealData.sideTwo.value}</p>
      {sideTwoItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="description-text">
        {props.mealData.description.value}
      </p>
    </div>
  );
};

export default DisplayMealService;
