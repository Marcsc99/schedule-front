import { useEffect, useState } from "react";
import style from "./week.module.css"
import WeekDay from "./WeekDay/WeekDay";
import days from "../days/days"


const Week = ({date, apointments}) => {
    const [grid, setGrid] = useState([]);
    const [actualWeek, setActualWeek] = useState([]);

    

    useEffect(()=> {
        const getMonthApointments = () => {
            const results = apointments.filter(ap => {
                const apYear = new Date(ap.date).getFullYear();
                const apMonth = new Date(ap.date).getMonth();
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
    
            const week = parseInt((date.day + firstDay-2)*6/42) ;
            setActualWeek(week + 1);
            const tmp = week*7 + 1
    
            for(let i = tmp; i <= tmp + 6; i++){
                if( i < firstDay ) count.push({num: daysBefore - (firstDay-i-1), month: false})   //Si es un dia del mes anterior
                else if(i- firstDay >= daysInMonth) count.push({num: i + 1 - firstDay - daysInMonth, month: false}) //Si es un dia del mes posterior
                else count.push({num: i+1-firstDay, month: true})       //Si es un dia del mes
            }
            return count;
        }
    
        const getGrid = (tmpAp) => {
            
            const count = getCount();
            const markedDayStyle ={color: "red"}
            const otherMonthStyle ={backgroundColor: "grey"}
    
            const tmpGrid = count.map((c, i) => {
                const dayStyle = c.month ? (count[i].num === date.day ? markedDayStyle : null) : otherMonthStyle;
                const found = tmpAp.find(mAp => (new Date(mAp.date).getDate() === c.num) && c.month)
                return <WeekDay key = {i} day = {days[i%7]} num = {c.num} dayStyle = {dayStyle} apointment = {found} />
            });
            
            return tmpGrid;
        }
        
        const tmpAp = getMonthApointments();
        const tmpGrid = getGrid(tmpAp);
        setGrid(tmpGrid);
    }, [date])

    return (
        <div className={style.week}>
            <h3>Week {actualWeek}</h3>
            <div className = {style.container}>
                {grid}
            </div>
        </div>
        
    )
}

export default Week;