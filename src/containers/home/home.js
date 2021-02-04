import React, { useState, useEffect } from "react";
import firebase from "../../utility/firebase.utility";
import "./home.scss";
import moment from "moment";
import DisplayMealService from "../DisplayMealService/displayMealService";

const Home = () => {
  const db = () => firebase.database();
  const [buttonOnData, setButtonOnData] = useState(true);
  const [hidePrevButton, setHidePrevButton] = useState(true);
  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState({
    currentWeekstart: moment().startOf("week"),
    currentWeekEnd: moment().endOf("week"),
  });
  const [lunchValues, setLunchValues] = useState();

  const { currentWeekstart, currentWeekEnd } = startOfCurrentWeek;

  console.log(moment().format("WWYY"))

  const prevWeek = () => {
    const prevStart = currentWeekstart;
    const prevEnd = currentWeekEnd;
    const newWeekStart = moment(prevStart).subtract(7, "days");
    const newWeekEnd = moment(prevEnd).subtract(7, "days");
    console.log(prevStart)
    setStartOfCurrentWeek({
      currentWeekstart: newWeekStart,
      currentWeekEnd: newWeekEnd,
    });
  };

  const nextWeek = () => {
    const newStart = currentWeekstart;
    const newEnd = currentWeekEnd;
    const newWeekStart = moment(newStart).add(1, "week");
    const newWeekEnd = moment(newEnd).add(1, "week");

    setStartOfCurrentWeek({
      currentWeekstart: newWeekStart,
      currentWeekEnd: newWeekEnd,
    });
  };

  //  const doesNextWeekExist = (data) => {
  //    const nextWeekStart = moment(currentWeekstart).add(7, 'days')
  //    const nextWeekEnd = moment(currentWeekEnd).add(7, 'days');
  //    db()
  //      .ref("meals")
  //      .orderByChild("date")
  //      .startAt(nextWeekStart.format("YYYY-MM-DD"))
  //      .endAt(nextWeekEnd.format("YYYY-MM-DD"))
  //      .once("value", (snapshot) => {
  //       console.log(nextWeekStart.format("MMM Do"))
  //         if(snapshot.val()){
  //           setHidePrevButton(false)
  //           setButtonOnData(false)
  //         }
  //      });
  //  };

  function getCurrentDaysOfWeek() {
    let days = [];
    let day = currentWeekstart;
    while (day <= currentWeekEnd) {
      days.push(day.toDate());
      day = day.clone().add(1, "days");
    }
    return days;
  }

  let currDays = getCurrentDaysOfWeek();

  const start = currDays[0];
  const end = currDays[6];

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    //format("YYYY MM DD")
   
    db()
      .ref("meals")
      .orderByChild("date")
      .startAt(currentWeekstart.format("YYYY-MM-DD"))
      .endAt(currentWeekEnd.format("YYYY-MM-DD"))
      .once("value", async (snapshot) => {
        const snapValue = await snapshot.val();
        let mealArr = [];
        let getMealsByDate = currDays.filter((day) => {
          let dayOfWeek = moment(day).format("YYYY-MM-DD");
          let mealss = snapValue
            ? Object?.values(snapValue)?.filter((ser) => {
                const datesForTheWeek = moment(day).format("YYYY-MM-DD");
                return ser.date === dayOfWeek;
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
              let dayNames;
              for (let key in meal) {
                let dayNames = moment(key).format("dddd").toLowerCase();
                let datesOfWeek = moment(key).format("dddd");

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

                dayNames = key;

                if (meal) {
                  obj = {
                    [dayNames]: {
                      lunch: lunchMeals ? lunchMeals[0] : null,
                      dinner: dinnerMeals ? dinnerMeals[0] : null,
                    },
                  };
                } else {
                  obj = null;
                }

                meals = obj ? (
                  <div className="meal-wrapper">
                    <p className="dayNames">{` ${moment(dayNames).format(
                      "dddd"
                    )} `}</p>

                    <div className="lunch-dinner-container">
                      {obj[dayNames]?.lunch?.service ? (
                        <div className={"lunch-container-home"}>
                          <DisplayMealService
                            key={`lunch${i}`}
                            serviceType={obj[dayNames]?.lunch?.serviceType[0]}
                            className="displayMealService-wrapper"
                            mealData={obj[dayNames]?.lunch?.service}
                            imgs={obj[dayNames]?.lunch?.image}
                          />
                        </div>
                      ) : (
                        <div className="noservice-block"> no service</div>
                      )}

                      {obj[dayNames]?.dinner?.service ? (
                        <div className={"dinner-container-home"}>
                          <DisplayMealService
                            key={`dinner${i}`}
                            serviceType={obj[dayNames]?.dinner?.serviceType[0]}
                            className="displayMealService-wrapper"
                            mealData={obj[dayNames]?.dinner?.service}
                            imgs={obj[dayNames]?.dinner?.image}
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
  }, [startOfCurrentWeek]);

  return (
    <div className="home-section">
      <div className="weekly-btns">
        <button
          className={hidePrevButton === true ? "prev-week" : "hide-next-week"}
          onClick={prevWeek}
        >
          <a href="#">Previous</a>
        </button>
        <div className="dates-and-titles">
          {`${currentWeekstart.format("MMM Do YY")} - ${currentWeekEnd.format(
            "MMM Do YY"
          )}`}
        </div>
        <button
          className={buttonOnData === true ? "next-week" : "hide-next-week"}
          onClick={nextWeek}
        >
          <a href="#">Next</a>
        </button>
      </div>
      <div className="service-container">{lunchValues}</div>
    </div>
  );
};

export default Home;
