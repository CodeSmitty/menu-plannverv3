import React, { useEffect, useState } from "react";
//import { Context } from "../../utility/reducers";
import "./preview.scss";
import firebase from "../../utility/firebase.utility";
//import axios from "../../utility/axios.orders";
import DisplayMealService from "../DisplayMealService/displayMealService";
//import {useDatabase } from '../../utility/utility.functions';

const Preview = (props) => {
  const [placeholderData, setPlaceholderData] = useState(null);
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

        const filteredLunch = Object.values(snapValue).find((x) => {
          return x
            ? x.date === props.dates && x.serviceType[0] === "lunch"
            : null;
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

        setDatabase({
          lunch: filteredLunch,
          dinner: filteredDinner,
        });
      });
  }, [props.dates]);

  useEffect(() => {
   // console.log("database mounted:", database);
  }, [database, props.dates]);

  const dinner = database && database.dinner ? database.dinner.service : null;

  const lunch = database && database.lunch ? database.lunch.service : null;

  return (
    <div className="preview-container">
      <div className='meal-container'>
        {dinner ? (
          <div className='lunch-container'>
          <DisplayMealService mealData={dinner} />
          </div>
        ) : (
          <div></div>
        )}
     
        {dinner ? (
          <div className='lunch-container'>
          <DisplayMealService mealData={lunch} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Preview;
