import axios from "axios";

const Instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather/",
});
export default Instance;
