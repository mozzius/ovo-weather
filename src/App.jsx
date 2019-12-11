import React from 'react';
import styles from './App.module.css';
import City from './components/City'
import useWeather from './hooks/useWeather'

function App() {
    const url = 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22'
    // I was getting Cross-Origin Resource Sharing errors
    // so I used this rather hacky service to get the data
    const weather = useWeather('https://cors-anywhere.herokuapp.com/' + url)
    // In a real app I'd pass it through a backend or perhaps use some
    // fancy serverless functions but that's a little out of scope for this

    // the <City /> is self-contained, so you could have more than one if you
    // wanted to
    return (
        <div className={styles.appContainer}>
            <div className={styles.app}>
                <City weather={weather} />
            </div>
        </div>
    );
}

export default App;
