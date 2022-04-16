import style from "./createapointment.module.css"
import {fetch} from "../../api/api.js"
import { useEffect, useState } from "react"
import Input from "../Input/Input"
import Apointment from "../Apointment/Apointment"

const CreateApointment = ({changeFunc, active}) => {
    const [date, setDate] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [iniHour, setIniHour] = useState(null)
    const [finishHour, setFinishHour] = useState(null)
    const [color, setColor] = useState("#a5eea5")
    const [textColor, setTextColor] = useState("#000000")
    const [error, setError] = useState(null)

    const postAppointment = async () => {
        if(date && title && iniHour && finishHour ){
            const data = {
                date: date,
                iniHour: {
                    hour: iniHour.slice(0,2),
                    minute: iniHour.slice(3,5)
                },
                finishHour:{
                    hour: finishHour.slice(0,2),
                    minute: finishHour.slice(3,5)
                },
                title: title,
                description: description,
                color: color.toString(),
                textColor: textColor.toString()
            }
            await fetch.postAppointment(data);
            changeFunc();
            setDate(null);
            setTitle("");
            setDescription("");
            setIniHour(null);
            setFinishHour(null);
            setColor(null);
            setError(null);
        }
        else{
            setError("Required fields still to be filled")
        }
    }

    return(
        <div className = {active ? style.container : style.containerOut} >
            <h1>Create Apointment</h1>
            <div className = {style.form}>

                <div className={style.input}>
                    <label className = {style.label}>Title</label>
                    <Input type="text" val={title} set={setTitle} ph = "Title" width = {100}/>
                </div>
                <div className={style.input}>
                    <label className = {style.label}>Year</label>
                    <Input type="date" val={date} set={setDate} ph = "YYYY-MM-DD" />
                </div>
                
                <div className={style.input}>
                    <label className = {style.label}>From</label>
                    <Input type="time" val={iniHour} set={setIniHour} ph = "Hour" min={"00:00"} max = {"23:59"} width = {100}/>
                </div>
                <div className = {style.input}>
                    <label className = {style.label}>To</label>
                    <Input type="time" val={finishHour} set={setFinishHour} ph = "Hour" min={"00:00"} max = {"23:59"} width = {100}/>
                </div>
                <div className={style.input}>
                    <label className = {style.label}>Description</label>
                    <Input type="text" val={description} set={setDescription} ph = "Description" width = {200}/>
                </div>
                <div className={style.input}>
                    <label className = {style.label}>Color</label>
                    <Input type="color" val={color} set={setColor} ph = "Color" width = {200}/>
                </div>
                <div className={style.input}>
                    <label className = {style.label}>Text Color</label>
                    <Input type="color" val={textColor} set={setTextColor} ph = "Color" width = {200}/>
                </div>
                <div className = {style.input}>
                    <button className={style.submit} onClick = {() => postAppointment()}>Submit</button>
                </div>
                <span style = {{color: "red"}}>{error}</span>

                <Apointment apointment= {{
                                            date: date || "YYYY-MM-DD",
                                            iniHour: {
                                                hour: iniHour ? iniHour.slice(0,2) : "HH",
                                                minute: iniHour ? iniHour.slice(3,5) : "MM"
                                            },
                                            finishHour:{
                                                hour: finishHour ? finishHour.slice(0,2) : "HH",
                                                minute: finishHour ? finishHour.slice(3,5) : "MM"
                                            },
                                            title: title || "Title example",
                                            description: description,
                                            color: color ? color.toString() : null,
                                            textColor: textColor ? textColor.toString() : null
                                        }}/>
            </div>
        </div>
    )
}

export default CreateApointment;