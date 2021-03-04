import React, { createContext, useContext, useReducer } from "react";

const storeContext = createContext();

const service = {
  serviceType: {
    lunch: "",
    dinner: "",
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
  image: null,
};

//  {
//         ...state,
//         entre: {
//           ...state.entre,
//           [action.payload]: !state.entre[action.payload],
//         },
//       };

const reducer = (state = service, action) => {
  switch (action.type) {
    case "ENTRE":
      const servType = action.servType;

      return {
        ...state,
        [servType]: {
          ...state[servType],
          [action.payload]: !state[servType][action.payload],
        },
      };

    case "ENTRE_TEXT":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          value: action.payload,
        },
      };
    case "SIDEONE_TEXT":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          value: action.payload,
        },
      };
    case "SIDEONE":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          [action.payload]: !state[action.servType][action.payload],
        },
      };
    case "SIDETWO":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          [action.payload]: !state[action.servType][action.payload],
        },
      };
    case "SIDETWO_TEXT":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          value: action.payload,
        },
      };
    case "DESCRIPTION":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          [action.payload]: !state[action.servType][action.payload],
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
          dinner: false,
          [action.payload]: !state.serviceType[action.payload],
        },
        [action.servType]: {
          ...state[action.servType],
          value: action.loadedData,
        },
      };
    case "DINNER":
      return {
        ...state,
        serviceType: {
          ...state.serviceType,
          lunch: false,
          [action.payload]: !state.serviceType[action.payload],
        },
        [action.servType]: {
          ...state[action.servType],
          value: action.loadedData,
        },
      };
    case "RESET":
      console.log('reset')
      if (action.type === "RESET") {
        return service;
      }
      break;
    case "SUBMITTED":
      return {
        ...state,
        state: action.payload,
      };

    case "GET_DATA":
      // '"{
      //   ...state,
      //   [action.servType]: {
      //     ...state[action.servType],
      //     value: action.payload,
      //   }"'
      console.log("hello");
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          value: action.payload,
        },
      };
    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, service);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => useContext(storeContext);

export default Store;
