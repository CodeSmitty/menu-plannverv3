import React from "react";

const vegLogo = require("../../assets/vegetarianIcon.png");
const glutenLogo = require("../../assets/glutenFree.png");
const dairyFree = require("../../assets/dairyfree.png");

const DisplayMealService = ({ mealData}) => {
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

  const entreItems = arrReducer(mealData.entre);

  const sideOneItems = arrReducer(mealData.sideOne);
  const sideTwoItems = arrReducer(mealData.sideTwo);

  
  return (
    <div className="displayMealService-wrapper" key={mealData[0]}>
      <img className="img-prev" src={mealData.image} alt='img' />
      <p className="entre-text">{mealData.entre.value}</p>
      {entreItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideOne-text">{mealData.sideOne.value}</p>
      {sideOneItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideTwo-text">{mealData.sideTwo.value}</p>
      {sideTwoItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="description-text">
        {mealData.description.value}
      </p>
    </div>
  );
};

export default DisplayMealService;
