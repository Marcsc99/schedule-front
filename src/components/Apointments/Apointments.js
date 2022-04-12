import style from "./apointments.module.css"
import {fetch} from "../../api/api.js"
import { useState } from "react"
import Input from "../Input/Input"

const Apointments = ({changeFunc}) => {
    const [date, setDate] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [iniHour, setIniHour] = useState(null)
    const [iniMinute, setIniMinute] = useState(null)
    const [finishHour, setFinishHour] = useState(null)
    const [finishMinute, setFinishMinute] = useState(null)

    const postAppointment = async () => {
        const data = {
            date: date,
            iniHour: {
                hour: iniHour,
                minute: iniMinute
            },
            finishHour:{
                hour: finishHour,
                minute: finishMinute
            },
            title: title,
            description: description
        }
        await fetch.postAppointment(data);
        changeFunc();
        setDate(null);
        setTitle("");
        setDescription("");
        setIniHour(null);
        setIniMinute(null);
        setFinishHour(null);
        setFinishMinute(null);
    }

    return(
        <div className = {style.container}>
            <h1>Create Apointment</h1>
            <div className = {style.form}>

                <div className={style.input}>
                    <label className = {style.label}>Title</label>
                    <Input type="text" val={title} set={setTitle} ph = "Title" width = {100}/>
                </div>
                <div className={style.input}>
                    <label className = {style.label}>Year</label>
                    <Input type="text" val={date} set={setDate} ph = "YYYY-MM-DD" />
                </div>
                
                <div className={style.input}>
                    <label className = {style.label}>From</label>
                    <Input type="number" val={iniHour} set={setIniHour} ph = "Hour" min={0} max = {23} width = {50}/>
                    <Input type="number" val={iniMinute} set={setIniMinute} ph = "Min" min = {0} max = {59} width = {50}/>
                </div>
                <div className = {style.input}>
                    <label className = {style.label}>To</label>
                    <Input type="number" val={finishHour} set={setFinishHour} ph = "Hour" min={0} max = {23} width = {50}/>
                    <Input type="number" val={finishMinute} set={setFinishMinute} ph = "Min" min = {0} max = {59} width = {50}/>
                </div>
                <div className={style.input}>
                    <label className = {style.label}>Description</label>
                    <Input type="text" val={description} set={setDescription} ph = "Description" width = {200}/>
                </div>
                <div className = {style.input}>
                    <label className = {style.label}></label>
                    <button className={style.submit} onClick = {() => postAppointment()}>Submit</button>
                </div>
                
            </div>
            
            
        </div>
    )
}

export default Apointments;