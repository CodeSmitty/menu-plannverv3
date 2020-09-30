import React from "react";

const vegLogo = require("../../assets/vegetarianIcon.png");
const glutenLogo = require("../../assets/glutenFree.png");
const dairyFree = require("../../assets/dairyfree.png");

const DisplayMealService = ({ mealService }, props) => {
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

  const entreItems = arrReducer(mealService.entre);

  const sideOneItems = arrReducer(mealService.sideOne);
  const sideTwoItems = arrReducer(mealService.sideTwo);

  return (
    <div className="displayMealService-wrapper" key={props.keyProp}>
      <img className="img-prev" src={mealService.image} />
      <p className="entre-text">{mealService.entre.value}</p>
      {entreItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideOne-text">{mealService.sideOne.value}</p>
      {sideOneItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideTwo-text">{mealService.sideTwo.value}</p>
      {sideTwoItems.map((e, i) => (
        <img key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="description-text">{mealService.description.value}</p>
    </div>
  );
};

export default DisplayMealService;
