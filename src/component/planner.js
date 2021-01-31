import React, { useState } from "react";
import ServiceForm from "../containers/serviceForm/serviceForm";
import Preview from "../containers/preview/preview";
import moment from "moment";
import "./Planner.scss";
import Calendar from 'react-calendar'

const Planner = () => {
  const [date, setDate] = useState(moment());

  

  const prevDay = () => {
    setDate(moment(date).subtract(1, "days"));
  };

  const nextDay = () => {
    setDate(moment(date).add(1, "days"));
  };

  return (
    <div className="planner-container">
      <div className="titles-wrapper">
        <div class="date-arrow">
          <p className="planner-title">Meal Items</p>
          <button onClick={(data) => prevDay(data)}>&#xab;</button>
          <p>{date.format("MMM Do YY")}</p>
          <button onClick={nextDay}>&#xbb;</button>
        </div>
      </div>
      <div className="form-preview-container">
        <div className="serviceform-container">
          <ServiceForm
            dateId={date.format("MMM Do YY")}
            dates={date.format("YYYY-MM-DD")}
          />
        </div>
        <Preview className="preview-planner" dates={date.format("YYYY-MM-DD")} />
      </div>

      <div style={{margin:'300px  0'}}>
        <Calendar  />
      </div>
    </div>
  );
};

export default Planner;
