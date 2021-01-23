import React from "react";
import './displayMealService.styles.scss'

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
   obj? Object.entries(obj).reduce((accumulator, [k, v]) => {
      
      if (k !== "value" && v) {
        
        accumulator.push(k);
      }
      return accumulator;
    }, []):null;

  const entreItems = arrReducer(props.mealData ?props.mealData?.entre:null);

  const sideOneItems = arrReducer(props.mealData ? props.mealData?.sideOne:null);
  const sideTwoItems = arrReducer(props.mealData ?props.mealData?.sideTwo:null);
  
  return (
    <div className={props.className}>
      <div className="img-wrapper">
        <img
          className={props.imgs ? "img-prev" : "img-hid"}
          src={props.imgs}
          alt="img"
        />
      </div>
      <p className='serviceType'>{props.serviceType}</p>
      <p className="entre-text home-entre-text">{props?.mealData?.entre?.value}</p>
      {entreItems?.map((e, i) => (
        <img className="diets-imgs" key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideOne-text home-sideOne-text">{props?.mealData?.sideOne?.value}</p>
      {sideOneItems?.map((e, i) => (
        <img className='diets-imgs' key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="sideTwo-text home-sideTwo-text">{props?.mealData?.sideTwo?.value}</p>
      {sideTwoItems?.map((e, i) => (
        <img className="diets-imgs" key={i} src={imageMap[e]} alt="e" />
      ))}
      <p className="description-text home-description-text">{props?.mealData?.description?.value}</p>
    </div>
  );
};

export default DisplayMealService;
