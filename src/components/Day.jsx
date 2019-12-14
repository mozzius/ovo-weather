import React from 'react'
import styles from './Day.module.css'

const Day = ({ data }) => {
    // convert date from ISO-8601 to normal
    // looks like something like 2017-01-30 beforehand
    const date = data.date.split('-').reverse().join('/')
    return (
        <div className={styles.day}>
            <p className={styles.date}>{date}</p>
            <h3>{data.weather}</h3>
            <p>Max temp: {data.maxTemp}°C</p>
            <p>Humidity: {data.humidity}%</p>
        </div>
    )
}

export default Day