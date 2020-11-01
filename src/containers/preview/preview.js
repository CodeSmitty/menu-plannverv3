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
        
        const dataArr = [];

        const dataBase = snapshot.val();
      
        
        for (let id in dataBase) {
          dataArr.push({ id, ...dataBase[id] });
        }

        setDatabase({filteredLunch});
      });
  }, [props.dates]);

  useEffect(() => {
    console.log('database mounted')
  }, [database, props.dates]);

    const test = Object.values(database)
      .filter((x) => {
        console.log(x )
        console.log(x ? x[0].date === props.dates : 'no data')
        return x ? x : null;
      })
      .map((x, i) => {
       
  
          if (x ? x[1].serviceType[0] === "lunch" : x) {
            console.log("lunch", x[1]);
            return (
              <div className="lunch-container" key={i}>
                <DisplayMealService mealData={x[1]} />
              </div>
            );
          } else if (x ? x[0].serviceType[0] === "dinner" : x) {
            console.log("dinner");
            return (
              <div className="lunch-container" key={i}>
                <DisplayMealService mealData={x[0]} />
              </div>
            );
          } else {
            console.log("no service");
          }
         })

  return <div className='preview-container'>
    {test}
  </div>;
};

export default Preview;
