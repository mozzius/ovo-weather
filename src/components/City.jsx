import React from 'react'
import styles from './City.module.css'

const Day = ({ data }) => {
    return (
        <div className={styles.day}>
            <h2>{data.weather[0].main}</h2>
            <p>Max: {Math.floor(data.main.temp_max - 273.15)}°C</p>
            <p>Min: {Math.floor(data.main.temp_min - 273.15)}°C</p>
        </div>
    )
}

const City = ({ weather }) => {
    const { type, data } = weather

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
            console.log(data)
            return (
                <div className={styles.city}>
                    <h1>{data.city.name}</h1>
                    <hr />
                    <div className={styles.days}>
                        {data.list.slice(0, 5).map(day => {
                            return <Day key={day.dt} data={day} />
                        })}
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