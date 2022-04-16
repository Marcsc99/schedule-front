import style from './app.module.css';
import Calendar from "./components/Calendar/Calendar"
import {useState} from "react"
import Header from './components/Header/Header';
import CreateApointment from './components/CreateApointment/CreateApointment';
import ApointmentsList from './components/ApointmentsList/ApointmentsList';

function App() {

  const date = new Date(Date.now()).toISOString().slice(0,10);
  const [year, setYear] = useState(date.slice(0,4));
  const [month, setMonth] = useState(date.slice(5,7));
  const [day, setDay] = useState(date.slice(8,10));

  const [isMonth, setIsMonth] = useState(true);
  const [newApointment, setNewApointment] = useState(true);
  const [createApointment, setCreateApointment] = useState(false);



  const onChangeDate = {
    month : (month) => { setMonth(month)},
    year: (year) => { setYear(year) },
    day : (day) =>{ setDay(day) }
  }
  const onChangeCalendar = () => { setIsMonth(!isMonth) }

  const values = {
    year, month, day
  }

  const currentDate = `${year}-${month}-${day}`;

  return (
    <div className={style.app}>
      <button className={style.create} onClick={() => setCreateApointment(!createApointment)}>Create Apointment</button>
      <Header onChange = {onChangeDate} values={values} />
      <div className = {style.apointments}>
        <ApointmentsList newApointment = {newApointment}/>
      </div>
      
      <div className={style.calendar}>
        <Calendar newApointment = {newApointment} calendarType = {isMonth} changeCalendarType = {() => onChangeCalendar()} currentDate = {currentDate} country = "ES"/>
      </div> 
      <CreateApointment changeFunc = {() => setNewApointment(!newApointment)} active = {createApointment}/>
    </div>
  );
}

export default App;
