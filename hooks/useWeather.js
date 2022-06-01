import { useState, useEffect } from "react";

// This is a hook to get the weather data
//
// It returns an object, with the status of the request
// and any data
//
// This allows the component to know what to do with it
//
// The type is either loading, success, or error

const useWeather = (location) => {
  // the weather data is stored in a useState hook
  const [weather, setWeather] = useState({ type: "loading", data: null });

  // it's in a useEffect hook so that it only runs when the location changes
  useEffect(() => {
    // this is where the weather get fetched
    // uses async/await and fetch
    const getWeatherData = async (location) => {
      try {
        const res = await fetch(`/api/weather/${location}`);
        const data = await res.json();
        setWeather({ type: "success", data });
      } catch (e) {
        console.error(e);
        setWeather({ type: "error", data: e });
      }
    };
    getWeatherData(location);
  }, [location]);

  return weather;
};

export default useWeather;
