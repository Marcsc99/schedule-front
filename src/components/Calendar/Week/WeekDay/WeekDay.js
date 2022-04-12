import { useEffect, useState } from "react";
import Hour from "./Hour/Hour";
import styles from "./weekday.module.css"


const WeekDay = ({day, num = 30, dayStyle = null, holiday}) => {
    const [hours,setHours] = useState([]);

    useEffect(() => {
        let tmpHours = [];
        for(let i = 0; i < 24; i++){
            tmpHours.push(<Hour key = {i} hour = {i}/>)
        }
        setHours(tmpHours);
    },[])
    return (
        <div className = {styles.container} style = {dayStyle}>
            <div className = {styles.title}>
                <h1>{day}</h1>
                <h2>{num}</h2>
            </div>
            <div className = {styles.hours}>{hours}</div>
            <div className = {styles.holiday}><span>{holiday && holiday.name}</span></div>
        </div>
    )
}

export default WeekDay;