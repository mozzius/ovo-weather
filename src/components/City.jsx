import React from 'react'
import styles from './City.module.css'
import Day from './Day'
import useWeather from '../hooks/useWeather'

const City = () => {
    // in a real app you'd probably receive this url from props
    const url = 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22'
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