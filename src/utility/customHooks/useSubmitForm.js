import { useState } from "react";
import firebase from "../firebase.utility";
import { storage } from "../firebase.utility";
import { useStore } from "../reducers";

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

              if (url) {
                userRef.once("value", (snapshot) => {
                  if (!snapshot.hasChild(dateKey)) {
                    mealData.child(dateKey).set({
                      date: props.dates,
                      serviceId:props.dates,
                      serviceType: filtered,
                      service: state,
                      image: url,
                      items: [
                        { entre: state.entre, type: "entre" },
                        {
                          name: state.sideOne,
                          type: "side_one",
                        },
                        {
                          name: state.sideTwo,
                          type: "side_two",
                        },
                        {
                          name: state.description,
                          type: "description",
                        },
                      ],
                    });
                  } else if (snapshot.hasChild(dateKey)) {
                    db()
                      .ref(dateKey)
                      .once("value", (snap) => {
                        mealData.child(dateKey).update({
                          service: state,
                          image: url,
                          items: [
                            { name: state.entre, type: "entre" },
                            {
                              name: state.sideOne,
                              type: "side_one",
                            },
                            {
                              name: state.sideTwo,
                              type: "side_two",
                            },
                            {
                              name: state.description,
                              type: "description",
                            },
                          ],
                        });
                      });
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
