import { useState } from "react";
import firebase from "../firebase.utility";
import { storage } from "../firebase.utility";
import { useStore } from "../reducers";
import moment from 'moment'
import {createData} from '../data';
import FireApi from '../rest.classes';

const useSubmitForm = (props) => {
  const [state] = useStore();
  //const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const db = () => firebase.database();
  
  const weekToDate = `week_0${moment(props.datesTree).week()}`;
  

  const handleSubmit = (e, image) => {
    e.preventDefault();

    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // dispatch({type:'IMAGE', payload:url})
              const value = state.serviceType;
              const keys = Object.keys(value);
              var filtered = keys.filter(function (key) {
                return value[key];
              });


              
            const yearToDate = moment(props.datesTree).format("YYYY")
            
            const dateId = `${moment(props.datesTree).format("YYYY-MM-DD")}_${filtered}`
            
            const mealId = moment(props.datesTree).format("YYYY-MM-DD")
             
              if (url) {

               //console.log( createData(dateId, yearToDate, weekToDate, filtered, url, state))
                
                

                db().ref("/mealService").once('value', snap =>{
                  if(!snap.hasChild(yearToDate)){
                    FireApi.create(
                      yearToDate,
                      weekToDate,
                      dateId,
                      createData(
                        mealId,
                        yearToDate,
                        weekToDate,
                        filtered[0],
                        url,
                        state
                      )
                    );
                  }else if(snap.hasChild(yearToDate)){
                    FireApi.create(
                      yearToDate,
                      weekToDate,
                      dateId,
                      createData(
                        mealId,
                        yearToDate,
                        weekToDate,
                        filtered[0],
                        url,
                        state
                      )
                    );
                  }
                });
              }
              //setProgress(0);
            });
        }
      );
    } else {
      console.log(error);
    }

   
  };

  return [handleSubmit];
};

export default useSubmitForm;
