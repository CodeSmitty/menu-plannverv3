import React, { useState } from "react";
import ServiceForm from "../containers/serviceForm/serviceForm";
import Preview from "../containers/preview/preview";
import moment from "moment";
import firebase from "../utility/firebase.utility"
import {useStore} from "../utility/reducers"
import "./Planner.scss";

const Planner = () => {
  const [state, dispatch] = useStore();
  const [date, setDate] = useState(moment(new Date()));
  const [placeholderData, setPlaceholderData] = useState()
  
  const serviceType = Object.keys(state.serviceType).filter(k => state.serviceType[k])


  const prevDay = (data) => {
    setDate(moment(date).subtract(1, "days"));
    handleDateChangeData()
  };

  const nextDay = () => {
    setDate(moment(date).add(1, "days"));
    handleDateChangeData()
  };

  function handleDateChangeData(e){
    console.log('hola')
    // const db = ()=>firebase.database()
    //   db()
    //     .ref("meals/")
    //     .on("value", (snapshot) => {
    //       const snapValue = snapshot.val();
    //       console.log(snapValue)
    //       const lunchOrDinnerValues = snapValue
    //         ? Object.values(snapValue)
    //             .filter((x) => {
    //               return x ? x.date === date.format("MMM Do YY") && (x.serviceType[0] === "lunch" ) : null;
    //             })
    //             .map((x) => x.date)
    //         : null;
    //         console.log(lunchOrDinnerValues)
    //       if (
    //         lunchOrDinnerValues ? lunchOrDinnerValues[0] === date.format("MMM Do YY") : null
    //       ) {
    //         console.log(date)
    //         const serviceData = snapValue
    //           ? Object.values(snapValue).find((x) => {
    //               return (
    //                 x.date === date.format("MMM Do YY") &&( x.serviceType[0] ===  "lunch")
    //               );
    //             })
    //           : null;
    //             console.log(serviceData)
    //         setPlaceholderData({ serviceData });
    //       }
    //     });
  }

  

  return (
    <div className="planner-container">
      <div className="titles-wrapper">
        <div class="date-arrow">
          <p className="planner-title">Meal Items</p>
          <button onClick={(data)=>prevDay(data)}>&#xab;</button>
          <p>{date.format("MMM Do YY")}</p>
          <button onClick={nextDay}>&#xbb;</button>
        </div>
      </div>
      <div className="form-preview-container">
        <div className="serviceform-container">
          <ServiceForm placeholderData={placeholderData} dates={date.format("MMM Do YY")} />
        </div>
        <Preview className="preview-planner" dates={date.format("MMM Do YY")} />
      </div>
    </div>
  );
};

export default Planner;
