import React, { useState } from "react";
import firebase from "../firebase.utility";
import moment from "moment";
import { handleMomentDate } from "../utility.functions";
import DisplayMealService from "../../containers/DisplayMealService/displayMealService";

const useFetchedDataForm = (currentWeekstart, currentWeekEnd) => {
  const db = () => firebase.database();
  const [currentMeals, setCurrentMeals] = useState();
  const getCurrentDaysOfWeek = () => {
    let days = [];
    let day = currentWeekstart;
    while (day <= currentWeekEnd) {
      days.push(day.toDate());
      day = day.clone().add(1, "days");
    }
    return days;
  };

  const fetchMealData = (yearToDate, weekToDate) => {
    return db()
      .ref(`mealService/${yearToDate}/${weekToDate}`)
      .once("value", (snap) => {
        const fetchedMeals = snap?.val();
        let daysOfWeek = getCurrentDaysOfWeek();
        const mealsArr = [];

        daysOfWeek.filter((day) => {
          const dayOfWeek = handleMomentDate(day, "YYYY-MM-DD");
          const meals = fetchedMeals
            ? Object.values(fetchedMeals).filter(
                (ser) => ser.mealId === dayOfWeek
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
                  "dddd"
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
                    background: `url(${serviceMealsByDays[dayName]?.lunch?.image})`,
                    objectFit:'cover',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "300px",
                    maxHeight: "300px",
                    imageRendering: "-webkit-optimize-contrast",
                  };
                  const dinnerStyle = {
                    background: `url(${serviceMealsByDays[dayName]?.dinner?.image})`,
                    objectFit: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    minHeight: "300px",
                    maxHeight: "300px",
                  };

                  meals = (
                    <div key={i} className="meal-wrapper">
                      <p className="dayNames">{dayName}</p>
                      <div className="lunch-dinner-container">
                        {serviceMealsByDays[dayName]?.lunch?.mealItems ? (
                          <div
                            style={lunchStyle}
                            className="lunch-container-home"
                          >
                            <div className="serviceType-wrapper">
                              <p className="serviceType" style={{padding: "10px 2px"}}>lunch</p>
                            </div>
                            <DisplayMealService
                              className="displayMealService-wrapper"
                              serviceType={
                                serviceMealsByDays[dayName]?.lunch?.serviceType
                              }
                              mealData={
                                serviceMealsByDays[dayName]?.lunch?.mealItems
                              }
                              imgs={serviceMealsByDays[dayName]?.lunch?.image}
                            />
                          </div>
                        ) : (
                          <div className="noservice-block">no service</div>
                        )}
                        {serviceMealsByDays[dayName]?.dinner?.mealItems ? (
                          <div
                            className="dinner-container-home"
                            style={dinnerStyle}
                          >
                            <div className='serviceType-wrapper'>
        <p className='serviceType' style={{padding: "12px 2px"}}>dinner</p>
      </div>
                            <DisplayMealService
                              className="displayMealService-wrapper"
                              serviceType={
                                serviceMealsByDays[dayName]?.dinner?.serviceType
                              }
                              mealData={
                                serviceMealsByDays[dayName]?.dinner?.mealItems
                              }
                              imgs={serviceMealsByDays[dayName]?.dinner?.image}
                            />
                          </div>
                        ) : (
                          <div className="noservice-block">no service </div>
                        )}
                      </div>
                    </div>
                  );
                } else {
                  serviceMealsByDays = {};
                }
              });
              return meals;
            })
          : null;

        setCurrentMeals(mealsOfTheDay);
      });
  };

  return [fetchMealData, currentMeals];
};

export default useFetchedDataForm;
