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
  const [type, setType] = useState('0');
  const [change, setChange] = useState(true);
/*
  useEffect( () => {
    const postAppointments = async () => {
      const apointment = {
        date: date,
        iniHour: {
          hour: 22,
          minute: 24
        },
        finishHour: {
          hour: 23,
          minute: 24
        },
        title: "Titulo",
        description: "Descripcion"
      }
      const apointments = await fetch.postAppointment(apointment);
      console.log(apointments)
    }
    const getAppointments = async () => {
      const apointments = await fetch.getAppointments();
      console.log(apointments)
    }
    postAppointments();
    getAppointments();
  },[])
  */
  return (
    <div className={style.app}>
      <Header year = {year} setYear={setYear} month={month} setMonth = {setMonth} day = {day} setDay = {setDay}/>
      <div className = {style.apointments}>
        <CreateApointment changeFunc = {() => setChange(!change)}/>
        <ApointmentsList change = {change}/>
      </div>
      
      <div className={style.calendar}>
        <Calendar type = {type} changeType = {() => setType(type === '1' ? '0' : '1')} currentDate = {`${year}-${month}-${day}`} year = {year} country = "ES"/>
      </div>
    </div>
  );
}

export default App;
