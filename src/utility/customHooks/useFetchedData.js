import React, { useState } from "react";
import firebase from "../firebase.utility";
import moment from "moment";
import { handleMomentDate } from "../utility.functions";
import DisplayMealService from "../../containers/DisplayMealService/displayMealService";

const useFetchedDataForm = (currentWeekstart, currentWeekEnd) => {
  const db = () => firebase.database();
  const [currentMeals, setCurrentMeals] = useState();
  const [retrievedData, setRetrievedData] = useState()
  const [retrivedDataForPreview, setRetrievedDataForPreview] = useState()
  const getCurrentDaysOfWeek = () => {
    let days = [];
    let day = currentWeekstart;
    while (day <= currentWeekEnd) {
      days.push(day.toDate());
      day = day.clone().add(1, "days");
    }
    return days;
  };

  const retrieveOnLoadData = (yearToDate, weekToDate) =>{
    let data;
   db()
      .ref(`mealService/${yearToDate}/${weekToDate}`)
      .once("value", (snap) =>{
        data = snap.val()
        setRetrievedData(snap?.val())
      })
      return data;
  }


  const fetchMealData = (yearToDate, weekToDate) => {
    return db()
      .ref(`mealService/${yearToDate}/${weekToDate}`)
      .on("value", (snap) => {
        const fetchedMeals = snap?.val();
        let daysOfWeek = getCurrentDaysOfWeek();

        setRetrievedDataForPreview(fetchedMeals)
        const mealsArr = [];
        daysOfWeek.filter((day) => {
          const dayOfWeek = handleMomentDate(day, "YYYY-MM-DD");
          const meals = fetchedMeals
            ? Object.values(fetchedMeals).filter(
                (ser) => {
                  return  ser.mealId === dayOfWeek}
              )
            : null;
          const mealsByDayOfTheWeek = {
            [dayOfWeek]: meals,
          };
          mealsArr.push(mealsByDayOfTheWeek);
        });

       
        const mealsOfTheDay = mealsArr
          ? mealsArr.map((meal, i) => {
              let serviceMealsByDays;
              let meals;
              Object.keys(meal).forEach((key) => {
              
                const dayName = handleMomentDate(
                  key,
                  "ddd"
                ).toLocaleLowerCase();
                const lunch =
                  meal && meal[key]
                    ? Object?.values(meal[key]).filter(
                        (lun) => lun?.serviceType === "lunch"
                      )
                    : null;
                const dinner =
                  meal && meal[key]
                    ? Object?.values(meal[key]).filter(
                        (din) => din?.serviceType === "dinner"
                      )
                    : null;

                if (meal) {
                  serviceMealsByDays = {
                    [dayName]: {
                      lunch: lunch ? lunch[0] : null,
                      dinner: dinner ? dinner[0] : null,
                    },
                  };

                  const lunchStyle = {
                    background: `url(${serviceMealsByDays[dayName]?.lunch?.image}) center center / cover no-repeat`,
                    backgroundSize:"cover",
                    minHeight: "300px",
                    maxHeight: "300px",
                    imageRendering: "-webkit-optimize-contrast",
                  };
                  const dinnerStyle = {
                    background: `url(${serviceMealsByDays[dayName]?.dinner?.image}) center center / cover no-repeat`,
                    
                    backgroundSize: "cover",
                    minHeight: "300px",
                    maxHeight: "300px",
                    imageRendering: "-webkit-optimize-contrast",
                  };

                  meals =
                    serviceMealsByDays[dayName]?.lunch?.mealItems ||
                    serviceMealsByDays[dayName]?.dinner?.mealItems ? (
                      <div key={i} className="service-wrapper">
                        {serviceMealsByDays[dayName]?.lunch?.mealItems ? (
                          <div className="meal-wrapper">
                            <div
                              style={lunchStyle}
                              className="lunch-container-home"
                            >
                              <div  className="serviceType-wrapper">
                                <div
                                  className="serviceType"
                                  
                                >
                                  <p className='dayName'>{dayName}</p>
                                </div>
                              </div>
                              <DisplayMealService
                                className="displayMealService-wrapper"
                                serviceType={
                                  serviceMealsByDays[dayName]?.lunch
                                    ?.serviceType
                                }
                                mealData={
                                  serviceMealsByDays[dayName]?.lunch?.mealItems
                                }
                                imgs={serviceMealsByDays[dayName]?.lunch?.image}
                              />
                            </div>
                          </div>
                        ) : null}
                        {serviceMealsByDays[dayName]?.dinner?.mealItems ? (
                          <div className="meal-wrapper">
                            <div
                              className="dinner-container-home"
                              style={dinnerStyle}
                            >
                              <div className="serviceType-wrapper">
                                <p
                                  className="serviceType"
                                  style={{ padding: "12px 2px" }}
                                >
                                  dinner
                                </p>
                              </div>
                              <DisplayMealService
                                className="displayMealService-wrapper"
                                serviceType={
                                  serviceMealsByDays[dayName]?.dinner
                                    ?.serviceType
                                }
                                mealData={
                                  serviceMealsByDays[dayName]?.dinner?.mealItems
                                }
                                imgs={
                                  serviceMealsByDays[dayName]?.dinner?.image
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null;
                } else if(!meal) {
                  serviceMealsByDays = {};
                }
              });
              return meals;
            })
          : null;

        setCurrentMeals(mealsOfTheDay);
      });
  };

  const returnedFunctions = {
    fetcheMealData: (yearToDate, weekToDate) => fetchMealData(yearToDate, weekToDate),
    currentMeals: currentMeals,
    retrievedData: [retrievedData, setRetrievedData],
    retrievedOnLoadData: retrieveOnLoadData,
    retrievedDataForPreview: [retrivedDataForPreview, setRetrievedDataForPreview],
  };
  return [fetchMealData, currentMeals, retrievedData, setRetrievedData,retrieveOnLoadData, retrivedDataForPreview, setRetrievedDataForPreview];
};

export default useFetchedDataForm;
