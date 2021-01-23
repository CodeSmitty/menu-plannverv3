import React, { useState, useEffect } from "react";
import firebase from "../../utility/firebase.utility";
import "./home.scss";
import moment from "moment";
import Preview from "../preview/preview";
import DisplayMealService from "../DisplayMealService/displayMealService";

const Home = (props) => {
  const db = () => firebase.database();
  const [buttonOnData, setButtonOnData] = useState(true);
  const [hidePrevButton, setHidePrevButton] = useState(true);
  const startOfWeek = moment().startOf("week");

  const [currWeek, setCurrWeek] = useState(startOfWeek);
  const endOfWeek = moment(currWeek).add(6, "days");
  const endOfNextWeek = moment(endOfWeek).add(6, "days");
  const [lunchValues, setLunchValues] = useState();

  const prevWeek = () => {
    setCurrWeek(moment(currWeek).subtract(1, "week"));
  };

  const nextWeek = () => {
    setCurrWeek(moment(currWeek).add(1, "week"));
  };

  const doesNextWeekExist = () => {
    db()
      .ref("meals")
      .orderByChild("date")
      .startAt(endOfWeek.format("MMM Do YY"))
      .endAt(endOfNextWeek.format("MMM Do YY"))
      .once("value", (snapshot) => {
        if (currWeek < startOfWeek) {
          setButtonOnData(true);
          setHidePrevButton(false)
        } else if (!snapshot.val()) {
          setButtonOnData(false);
        } else {
          setButtonOnData(true);
          setHidePrevButton(true)
        }
      });
  };

  function getCurrentWeek() {
    let days = [];
    let day = currWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, "days");
    }

    return days;
  }

  let currDays = getCurrentWeek();

  useEffect(() => {
    doesNextWeekExist();
    db()
      .ref("meals")
      .orderByChild("date")
      .startAt(currWeek.format("MMM Do YY"))
      .endAt(endOfWeek.format("MMM Do YY"))
      .on("value", (snapshot) => {
        const snapValue = snapshot.val();
        let mealArr = [];
        let getMealsByDate = currDays.filter((day) => {
          let dayOfWeek = moment(day).format("dddd").toLowerCase();
          let mealss = snapValue
            ? Object?.values(snapValue)?.filter((ser) => {
                const datesForTheWeek = moment(day).format("MMM Do YY");
                return ser.date === datesForTheWeek;
              })
            : null;

          let mealsByDayOfTheWeek = {
            [dayOfWeek]: mealss,
          };
          mealArr.push(mealsByDayOfTheWeek);

          return day;
        });

        const mealsOfTheDay = mealArr
          ? mealArr.map((meal, i) => {
              let obj;
              let meals;
              let daysByName;
              for (let key in meal) {
                // if(meal[key] === null){
                //   setButtonOnData(false)
                // }else{
                //   setButtonOnData(true)
                // }

                let lunchMeals =
                  meal && meal[key]
                    ? Object.values(meal[key]).filter(
                        (lun) => lun?.serviceType[0] === "lunch"
                      )
                    : null;
                let dinnerMeals =
                  meal && meal[key]
                    ? Object.values(meal[key]).filter(
                        (din) => din?.serviceType[0] === "dinner"
                      )
                    : null;

                daysByName = key;
                if (meal) {
                  obj = {
                    [key]: {
                      lunch: lunchMeals ? lunchMeals[0] : null,
                      dinner: dinnerMeals ? dinnerMeals[0] : null,
                    },
                  };
                } else {
                  obj = null;
                }

                meals = obj ? (
                  <div className="meal-wrapper">
                    <p className="dayNames">{daysByName}</p>
                    
                    <div className='lunch-dinner-container'>
                      {obj[key]?.lunch?.service ? (
                        <div className={"lunch-container-home"}>
                          <DisplayMealService
                            serviceType={obj[key]?.lunch?.serviceType[0]}
                            className="displayMealService-wrapper"
                            mealData={obj[key]?.lunch?.service}
                            imgs={obj[key]?.lunch?.image}
                          />
                        </div>
                      ) : (
                        <div className="noservice-block"> no service</div>
                      )}
  
                      {obj[key]?.dinner?.service ? (
                        <div className={"dinner-container-home"}>
                          <DisplayMealService
                            serviceType={obj[key]?.dinner?.serviceType[0]}
                            className="displayMealService-wrapper"
                            mealData={obj[key]?.dinner?.service}
                            imgs={obj[key]?.dinner?.image}
                          />
                        </div>
                      ) : (
                        <div className="noservice-block">no service</div>
                      )}
                    </div>

                  </div>
                ) : null;
              }

              return meals;
            })
          : null;

        setLunchValues(mealsOfTheDay);
      });
  }, [currWeek]);

  
  return (
    <div className="home-section">
      <button className={hidePrevButton ? 'next-week': 'hide-next-week'} onClick={prevWeek}>previous week</button>
      <button
        className={buttonOnData === true ? "next-week" : "hide-next-week"}
        onClick={nextWeek}
      >
        next Week
      </button>
      <div className="service-container">{lunchValues}</div>
    </div>
  );
};

export default Home;
