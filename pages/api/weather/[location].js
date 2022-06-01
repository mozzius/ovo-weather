const weatherRoute = async (req, res) => {
  const { location } = req.query;
  if (!location) res.status(400).send("location is required");
  else {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}`
    );
    const weather = await res.json();
    res.json(weather);
  }
};

export default weatherRoute;
