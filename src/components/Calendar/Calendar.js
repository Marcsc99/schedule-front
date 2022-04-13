import style from "./calendar.module.css"
import Day from "./Day/Day";
import Month from "./Month/Month";
import Week from "./Week/Week";
import {fetch} from "../../api/api"
import {useEffect, useState} from "react" 


const Calendar = ({change, type = 0, changeType, currentDate, country}) => {
    const [holidays, setHolidays] = useState([]);
    const [apointments, setApointments] = useState([]);

    useEffect( () => {
        const getHolidays = async () => {
            const result = await fetch.getHolidays(country, new Date(currentDate).getFullYear());
            const tmp = result.data.map(res => {return {
                name: res.name,
                date: res.date
            }})
            setHolidays(tmp);
        }
        const getAppointments = async() => {
            const response = await fetch.getAppointments()
            setApointments(response.data)
        }
        getAppointments();
        getHolidays();
    },[currentDate, country, change])

    

    return (
        <div className = {style.container}>
            <button className={style.change}onClick={() => changeType()}>Change</button>
            {
                type === "0" ? 
                <Month 
                date = {{
                    year: new Date(currentDate).getFullYear(),
                    month: new Date(currentDate).getMonth(),
                    day: new Date(currentDate).getDate()
                }} 
                holidays = {holidays}
                apDates = {apointments.map(ap => {return {date: ap.date, color: ap.color}})}/> :
                (type === "1" ? 
                <Week 
                date = {{
                    year: new Date(currentDate).getFullYear(),
                    month: new Date(currentDate).getMonth(),
                    day: new Date(currentDate).getDate()
                }} 
                holidays = {holidays}
                apointments = {apointments}
                /> :
                <Day/>)
            }
        </div>
    )
}

export default Calendar;