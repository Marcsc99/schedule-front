import style from "./calendar.module.css"
import Day from "./Day/Day";
import Month from "./Month/Month";
import Week from "./Week/Week";
import {fetch} from "../../api/api"
import {useEffect, useState} from "react" 


const Calendar = ({type = 0, currentDate, country}) => {
    const [apointments, setAppointments] = useState([]);

    useEffect( () => {
        const getAppointments = async () => {
            const result = await fetch.getAppointments(country, new Date(currentDate).getFullYear());
            const tmp = result.data.map(res => {return {
                name: res.name,
                date: res.date
            }})
            setAppointments(tmp);
        }
        getAppointments();
    },[currentDate, country])

    

    return (
        <div className = {style.container}>
            {
                type === "0" ? <Month date = {{
                    year: new Date(currentDate).getFullYear(),
                    month: new Date(currentDate).getMonth(),
                    day: new Date(currentDate).getDate()
                }} apointments = {apointments}/> :
                (type === "1" ? <Week date = {{
                    year: new Date(currentDate).getFullYear(),
                    month: new Date(currentDate).getMonth(),
                    day: new Date(currentDate).getDate()
                }} apointments = {apointments}/> :
                <Day/>)
            }
        </div>
    )
}

export default Calendar;