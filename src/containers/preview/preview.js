import React, { useEffect, useState } from "react";
//import { Context } from "../../utility/reducers";
import "./preview.scss";
import firebase from "../../utility/firebase.utility";
//import axios from "../../utility/axios.orders";
import DisplayMealService from "../DisplayMealService/displayMealService";
import {useDatabase } from '../../utility/utility.functions';

const Preview = (props) => {
  //const [state, dispatch] = useContext(Context);
  const vegLogo = require("../../assets/vegetarianIcon.png");
  const glutenLogo = require("../../assets/glutenFree.png");
  const dairyFree = require("../../assets/dairyfree.png");

  const [database, setDatabase] = useState({
    key: null,
    data: null,
  });
  const db = () => firebase.database();


  
  useEffect(() => {
    db();
    // console.log("mounted");
  });

  useEffect(() => {
    db()
      .ref("/meals/")
      .on("value", (snapshot) => {
        const dataArr = [];

        const dataBase = snapshot.val();

        for (let id in dataBase) {
          dataArr.push({ id, ...dataBase[id] });
        }

        setDatabase(dataArr);
      });
  }, []);

  useEffect(() => {
    //console.log(database);
  }, [database]);

  const test = Object.values(database)
    .filter((x) => {
      return x ? x.date === props.dates : null;
    })
    .map((x, i) => {
      if (x.mealService.serviceType.lunch === true) {
        return (
          <div className="lunch-container" key={i}>
            <DisplayMealService mealService={x.mealService} />
          </div>
        );
      } else if (x.mealService.serviceType.dinner === true) {
        return (
          <div className="lunch-container" key={i}>
            <DisplayMealService mealService={x.mealService} />
          </div>
        );
      } else {
        console.log("no service");
      }
    });

  return <div>{test}</div>;
};

export default Preview;
