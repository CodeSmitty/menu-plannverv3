import React, { useEffect, useState } from "react";
import moment from "moment";
import "./preview.scss";
import firebase from "../../utility/firebase.utility";
//import axios from "../../utility/axios.orders";
import DisplayMealService from "../DisplayMealService/displayMealService";
import useFetchedDataForm from "../../utility/customHooks/useFetchedData";

const Preview = (props) => {
  let currentWeekStart = moment(props.date).startOf("week");
  let currentWeekEnd = moment(props.date).endOf("week");

  const weekToDate = `week_0${moment(currentWeekStart).week()}`;
  const yearToDate = moment(currentWeekStart).format("YYYY");

  const [fetchMealData, currentMeals, retrievedData] = useFetchedDataForm(
    currentWeekStart,
    currentWeekEnd
  );

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    //format("YYYY MM DD")
    fetchMealData(yearToDate, weekToDate);
  }, [props.date]);

  return (
    <div>
      {retrievedData ? (
        <div className="preview-service-container">{currentMeals}</div>
      ) : (
        <div>no meals</div>
      )}
    </div>
  );
};

export default Preview;
