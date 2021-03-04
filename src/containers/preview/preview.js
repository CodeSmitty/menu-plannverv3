import React, { useEffect, useState } from "react";
import moment from "moment";
import "./preview.scss";
import {handleEditFromData }from "../../utility/utility.functions"
import useFetchedDataForm from "../../utility/customHooks/useFetchedData";
import {useStore} from '../../utility/reducers'

const Preview = (props) => {
  
  const [state, dispatch] = useStore();
  let currentWeekStart = moment(props.date).startOf("week");
  let currentWeekEnd = moment(props.date).endOf("week");

  const weekToDate = `week_0${moment(currentWeekStart).week()}`;
  const yearToDate = moment(currentWeekStart).format("YYYY");

  const [fetchMealData, currentMeals, retrievedData, setRetrievedData, retrievedOnLoadData, retrievedDataForPreview, setRetrievedDataForPreview ] = useFetchedDataForm(
    currentWeekStart,
    currentWeekEnd
  );

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    //format("YYYY MM DD")
    fetchMealData(yearToDate, weekToDate);
    //handleEditFromData(props.date,retrievedData,state)
  }, [props.date, state]);


  
  return (
    <div>
      {retrievedDataForPreview ? (
        <div className="preview-service-container">{currentMeals}</div>
      ) : (
        <div>no meals</div>
      )}
    </div>
  );
};

export default Preview;
