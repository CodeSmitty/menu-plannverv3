import React, { useState, useEffect } from "react";
import firebase from "../../utility/firebase.utility";
import "./home.scss";
import moment from "moment";
import DisplayMealService from "../DisplayMealService/displayMealService";
import useFetchedDataForm from '../../utility/customHooks/useFetchedData';


const Home = () => {
  const db = () => firebase.database();
  const [buttonOnData, setButtonOnData] = useState(true);
  const [hidePrevButton, setHidePrevButton] = useState(true);
  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState({
    currentWeekstart: moment().startOf("week"),
    currentWeekEnd: moment().endOf("week"),
  });
  

  const { currentWeekstart, currentWeekEnd } = startOfCurrentWeek;

  const weekToDate = `week_0${moment(currentWeekstart).week()}`;
   const yearToDate = moment(currentWeekstart).format("YYYY");
  
  const [fetchMealData, currentMeals] = useFetchedDataForm(currentWeekstart, currentWeekEnd)

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

 



  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    //format("YYYY MM DD")
  fetchMealData(yearToDate, weekToDate);
   


    
  }, [startOfCurrentWeek]);

  return (
    <div className="home-section">
        {/* <button
          className={hidePrevButton === true ? "prev-week" : "hide-next-week"}
          onClick={prevWeek}
        >
          <a href="#">Previous</a>
        </button> */}
        <div className="dates-and-titles">
          {`${currentWeekstart.format("MMM Do YY")} - ${currentWeekEnd.format(
            "MMM Do YY"
          )}`}
        </div>
        {/* <button
          className={buttonOnData === true ? "next-week" : "hide-next-week"}
          onClick={nextWeek}
        >
          <a href="#">Next</a>
        </button> */}
      
      <div className="service-container">{currentMeals}</div>
    </div>
  );
};

export default Home;
