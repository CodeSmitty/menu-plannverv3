import React, {useState} from 'react';
import ServiceForm from '../containers/serviceForm/serviceForm';
import Preview from '../containers/preview/preview';
import moment from 'moment'

const Planner = () =>{

    const [count, setCount] = useState(0);

   const [date, setDate] = useState(
    moment(new Date())
   );
   
   const prevDay = ()=>{
    setDate(moment(date).subtract(1, 'days'));
   
   };

   const nextDay = () =>{
       setDate(moment(date).add(1, 'days'));
   }

 

    
    return (
      <div>
        <button onClick={prevDay}>prev</button>
        <p>{date.format("MMM Do YY")}</p>
        <button onClick={nextDay}>next</button>
        <Preview dates={date.format("MMM Do YY")} />
        <ServiceForm dates={date.format("MMM Do YY")} />
      </div>
    );
};


export default Planner;