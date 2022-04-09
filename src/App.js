import style from './app.module.css';
import Calendar from "./components/Calendar/Calendar"
import {useState} from "react"
import Header from './components/Header/Header';

function App() {
  const date = new Date(Date.now()).toISOString().slice(0,10);
  const [year, setYear] = useState(date.slice(0,4));
  const [month, setMonth] = useState(date.slice(5,7));
  const [day, setDay] = useState(date.slice(8,10));
  const [type, setType] = useState('0');
  return (
    <div className={style.app}>
      <Header year = {year} setYear={setYear} month={month} setMonth = {setMonth} day = {day} setDay = {setDay}/>
      <Calendar type = {type} changeType = {() => setType(type === '1' ? '0' : '1')} currentDate = {`${year}-${month}-${day}`} year = {year} country = "ES"/>
    </div>
  );
}

export default App;
