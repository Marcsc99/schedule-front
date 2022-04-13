import style from "./createapointment.module.css"
import {fetch} from "../../api/api.js"
import { useState } from "react"
import Input from "../Input/Input"

const CreateApointment = ({changeFunc}) => {
    const [date, setDate] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [iniHour, setIniHour] = useState(null)
    const [iniMinute, setIniMinute] = useState(null)
    const [finishHour, setFinishHour] = useState(null)
    const [finishMinute, setFinishMinute] = useState(null)
    const [color, setColor] = useState(null)
    const [error, setError] = useState(null)

    const postAppointment = async () => {
        if(date && title && iniHour && iniMinute && finishHour && finishMinute){
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
                description: description,
                color: color.toString()
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
            setColor(null);
            setError(null);
        }
        else{
            setError("Required fields still to be filled")
        }
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
                <div className={style.input}>
                    <label className = {style.label}>Color</label>
                    <Input type="color" val={color} set={setColor} ph = "Color" width = {200}/>
                </div>
                <div className = {style.input}>
                    <button className={style.submit} onClick = {() => postAppointment()}>Submit</button>
                </div>
                <span style = {{color: "red"}}>{error}</span>
            </div>
            
            
        </div>
    )
}

export default CreateApointment;