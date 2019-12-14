import React from 'react'
import styles from './City.module.css'
import Day from './Day'
import useWeather from '../hooks/useWeather'

const Error = ({ location, deleteCity }) => {
    return (
        <div className={styles.city}>
            <h2 className={styles.name} onClick={deleteCity}>Error!</h2>
            <p className={styles.errorText}>There was a problem fetching data for <code>{location}</code></p>
        </div>
    )
}

const City = ({ location, deleteCity }) => {
    // pls don't steal my API key
    // I mean they're free, just make your own account if you want one so bad
    // obviously this is bad practice, should be passed in through config or something
    const url = `api.openweathermap.org/data/2.5/forecast?q=${location}&appid=d110260af0b2c5c319374c26e7f0cca7`
    // I was getting Cross-Origin Resource Sharing errors
    // so I used this rather hacky service to get the data
    const { type, data } = useWeather('https://cors-anywhere.herokuapp.com/' + url)
    // In a real app I'd pass it through a backend or perhaps use some
    // fancy serverless functions but that's a little out of scope for this
    // That way I could hide the API key in .env

    // split the list into days
    const calculateDays = data => {
        let days = []
        let currentDate = null
        data.list.forEach(day => {
            const date = day.dt_txt.split(' ')[0]
            if (date !== currentDate) {
                currentDate = date
                // the weather almost always comes in an array with one element, so just get the first element
                days.push({
                    date,
                    weather: [day.weather[0].id],
                    maxTemp: Math.floor(day.main.temp_max - 273.15),
                    humidity: [day.main.humidity]
                })
            } else {
                let current = days[days.length - 1]
                let temp = Math.floor(day.main.temp_max - 273.15)

                current.weather.push(day.weather[0].id)
                current.humidity.push(day.main.humidity)

                days[days.length - 1] = {
                    ...current,
                    maxTemp: temp > current.maxTemp ? temp : current.maxTemp
                }
            }
        })

        // make sure it's only 5 days
        days = days.slice(0, 5)

        // average the humidities and the main weather
        return days.map(day => {
            // find the most common weather
            const weathers = [...new Set(day.weather)]
            const count = new Array(weathers.length).fill(0)
            day.weather.forEach(weather => {
                count[weathers.indexOf(weather)]++
            })
            let maxCount = 0
            let weather = null
            count.forEach((c, i) => {
                if (c > maxCount) {
                    maxCount = c
                    weather = weathers[i]
                }
            })

            // calculate the average humidity
            let humidity = Math.floor(day.humidity.reduce((acc, curr) => acc + curr) / day.humidity.length)
            return {
                ...day,
                weather,
                humidity
            }
        })
    }

    // returns something different depending on what type
    // of data the hook returns
    switch (type) {
        case 'loading':
            return (
                <div className={styles.city}>
                    <h2>Loading <code>{location}</code>...</h2>
                </div>
            )
        case 'success':
            console.log(data)
            if (data.cod !== '200') return <Error location={location} deleteCity={() => deleteCity(location)} />

            const days = calculateDays(data)

            return (
                <div className={styles.city}>
                    <h2 className={styles.name} onClick={() => deleteCity(location)}>{data.city.name}<span>{data.city.country}</span></h2>
                    <hr />
                    <div className={styles.days}>
                        {days.map(day => <Day key={day.date} data={day} />)}
                    </div>
                </div>
            )
        default:
            return <Error location={location} deleteCity={() => deleteCity(location)} />
    }
}

export default City;