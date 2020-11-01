import React, { useEffect, useState } from "react";
//import { Context } from "../../utility/reducers";
import "./preview.scss";
import firebase from "../../utility/firebase.utility";
//import axios from "../../utility/axios.orders";
import DisplayMealService from "../DisplayMealService/displayMealService";
//import {useDatabase } from '../../utility/utility.functions';

const Preview = (props) => {
 

  const [database, setDatabase] = useState({
    lunch: null,
    dinner: null,
  });
  const db = () => firebase.database();





  useEffect(() => {
    db();
    // console.log("mounted");
  });

  useEffect(() => {     
    db()
      .ref("/meals")
      .on("value", (snapshot) => {
        const snapValue = snapshot.val();
        const filteredLunch = Object.values(snapValue).filter((x )=>{
          return x ? x.date === props.dates: null;
        });
        const filteredDinner = Object.values(snapValue).find((x) => {
          return x
            ? x.date === props.dates && x.serviceType[0] === "dinner"
            : null;
        });
        console.log(filteredLunch)
        console.log(filteredDinner)
        const dataArr = [];

        const dataBase = snapshot.val();
      
        
        for (let id in dataBase) {
          dataArr.push({ id, ...dataBase[id] });
        }

        setDatabase({filteredLunch});
      });
  }, [props.dates]);

  useEffect(() => {
    console.log(database)
  }, [database, props.dates]);

    // const test = Object.values(database)
    //   .filter((x) => {
  
    //     return x ? x.date === props.dates : null;
    //   })
    //   .map((x, i) => {
    //    console.log(x)
    //     if (x.serviceType[0] === 'lunch') {
    //       console.log(x)
    //       return (
    //         <div className="lunch-container" key={i}>
    //           <DisplayMealService  mealData={x} />
    //         </div>
    //       );
    //     } else if (x.serviceType[0] === 'dinner') {
    //       return (
    //         <div className="lunch-container" key={i}>
    //           <DisplayMealService mealData={x} />
    //         </div>
    //       );
    //     } else {
    //       console.log("no service");
    //     }
    //   });

  return <div className='preview-container'>
    
  </div>;
};

export default Preview;
