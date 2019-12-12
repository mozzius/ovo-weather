import React from 'react'
import styles from './City.module.css'
import Day from './Day'
import useWeather from '../hooks/useWeather'

const City = () => {
    // in a real app you'd probably receive this url from props
    const url = 'samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22'
    // I was getting Cross-Origin Resource Sharing errors
    // so I used this rather hacky service to get the data
    const { type, data } = useWeather('https://cors-anywhere.herokuapp.com/' + url)
    // In a real app I'd pass it through a backend or perhaps use some
    // fancy serverless functions but that's a little out of scope for this

    // returns something different depending on what type
    // of data the hook returns
    switch (type) {
        case 'loading':
            return (
                <div className={styles.city}>
                    <h1>Loading...</h1>
                </div>
            )
        case 'success':
            // split the list into days
            let days = []
            let currentDate = null
            data.list.forEach(day => {
                const date = day.dt_txt.split(' ')[0]
                if (date !== currentDate) {
                    currentDate = date
                    days.push({
                        date,
                        weather: [day.weather[0].main],
                        maxTemp: Math.floor(day.main.temp_max - 273.15),
                        humidity: [day.main.humidity]
                    })
                } else {
                    let current = days[days.length - 1]
                    let temp = Math.floor(day.main.temp_max - 273.15)

                    current.weather.push(day.weather[0].main)
                    current.humidity.push(day.main.humidity)

                    days[days.length - 1] = {
                        ...current,
                        maxTemp: temp > current.maxTemp ? temp : current.maxTemp
                    }
                }
            })

            // make sure it's only 5 days
            days = days.slice(0, 5)

            // average the humidities etc
            days = days.map(day => {
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

            return (
                <div className={styles.city}>
                    <h1>{data.city.name}</h1>
                    <hr />
                    <div className={styles.days}>
                        {days.map(day => <Day key={day.date} data={day} />)}
                    </div>
                </div>
            )
        default:
            return (
                <div className={styles.city}>
                    <h1>Error!</h1>
                </div>
            )
    }
}

export default City;