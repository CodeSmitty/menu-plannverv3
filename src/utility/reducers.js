import React, {createContext, useReducer} from 'react';


 const service = {
   serviceType:{
     lunch:false,
     dinner:false
   },
   entre: {
     value: "",
     veg: false,
     glut: false,
     dairy: false,
   },
   sideOne: {
     value: "",
     veg: false,
     glut: false,
     dairy: false,
   },
   sideTwo: {
     value: "",
     veg: false,
     glut: false,
     dairy: false,
   },
   description: {
     value: "",
     veg: false,
     glut: false,
     dairy: false,
   },
   image:null
   
 };

 const newState = null;

 const reducer = (state, action) => {
  
  switch (action.type) {
    case "ENTRE":
      return {
        ...state,
        entre: {
          ...state.entre,
          [action.payload]: !state.entre[action.payload],
        },
      };
    case "ENTRE_TEXT":
      return {
        ...state,
        entre: {
          ...state.entre,
          value: action.payload,
        },
      };
    case "SIDE_TEXT":
      return {
        ...state,
        sideOne: {
          ...state.sideOne,
          value: action.payload,
        },
      };
    case "SIDE_ONE":
      return {
        ...state,
        sideOne: {
          ...state.sideOne,
          [action.payload]: !state.sideOne[action.payload],
        },
      };
    case "SIDE_TWO":
      return {
        ...state,
        sideTwo: {
          ...state.sideTwo,
          [action.payload]: !state.sideTwo[action.payload],
        },
      };
    case "SIDETWO_TEXT":
      return {
        ...state,
        sideTwo: {
          ...state.sideTwo,
          value: action.payload,
        },
      };
    case "DESCRIPTION":
      return {
        ...state,
        description: {
          ...state.description,
          [action.payload]: !state.description[action.payload],
        },
      };
    case "DESCRIPTION_TEXT":
      return {
        ...state,
        description: {
          ...state.description,
          value: action.payload,
        },
      };
    case "IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "LUNCH":
      return {
        ...state,
        serviceType: {
          ...state.serviceType,
          dinner:false,
          [action.payload]: !state.serviceType[action.payload]
        },
      };
    case "DINNER":
      return {
        ...state,
        serviceType: {
          ...state.serviceType,
          lunch:false,
          [action.payload]:!state.serviceType[action.payload]
        },
      };
    case "DEFAULT":
      return service;
    case "SUBMITTED":
      return {
        ...state,
        state: action.payload,
      };

    default:
      return state;
  }
};







const Store = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, service);

    return(
        <Context.Provider value={[state,dispatch]} >
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(service)


export default Store;

