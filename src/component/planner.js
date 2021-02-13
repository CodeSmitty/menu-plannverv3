import React, { useState } from "react";
import ServiceForm from "../containers/serviceForm/serviceForm";
import Preview from "../containers/preview/preview";
import moment from "moment";
import "./Planner.scss";
import Calendar from 'react-calendar'
import Home from '../containers/home/home';

// import "react-calendar/dist/Calendar.css";

const Planner = () => {
  const [date, setDate] = useState(moment());

  const onSelect = (e) =>{
    console.log(moment(e))
    setDate(moment(e))
  }
  

  const prevDay = () => {
    setDate(moment(date).subtract(1, "days"));
  };

  const nextDay = () => {
    setDate(moment(date).add(1, "days"));
  };

  return (
    <div className="planner-container">
      <div className="calendar-wrapper">
        <div className="calendar-col">
          <div className="calendar-container">
            <Calendar
              onClickDay={(e) => onSelect(e)}
              onSelect={date}
              date={date}
              className="react-calendar"
            />
          </div>
        </div>
      </div>

      <div className="serviceform-dates-wrapper">
        <div className="titles-wrapper">
          <div className="form-preview-container">
            <div className="serviceform-container">
              <div className="arrow_and_form_wrapper">
                <div class="date-arrows">
                  <div class="date-arrows-wrapper">
                    <p className="planner-title">Create Your Meals:</p>
                    <button
                      className="date-btns"
                      onClick={(data) => prevDay(data)}
                    >
                      &#xab;
                    </button>
                    <p
                      style={{ borderBottom: "solid .8px rgb(180, 180, 180)" }}
                    >
                      {date.format("MMM Do YY")}
                    </p>
                    <button className="date-btns" onClick={nextDay}>
                      &#xbb;
                    </button>
                  </div>
                </div>
                <ServiceForm
                  dateId={date.format("MMM Do YY")}
                  dates={date.format("YYYY-MM-DD")}
                  weekId={date.format("YYYY-W")}
                  datesTree={date}
                  dateWeek={date}
                />
              </div>
              <div className="home-wrapper">
                {/* <Home /> */}
                <Preview date={date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
