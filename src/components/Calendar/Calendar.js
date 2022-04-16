import style from "./calendar.module.css"
import Month from "./Month/Month";
import Week from "./Week/Week";
import {fetch} from "../../api/api"
import {useCallback, useEffect, useMemo, useState} from "react" 


const Calendar = ({newApointment, calendarType, changeCalendarType, currentDate, country}) => {
    const [holidays, setHolidays] = useState([]);
    const [apointments, setApointments] = useState([]);
    const [actualWeek, setActualWeek] = useState(0);
    const [monthDays, setMonthDays] = useState([]);
    const [weekDays, setWeekDays] = useState([]);

    //Date object
    const date = useMemo(() => {return {
        year: new Date(currentDate).getFullYear(),
        month: new Date(currentDate).getMonth(),
        day: new Date(currentDate).getDate()
    }}, [currentDate]);

    //Function to get holidays from back
    const getHolidays = useCallback(async () => {
        const result = await fetch.getHolidays(country, new Date(currentDate).getFullYear()); //Backend call to get holidays
        const tmp = result.data.map(res => {return {    //Get just the name and date holidays in objects array
            name: res.name,
            date: res.date
        }})

        const results = tmp.filter(holi => {       //Filter the holidays to get just the month holidays
            const holiYear = new Date(holi.date).getFullYear();
            const holiMonth = new Date(holi.date).getMonth();
            return (holiYear === date.year && holiMonth === date.month);    //Return the holiday if the year and the month are equal to the current date
        });
        setHolidays(results);
    },[country, currentDate, date])

    //Function to get apointments from back
    const getAppointments = useCallback(async() => {
        const response = await fetch.getAppointments(); //Backend call to get apointments
        const monthApointments = response.data.filter(apointment => {   //filter the apointments to get just the mont apointments
            const apYear = new Date(apointment.date).getFullYear();
            const apMonth = new Date(apointment.date).getMonth();
            return (apYear === date.year && apMonth === date.month);    //Return the pointment if the year and the month are equal to the current date
        });
        setApointments(monthApointments)
    }, [date])

    //Function to get the days in month grid and if the day is in the current month or it's a day from last or next month
    const getMonthDays = useCallback((daysInMonth, daysLastMonth, firstDay) => {
        let count = [];
        for(let i = 1; i <= 42; i++){
            if( i < firstDay ) count.push({num: daysLastMonth - (firstDay-i-1), month: false})   //Si es un dia del mes anterior
            else if(i- firstDay >= daysInMonth) count.push({num: i + 1 - firstDay - daysInMonth, month: false}) //Si es un dia del mes posterior
            else count.push({num: i+1-firstDay, month: true})       //Si es un dia del mes
        }
        setMonthDays(count);
    }, []);

    //Function to get the days in week grid and if the day is in the current month or it's a day from last or next month
    const getWeekDays = useCallback((daysInMonth, daysLastMonth, firstDay) => {
        let count = [];

        const week = parseInt((date.day + firstDay-2)*6/42); //Get the week number in the month grid
        setActualWeek(week + 1);
        const tmp = week*7 + 1

        for(let i = tmp; i <= tmp + 6; i++){
            if( i < firstDay ) count.push({num: daysLastMonth - (firstDay-i-1), month: false})   //Si es un dia del mes anterior
            else if(i- firstDay >= daysInMonth) count.push({num: i + 1 - firstDay - daysInMonth, month: false}) //Si es un dia del mes posterior
            else count.push({num: i+1-firstDay, month: true})       //Si es un dia del mes
        }
        setWeekDays(count);
    }, [date]);

    //Function to get the month and week grids
    const getDays = useCallback( () => {
        const daysInMonth = new Date(date.year, date.month + 1, 0).getDate(); //Dias del mes
        const daysLastMonth = new Date(date.year, date.month, 0).getDate();      //Dias del mes anterior
        let firstDay = new Date(date.year, date.month, 1).getDay();  //Primer dia de la semana
        firstDay = firstDay === 0 ? 7 : firstDay;

        getMonthDays(daysInMonth, daysLastMonth, firstDay)
        getWeekDays(daysInMonth, daysLastMonth, firstDay)
    }, [getMonthDays, getWeekDays, date]);


    useEffect( () => {
        getDays();
        getAppointments();
        getHolidays();
    },[currentDate, country, newApointment, getDays, getHolidays, getAppointments])
    
    
    return (
        <div className = {style.container}>
            <button className={style.change} onClick={() => changeCalendarType()}>Change</button>
            { calendarType ? <Month date = {date} holidays = {holidays} apointments = {apointments} monthDays = {monthDays}/> :
                             <Week  date = {date} holidays = {holidays} apointments = {apointments} weekDays = {weekDays} actualWeek = {actualWeek}/> }
        </div>
    )
}

export default Calendar;