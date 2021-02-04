import { useState } from "react";
import firebase from "../firebase.utility";
import { storage } from "../firebase.utility";
import { useStore } from "../reducers";
import moment from 'moment'
const useSubmitForm = (props) => {
  const [state] = useStore();
  //const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const db = () => firebase.database();
  
  
  

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

              const mealData = db().ref().child("meals");

              const dateKey = props.dateId + "_" + filtered;

              const userRef = db().ref("meals");

              
            const yearToDate = moment(props.datesTree).format("YYYY")
            const weekToDate = `week_${moment(props.datesTree).isoWeek()}`;
            const dateId = `${moment(props.datesTree).format("YYYY-MM-DD")}_${filtered}`

             
              if (url) {

                db().ref("/mealService").once('value',snap=>{
                  if(!snap.hasChild(yearToDate)){
                     db()
                       .ref()
                       .child("/mealService")
                       .child(yearToDate)
                       .child(weekToDate)
                       .child(dateId)
                       .set({
                         mealId: dateId,
                         year: yearToDate,
                         week: weekToDate,
                         serviceType: filtered,
                         image: url,
                         mealItems: [
                           {
                             entre: state?.entre?.value,
                             type: "entre",
                             diets: [
                               { veg: state?.entre.veg, type: "vegetarian" },
                               {
                                 glut: state?.entre?.glut,
                                 type: "gluten_free",
                               },
                               {
                                 dairy: state?.entre?.dairy,
                                 type: "dairy_free",
                               },
                             ],
                           },
                           {
                             sideOne: state?.sideOne?.value,
                             type: "entre",
                             diets: [
                               { veg: state?.sideOne.veg, type: "vegetarian" },
                               {
                                 glut: state?.sideOne?.glut,
                                 type: "gluten_free",
                               },
                               {
                                 dairy: state?.sideOne?.dairy,
                                 type: "dairy_free",
                               },
                             ],
                           },
                           {
                             sideTwo: state?.sideTwo?.value,
                             type: "entre",
                             diets: [
                               { veg: state?.sideTwo.veg, type: "vegetarian" },
                               {
                                 glut: state?.sideTwo?.glut,
                                 type: "gluten_free",
                               },
                               {
                                 dairy: state?.sideTwo?.dairy,
                                 type: "dairy_free",
                               },
                             ],
                           },
                           {
                             description: state?.description?.value,
                             type: "entre",
                             diets: [
                               {
                                 veg: state?.description.veg,
                                 type: "vegetarian",
                               },
                               {
                                 glut: state?.description?.glut,
                                 type: "gluten_free",
                               },
                               {
                                 dairy: state?.description?.dairy,
                                 type: "dairy_free",
                               },
                             ],
                           },
                         ],
                       });
                    
                  }else if(snap.hasChild(yearToDate)){
                   db()
                     .ref()
                     .child("/mealService")
                     .child(yearToDate)
                     .child(weekToDate)
                     .child(dateId)
                     .update({
                       mealId: props.dates,
                       year: yearToDate,
                       week: weekToDate,
                       serviceType: filtered[0],
                       image: url,
                       mealItems: [
                         {
                           entre: state?.entre?.value,
                           type: "entre",
                           diets: [
                             { veg: state?.entre.veg, type: "vegetarian" },
                             {
                               glut: state?.entre?.glut,
                               type: "gluten_free",
                             },
                             {
                               dairy: state?.entre?.dairy,
                               type: "dairy_free",
                             },
                           ],
                         },
                         {
                           sideOne: state?.sideOne?.value,
                           type: "entre",
                           diets: [
                             { veg: state?.sideOne.veg, type: "vegetarian" },
                             {
                               glut: state?.sideOne?.glut,
                               type: "gluten_free",
                             },
                             {
                               dairy: state?.sideOne?.dairy,
                               type: "dairy_free",
                             },
                           ],
                         },
                         {
                           sideTwo: state?.sideTwo?.value,
                           type: "entre",
                           diets: [
                             { veg: state?.sideTwo.veg, type: "vegetarian" },
                             {
                               glut: state?.sideTwo?.glut,
                               type: "gluten_free",
                             },
                             {
                               dairy: state?.sideTwo?.dairy,
                               type: "dairy_free",
                             },
                           ],
                         },
                         {
                           description: state?.description?.value,
                           type: "entre",
                           diets: [
                             { veg: state?.description.veg, type: "vegetarian" },
                             {
                               glut: state?.description?.glut,
                               type: "gluten_free",
                             },
                             {
                               dairy: state?.description?.dairy,
                               type: "dairy_free",
                             },
                           ],
                         },
                       ],
                     });
                  }
                })
            


                // userRef.once("value", (snapshot) => {
                //   if (!snapshot.hasChild(dateKey)) {

                //     mealData.child(dateKey).set({
                //       date: props.dates,
                //       serviceId:props.dates,
                //       serviceType: filtered,
                //       service: state,
                //       image: url,
                //       items: [
                //         { entre: state.entre, type: "entre" },
                //         {
                //           name: state.sideOne,
                //           type: "side_one",
                //         },
                //         {
                //           name: state.sideTwo,
                //           type: "side_two",
                //         },
                //         {
                //           name: state.description,
                //           type: "description",
                //         },
                //       ],
                //     });
                //   } else if (snapshot.hasChild(dateKey)) {
                //     db()
                //       .ref(dateKey)
                //       .once("value", (snap) => {
                //         mealData.child(dateKey).update({
                //           service: state,
                //           image: url,
                //           items: [
                //             { name: state.entre, type: "entre" },
                //             {
                //               name: state.sideOne,
                //               type: "side_one",
                //             },
                //             {
                //               name: state.sideTwo,
                //               type: "side_two",
                //             },
                //             {
                //               name: state.description,
                //               type: "description",
                //             },
                //           ],
                //         });
                //       });
                //   }
                //});
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
