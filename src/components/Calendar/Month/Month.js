import style from "./month.module.css"
import MonthDay from "./MonthDay/MonthDay";
import { useEffect, useState } from "react";
import days from "../days/days"


const Month = ({date, holidays, apDates}) => {
    const [grid, setGrid] = useState([]);
    const [month, setMonth] = useState("");

    

    useEffect(() => {
        const getMonthHolidays = () => {
            const results = holidays.filter(ap => {
                const apYear = new Date(ap.date).getFullYear();
                const apMonth = new Date(ap.date).getMonth();
                return (apYear === date.year && apMonth === date.month);
            });
            return results;
        }

        const getMonthApointments = () => {
            const results = apDates.filter(apDate => {
                const apYear = new Date(apDate.date).getFullYear();
                const apMonth = new Date(apDate.date).getMonth();
                return (apYear === date.year && apMonth === date.month);
            });
            return results;
        }
        
        const getCount = () => {
            let count = [];
            const daysInMonth = new Date(date.year, date.month + 1, 0).getDate(); //Dias del mes
            const daysBefore = new Date(date.year, date.month, 0).getDate();      //Dias del mes anterior
            let firstDay = new Date(date.year, date.month, 1).getDay();  //Primer dia de la semana
            firstDay = firstDay === 0 ? 7 : firstDay;
    
            for(let i = 1; i <= 42; i++){
                if( i < firstDay ) count.push({num: daysBefore - (firstDay-i-1), month: false})   //Si es un dia del mes anterior
                else if(i- firstDay >= daysInMonth) count.push({num: i + 1 - firstDay - daysInMonth, month: false}) //Si es un dia del mes posterior
                else count.push({num: i+1-firstDay, month: true})       //Si es un dia del mes
            }
            return count;
        }
    
        const getGrid = (tmpHoli, tmpAp) => {
            let tmpGrid = [];
            const count = getCount();
            const markedDayStyle ={color: "red"}
            const otherMonthStyle ={backgroundColor: "grey"}
            
            for(let i = 0; i < 42; i++){
                const dayStyle = count[i].month ? (count[i].num === date.day ? markedDayStyle : null) : otherMonthStyle;
                const foundHoli = tmpHoli.find(mAp => new Date(mAp.date).getDate() === count[i].num)
                const foundAp = tmpAp.find(mAp => new Date(mAp.date).getDate() === count[i].num)
                tmpGrid.push(<MonthDay key = {i} day = {days[i%7]} num = {count[i].num} dayStyle = {dayStyle} holiday = {foundHoli} apointment = {{found: foundAp != null, color: foundAp ? foundAp.color : null}}/>)
            }
            return tmpGrid;
        }
        const iniMonth = () => {
            const tmpMonth = new Date(date.year, date.month, date.day).toLocaleString('en-us', { month: 'long' }); 
            setMonth(tmpMonth.toUpperCase());
        }
    
        const initGrid = (tmpHoli, tmpAp) => {
            const tmpGrid = getGrid(tmpHoli, tmpAp);
            setGrid(tmpGrid);
        }


        const tmpHoli = getMonthHolidays();
        const tmpAp = getMonthApointments();
        initGrid(tmpHoli, tmpAp);
        iniMonth();
        
    }, [date, holidays, apDates])


    return (
        <div className={style.month}>
            <h3>{month}</h3>
            <div className = {style.container}>
                {grid}
            </div>
        </div>
        
    )
}

export default Month;