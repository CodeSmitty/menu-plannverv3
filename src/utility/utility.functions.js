// import React, { useEffect, useState, useContext } from "react";
// import firebase from "../utility/firebase.utility";
// import {storage} from './firebase.utility';
// import {Context} from './reducers';
import moment from 'moment'


export const handleMomentDate = (key, formats) =>{

  return moment(key).format(formats);
}
 

    

