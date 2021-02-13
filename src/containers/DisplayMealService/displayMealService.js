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

  let imageUrl = props.imgs;
  const style = {
    background: `url(${imageUrl})`,
    backgroundSize:'cover',
    position:'relative',
    backgroundPosition:'center'
  };



//console.log(props.mealData ?props.mealData[0]?.diets[1].glut : null)
 
  
const entre = {
  value: props.mealData && props.mealData[0] ? props.mealData[0].entre : null,
  glut:
    props.mealData && props.mealData[0]
      ? props.mealData[0].diets[1].glut
      : null,
  veg:
    props.mealData && props.mealData[0] ? props.mealData[0].diets[0].veg : null,
  dairy:
    props.mealData && props.mealData[0]
      ? props.mealData[0].diets[2].dairy
      : null,
};
  

const sideOne = {
  value: props.mealData && props.mealData[1] ? props.mealData[1].sideOne : null,
  glut:
    props.mealData && props.mealData[1]
      ? props.mealData[1].diets[1].glut
      : null,
  veg:
    props.mealData && props.mealData[1] ? props.mealData[1].diets[0].veg : null,
  dairy:
    props.mealData && props.mealData[1]
      ? props.mealData[1].diets[2].dairy
      : null,
};

const sideTwo = {
  value: props.mealData && props.mealData[2] ? props.mealData[2].sideTwo : null,
  glut:
    props.mealData && props.mealData[2]
      ? props.mealData[2].diets[1].glut
      : null,
  veg:
    props.mealData && props.mealData[2] ? props.mealData[2].diets[0].veg : null,
  dairy:
    props.mealData && props.mealData[2]
      ? props.mealData[2].diets[2].dairy
      : null,
};

  const arrReducer = (obj) =>
   obj? Object.entries(obj).reduce((accumulator, [k, v]) => {
      
      if (k !== "value" && v) {
      
        accumulator.push(k);
      }
      return accumulator;
    }, []):null;

  const entreItems = arrReducer(
    entre
  );


 
  const sideOneItems = arrReducer(sideOne);
  const sideTwoItems = arrReducer(sideTwo);

  return (
    <div className={props.className} >
    
    
      
      <div className="meal-details-wrapper">
        <div className='entre-container'>
          
          <p className="entre-text home-entre-text">{props.mealData ?props?.mealData[0]?.entre :null}</p>
          <div className="diets-imgs-container">
            {entreItems?.map((e, i) =>{
              return (
             
                <img className="diets-imgs" key={i} src={imageMap[e]} alt="e" />
              
            )})}
          </div>
        </div>
        <div className='sideOne-container'>
          <p className="sideOne-text home-sideOne-text">{props.mealData ?props?.mealData[1]?.sideOne:null}</p>
          <div className="diets-imgs-container">
            {sideOneItems?.map((e, i) => (
              
                <img className='diets-imgs' key={i} src={imageMap[e]} alt="e" />
             
            ))}
          </div>
        </div>
        <div className="sideTwo-container">
          <p className="sideTwo-text home-sideTwo-text">{props.mealData ? props?.mealData[2]?.sideTwo:null}</p>
          <div className='diest-imgs-container'>
            {sideTwoItems?.map((e, i) => (
              <img className="diets-imgs" key={i} src={imageMap[e]} alt="e" />
            ))}
          </div>
        </div>
        <div className='description-container'>
          <p className="description-text home-description-text">{props.mealData ? props?.mealData[3]?.description :null}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayMealService;
