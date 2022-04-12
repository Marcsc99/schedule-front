import axios from "axios"

const API_URL =  window.location.hostname === 'ein-schedule.netlify.app' ? "https://ein-schedule.herokuapp.com" : "http://localhost:3223";

const URLs = {
    getHolidaysURL : (country, year) => `${API_URL}/holiday/${year}/${country}`,
    getAppointmentsURL : () => `${API_URL}/apointments`,
    postAppointmentsURL : () => `${API_URL}/apointments`
}
export const fetch = {
    getHolidays: async (country, year) => { return await axios.get(URLs.getHolidaysURL(country, year)) },
    getAppointments: async () => { return await axios.get(URLs.getAppointmentsURL()) },
    postAppointment: async (apointment) => { return await axios.post(URLs.postAppointmentsURL(), apointment )}
}
