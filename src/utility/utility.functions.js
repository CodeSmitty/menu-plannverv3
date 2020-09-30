import React, { useEffect, useState } from "react";
import firebase from "../utility/firebase.utility";

export const useDatabase = (dbs) => {
  const [fetchedData, setFetchedData] = useState([]);
  const db = () => firebase.database();

  useEffect(() => {
    db();
    console.log("mounted");
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

        setFetchedData(dataArr);
      });
  }, []);

  return fetchedData;
};
