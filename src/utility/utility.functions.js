// import React, { useEffect, useState, useContext } from "react";
// import firebase from "../utility/firebase.utility";
// import {storage} from './firebase.utility';
// import {Context} from './reducers';
import moment from "moment";
import FireApi from "./rest.classes";
//import useFetchedDataForm from "./customHooks/useFetchedData"
import { useStore } from "./reducers";

export const handleMomentDate = (key, formats) => {
  return moment(key).format(formats);
};

export const handleFormFetchedData = (date, fetchFuct) => {
  let newData;
  let currentWeekStart = moment(date).startOf("week");
  let currentWeekEnd = moment(date).endOf("week");
  const weekToDate = `week_0${moment(currentWeekStart).week()}`;
  const yearToDate = moment(currentWeekStart).format("YYYY");

  let data = FireApi.get(`mealService/${yearToDate}/${weekToDate}`).then(
    (data) => (newData = data)
  );

  return data;
};

export const handleDateFormats = (date) => {
  let currentWeekStart = moment(date).startOf("week");
  let currentWeekEnd = moment(date).endOf("week");
  const weekToDate = `week_0${moment(currentWeekStart).week()}`;
  const yearToDate = moment(currentWeekStart).format("YYYY");
  const currMoment = moment(date);

  return [currentWeekStart, currentWeekEnd, weekToDate, yearToDate, currMoment];
};

export const handleEditFromData = (date, state, data) => {
  


  let activeService = "";
  let activeDinnerService ="";
  if (data  ) {
    let localMealId = handleMomentDate(date, "YYYY-MM-DD");
    let lunchMeals = data
      ? Object.values(data).filter((ser) => {
          return localMealId === ser.mealId && ser.serviceType === "lunch";
        })
      : "";
    const doesItexist = lunchMeals[0] && lunchMeals[0]?.mealItems;
    

    activeService = {
      entre: doesItexist ? lunchMeals[0]?.mealItems[0]?.entre : null,
      sideOne: doesItexist ? lunchMeals[0]?.mealItems[1]?.sideOne : null,
      sideTwo: doesItexist ? lunchMeals[0]?.mealItems[2]?.sideTwo : null,
      description: doesItexist
        ? lunchMeals[0]?.mealItems[3]?.description
        : "",
    };
    let dinnerMeals = data
      ? Object.values(data).filter((ser) => {
          return localMealId === ser.mealId && ser.serviceType === "dinner";
        })
      : "";

    const doesDinnerExist = dinnerMeals[0] && dinnerMeals[0]?.mealItems;
    activeDinnerService = {
      entre: doesDinnerExist ? dinnerMeals[0]?.mealItems[0]?.entre : null,
      sideOne: doesDinnerExist ? dinnerMeals[0]?.mealItems[1]?.sideOne : null,
      sideTwo: doesDinnerExist ? dinnerMeals[0]?.mealItems[2]?.sideTwo : null,
      description: doesDinnerExist
        ? dinnerMeals[0]?.mealItems[3]?.description
        : null,
    };
    return [activeService, activeDinnerService];
  } 
};

export function handleValue(e, existedMeals, dispatch, state) {
 if (e.target.name === "lunch") {
   Object.keys(state).forEach((key) => {
     //console.log(state & state[key] ? state[key].value : 'no ')
     dispatch({
       type: "LUNCH",
       payload: e.target.name,
       loadedData: !existedMeals ? "" : existedMeals[0][key],
       servType: key,
     });
   });
 } else if (e.target.name === "dinner") {
   Object.keys(state).forEach((key) => {
     dispatch({
       type: "DINNER",
       payload: e.target.name,
       loadedData: !existedMeals ? "" : existedMeals[1][key],
       servType: key,
     });
   });
  
 }
}

export const handleIsValueOrObject = (obj) => {
  return Object.values(obj).filter((val) => {
    if (typeof val === "function") {
      return val.call();
    } else {
      return val;
    }
  });
};
