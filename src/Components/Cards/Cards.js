import { useMemo, useState } from "react";
import classes from "./Cards.module.css";
import axios from "../../axios";
import debounce from "lodash.debounce";

const dayWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const API_KEY = "8c1c0cc49dca6f4456ca20ebc2172d25";
function Cards() {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  let date = new Date();
  let dateNum = date.getDate();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();
  let cTemp = weatherData ? (weatherData.main.temp - 273.15).toFixed(0) : null;

  const getData = (inputValue) => {
    axios
      .get(`?q=${inputValue}&appid=${API_KEY}`)
      .then((data) => {
        setWeatherData(data.data);
        setError(null);
      })
      .catch((error) => {
        console.log(error.message);
        let err = `${error.message} Search for correct city...`;
        setError(err);
        setWeatherData(null);
      });
  };
  const debounceFunc = useMemo(() => debounce(getData, 1000), []);
  const changeHandler = (e) => {
    setInputValue(e.target.value);
    debounceFunc(e.target.value);
  };
  return (
    <section className={classes.CardSection}>
      <div className={classes.Card}>
        <input
          className={classes.Search}
          type="text"
          value={inputValue}
          onChange={changeHandler}
          placeholder="Search"
        />

        {weatherData ? (
          <div className={classes.WeatherReport}>
            <h2 style={{ fontWeight: "500" }}>
              {weatherData.name}, {weatherData.sys.country}
            </h2>

            <span style={{ fontSize: "15px", fontWeight: "400" }}>
              {dayWeek[day]} {dateNum} {monthNames[month]} {year}
            </span>

            <div className={classes.Tempbox}>{cTemp}°c</div>
            {weatherData.clouds.all > 0 ? (
              <h3
                style={{
                  fontWeight: "600",
                  marginTop: "15px",
                  fontSize: "20px",
                }}
              >
                Clouds
              </h3>
            ) : null}
          </div>
        ) : (
          <h3 style={{ marginTop: "50px" }}>{error}</h3>
        )}
      </div>
    </section>
  );
}

export default Cards;
