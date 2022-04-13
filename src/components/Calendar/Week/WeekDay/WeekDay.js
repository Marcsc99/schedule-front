import { useEffect, useState } from "react";
import Apointment from "../../../Apointment/Apointment";
import Hour from "./Hour/Hour";
import styles from "./weekday.module.css"


const WeekDay = ({numDay, day, num = 30, dayStyle = null, holiday, apointments}) => {
    const [hours,setHours] = useState([]);
    const [orderedAp,setOrderedAp] = useState([]);

    useEffect(() => {
        let tmpHours = [];
        for(let i = 0; i < 24; i++){
            tmpHours.push(<Hour key = {i} hour = {i}/>)
        }
        setHours(tmpHours);

        function compare( a, b ) {
            if ( a.iniHour.hour < b.iniHour.hour ){
              return -1;
            }
            if ( a.iniHour.hour > b.iniHour.hour ){
              return 1;
            }
            return 0;
          }
        const tmpOrdered = apointments.sort(compare);
        setOrderedAp(tmpOrdered)
    },[apointments])

    return (
 
        <div className = {styles.container} style = {dayStyle}>
            <div className={styles.hover}>
                <div className = {styles.title}>
                    <h1>{day}</h1>
                    <h2>{num}</h2>
                </div>
                <div className = {styles.hours}>{hours}</div>
                <div className = {styles.holiday}><span>{holiday && holiday.name}</span></div>
            </div>
            
            <div>{orderedAp.map((ap, i) => {return <Apointment key = {i}apointment = {ap} week = {true}/>})}</div>
        </div>
        
    )
}

export default WeekDay;