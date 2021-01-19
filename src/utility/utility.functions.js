// import React, { useEffect, useState, useContext } from "react";
// import firebase from "../utility/firebase.utility";
// import {storage} from './firebase.utility';
// import {Context} from './reducers';


  export const handleFormLoadData =(db, dates, database) =>{

    let serviceData;

   
        const setPlaceholderData = db()
           .ref("meals/")
           .on("value", (snapshot) => {
             const snapValue = snapshot.val();
             const lunchOrDinnerValues = snapValue
               ? Object.values(snapValue)
                   .filter((x) => {
                     return x
                       ? x.date === dates && x.serviceType === database
                       : null;
                   })
                   .map((x) => x.date)
               : null;
             if (
               lunchOrDinnerValues
                 ? lunchOrDinnerValues[0] === dates
                 : null
             ) {
               serviceData = snapValue
                 ? Object.values(snapValue).find((x) => {
                     return (
                       x.date === dates && x?.serviceType === database
                     );
                   })
                 : null;

               //setPlaceholderData({ serviceData });
               return serviceData
             }
           });

           return serviceData;
           
    }
 

    

