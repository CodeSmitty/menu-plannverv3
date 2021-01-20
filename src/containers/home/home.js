import React, { useState, useEffect } from "react";
import firebase from "../../utility/firebase.utility";
import "./home.scss";
import moment from "moment";
import Preview from "../preview/preview";
import DisplayMealService from "../DisplayMealService/displayMealService";

const Home = (props) => {
  const db = () => firebase.database();
  const [database, setDatabase] = useState();
  const startOfWeek = moment().startOf("week");
  const endWeek = moment().endOf("week");

  const [currWeek, setCurrWeek] = useState(startOfWeek);
  const endOfWeek = moment(currWeek).add(6, "days");

  const [lunchValues, setLunchValues] = useState();
  const [dinnerValue, setDinnerValues] = useState();

  const [weeklyValue, setWeeklyvalues] = useState();
  const [dayNames, setDayName] = useState([]);

  const prevWeek = () => {
    setCurrWeek(moment(currWeek).subtract(1, "week"));
  };

  const nextWeek = () => {
    setCurrWeek(moment(currWeek).add(1, "week"));
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
          return day
        });
        
        const mealsOfTheDay = mealArr
          ? mealArr.map((meal, i) => {
              let days = getMealsByDate.map(x =>x)
              console.log(moment(days).format('dddd MMM Do'))
              let obj;
              let lunch;
              let dinner;
              for (let key in meal) {
                if (meal) {
                  obj = {
                    [key]: {
                      lunch: meal && meal[key] ? meal[key][0] : null,
                      dinner: meal && meal[key] ? meal[key][1] : null,
                    },
                  };
                } else {
                  obj = null;
                }

                 
                lunch = obj ? (
                  <div>
                    <div className={"lunch-container-home"}>
                      {obj[key]?.lunch?.service ? (
                        <DisplayMealService
                          mealData={obj[key]?.lunch?.service}
                          imgs={obj[key]?.lunch?.image}
                        />
                      ) : (
                        <p>no service</p>
                      )}
                    </div>
                    <div className={"lunch-container-home"}>
                      {obj[key]?.dinner?.service ? (
                        <DisplayMealService
                          mealData={obj[key]?.dinner?.service}
                          imgs={obj[key]?.dinner?.image}
                        />
                      ) : (
                        <p>no service</p>
                      )}
                    </div>
                  </div>
                ) : null;
              }

              return lunch;
            })
          : null;

        setLunchValues(mealsOfTheDay);
        setLunchValues(mealsOfTheDay);

        // setWeeklyvalues(weeklyMeals)
      });
  }, [currWeek]);
  useEffect(() => {}, [database, currWeek, lunchValues, weeklyValue]);

  return (
    <div className="home-section">
      <button onClick={prevWeek}>previous week</button>
      <button onClick={nextWeek}>next Week</button>
      <div className="service-container">{lunchValues}</div>
    </div>
  );
};

export default Home;
