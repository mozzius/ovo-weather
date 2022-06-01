import styles from "./Day.module.css";

const lookup = {
  200: {
    main: "Thunderstorm",
    icon: "11d",
  },
  201: {
    main: "Thunderstorm",
    icon: "11d",
  },
  202: {
    main: "Thunderstorm",
    icon: "11d",
  },
  210: {
    main: "Thunderstorm",
    icon: "11d",
  },
  211: {
    main: "Thunderstorm",
    icon: "11d",
  },
  212: {
    main: "Thunderstorm",
    icon: "11d",
  },
  221: {
    main: "Thunderstorm",
    icon: "11d",
  },
  230: {
    main: "Thunderstorm",
    icon: "11d",
  },
  231: {
    main: "Thunderstorm",
    icon: "11d",
  },
  232: {
    main: "Thunderstorm",
    icon: "11d",
  },
  300: {
    main: "Drizzle",
    icon: "09d",
  },
  301: {
    main: "Drizzle",
    icon: "09d",
  },
  302: {
    main: "Drizzle",
    icon: "09d",
  },
  310: {
    main: "Drizzle",
    icon: "09d",
  },
  311: {
    main: "Drizzle",
    icon: "09d",
  },
  312: {
    main: "Drizzle",
    icon: "09d",
  },
  313: {
    main: "Drizzle",
    icon: "09d",
  },
  314: {
    main: "Drizzle",
    icon: "09d",
  },
  321: {
    main: "Drizzle",
    icon: "09d",
  },
  500: {
    main: "Rain",
    icon: "10d",
  },
  501: {
    main: "Rain",
    icon: "10d",
  },
  502: {
    main: "Rain",
    icon: "10d",
  },
  503: {
    main: "Rain",
    icon: "10d",
  },
  504: {
    main: "Rain",
    icon: "10d",
  },
  511: {
    main: "Rain",
    icon: "13d",
  },
  520: {
    main: "Rain",
    icon: "09d",
  },
  521: {
    main: "Rain",
    icon: "09d",
  },
  522: {
    main: "Rain",
    icon: "09d",
  },
  531: {
    main: "Rain",
    icon: "09d",
  },
  600: {
    main: "Snow",
    icon: "13d",
  },
  601: {
    main: "Snow",
    icon: "13d",
  },
  602: {
    main: "Snow",
    icon: "13d",
  },
  611: {
    main: "Snow",
    icon: "13d",
  },
  612: {
    main: "Snow",
    icon: "13d",
  },
  613: {
    main: "Snow",
    icon: "13d",
  },
  615: {
    main: "Snow",
    icon: "13d",
  },
  616: {
    main: "Snow",
    icon: "13d",
  },
  620: {
    main: "Snow",
    icon: "13d",
  },
  621: {
    main: "Snow",
    icon: "13d",
  },
  622: {
    main: "Snow",
    icon: "13d",
  },
  701: {
    main: "Mist",
    icon: "50d",
  },
  711: {
    main: "Smoke",
    icon: "50d",
  },
  721: {
    main: "Haze",
    icon: "50d",
  },
  731: {
    main: "Dust",
    icon: "50d",
  },
  741: {
    main: "Fog",
    icon: "50d",
  },
  751: {
    main: "Sand",
    icon: "50d",
  },
  761: {
    main: "Dust",
    icon: "50d",
  },
  762: {
    main: "Ash",
    icon: "50d",
  },
  771: {
    main: "Squall",
    icon: "50d",
  },
  781: {
    main: "Tornado",
    icon: "50d",
  },
  800: {
    main: "Clear",
    icon: "01d",
  },
  801: {
    main: "Clouds",
    icon: "02d",
  },
  802: {
    main: "Cloudy",
    icon: "03d",
  },
  803: {
    main: "Cloudy",
    icon: "04d",
  },
  804: {
    main: "Overcast",
    icon: "04d",
  },
};

const Day = ({ data }) => {
  const { date, weather, maxTemp, humidity } = data;
  const { main, icon } = lookup[weather];
  // convert date from ISO-8601 to normal
  // looks like something like 2017-01-30 beforehand
  const normalDate = date.split("-").reverse().join("/");
  return (
    <div className={styles.day}>
      <p className={styles.date}>{normalDate}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`${main} icon`}
      />
      <h3>{main}</h3>
      <p>Max temp: {maxTemp}°C</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
};

export default Day;
