import React, { useState, useEffect } from "react";
import firebase from "../../utility/firebase.utility";
import "./home.scss";
import moment from "moment";
import Preview from "../preview/preview";
import DisplayMealService from "../DisplayMealService/displayMealService";

const Home = (props) => {
  const db = () => firebase.database();
  const [database, setDatabase] = useState();
  const startOfWeek = moment().startOf("week");
  const endWeek = moment().endOf('week')

  const [currWeek, setCurrWeek] = useState(startOfWeek);
  const endOfWeek = moment(currWeek).add(6, "days");

  const [lunchValues, setLunchValues] = useState();
  const [dinnerValue, setDinnerValues] = useState();

  const [weeklyValue, setWeeklyvalues] = useState();

  const prevWeek = () => {
    setCurrWeek(moment(currWeek).subtract(1, "week"));
  };

  const nextWeek = () => {
    setCurrWeek(moment(currWeek).add(1, "week"));
  };


  function getCurrentWeek(){
      let days = [];
      let day = currWeek;

      while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, "days");
      }

      
      return days
  }
  
  let currDays = getCurrentWeek()


  useEffect(() => {
    db()
      .ref("meals")
      .orderByChild("date")
      .startAt(currWeek.format("MMM Do YY"))
      .endAt(endOfWeek.format("MMM Do YY"))
      .on("value", (snapshot) => {
        const snapValue = snapshot.val();


    let getMealsByDate = currDays.filter(day =>{
        const dayName = moment(day).format("MMM Do YY")
         const obj = [];
         
        let meals = Object.values(snapValue).map(service=>{
           if(service.date === dayName){
               let test = service

               obj.push(test)
           }
                // for(let key in service){
                //     if(service[key] === dayName){
                //         obj.push(service)
                        
                //     }
                // }
                    // if(){
                    //     console.log(service)
                    //     obj.push(service)
                    // }
                })
        
                console.log(obj)
                setWeeklyvalues(obj)

       return obj

       

        //console.log(meals)
    });

    console.log(getMealsByDate)

        let lunchMeals = snapValue
          ? Object.values(snapValue).map((service, i) => {
            

              if (service.serviceType[0] === "lunch") {
                let lunch = (
                  <div key={service.date + i} className="lunch-container-home">
                    <p>{service.date} </p>
                    <DisplayMealService mealData={service?.service} />
                  </div>
                );

                
                return lunch;
              }
            })
          : null;

        let dinnerMeals = snapValue
          ? Object.values(snapValue).map((service, i) => {
              

              if (service.serviceType[0] === "dinner") {
                let lunch = (
                  <div key={service.date + i} className="lunch-container-home">
                    <p>{service.date} </p>
                    <DisplayMealService mealData={service?.service} />
                  </div>
                );

                return lunch;
              }
            })
          : null;

        setLunchValues(lunchMeals);
        setDinnerValues(dinnerMeals);

        // setWeeklyvalues(weeklyMeals)
      });
  }, [currWeek]);

  useEffect(() => {
   
  }, [database, currWeek, lunchValues, weeklyValue]);


  return (
    <div className="home-section">
      <button onClick={prevWeek}>previous week</button>
      <button onClick={nextWeek}>next Week</button>
      <div className="service-container">{lunchValues}</div>
      <div className="service-container">{dinnerValue}</div>
    </div>
  );
};

export default Home;
