import axios from 'axios';
const env = import.meta.env;
console.log(env.VITE_HOLIDAY_API_BASEURL);
export const holidayInstance = axios.create({
  baseURL: env.VITE_HOLIDAY_API_BASEURL
});
