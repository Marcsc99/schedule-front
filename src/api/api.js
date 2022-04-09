import axios from  "axios"


const URLs = {
    getAppointmentsURL : (country, year) => `https://ein-schedule.herokuapp.com/holiday/${year}/${country}`
}
export const fetch = {
    getAppointments: async (country, year) => { return await axios.get(URLs.getAppointmentsURL(country, year)) }
}
