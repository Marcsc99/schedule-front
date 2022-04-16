import { useCallback, useEffect, useState } from "react";
import Apointment from "../../../Apointment/Apointment";
import Hour from "./Hour/Hour";
import styles from "./weekday.module.css"


const WeekDay = ({numDay, day, num = 30, dayStyle = null, holiday, apointments}) => {
    const [hours,setHours] = useState([]);
    const [orderedAp,setOrderedAp] = useState([]);

    //Function to get the 24 Hours in the day
    const getHours = useCallback(()=> {
        let tmpHours = [];
        for(let i = 0; i < 24; i++){ tmpHours.push(<Hour key = {i} hour = {i}/>) }
        setHours(tmpHours);
    }, [])
    
    //Function to compare apointments by it's start hour
    function compare( a, b ) {
        if ( a.iniHour.hour < b.iniHour.hour ){ return -1; }
        if ( a.iniHour.hour > b.iniHour.hour ){ return 1; }
        return 0;
    }

    //Function to order apoointments by it's start hour
    const orderApointments = useCallback(() => {
        const tmpOrdered = apointments.sort(compare);
        setOrderedAp(tmpOrdered)
    }, [apointments])

    useEffect(() => {
        getHours();
        orderApointments();
    },[apointments, getHours, orderApointments])

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