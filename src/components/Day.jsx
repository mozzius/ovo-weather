import React from 'react'
import styles from './Day.module.css'

const Day = ({ data }) => {
    return (
        <div className={styles.day}>
            <h2>{data.weather[0].main}</h2>
            <p>Max: {Math.floor(data.main.temp_max - 273.15)}°C</p>
            <p>Min: {Math.floor(data.main.temp_min - 273.15)}°C</p>
        </div>
    )
}

export default Day