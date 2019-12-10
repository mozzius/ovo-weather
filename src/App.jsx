import React from 'react';
import styles from './App.css';
import City from './components/City'
import useWeather from './useWeather'

function App() {
    const weather = useWeather('https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22')

    return (
        <div className={styles.appContainer}>
            <div className={styles.app}>
                <City weather={weather} />
            </div>
        </div>
    );
}

export default App;
