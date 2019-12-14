import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import City from './components/City'
import Search from './components/Search';

function App() {
    const [cities, setCities] = useState(JSON.parse(window.localStorage.getItem('cities')) || [])

    // obviously cities have to be unique for this to work,
    // so in the <Search /> onSubmit function I only add a new city if it's unique
    // this has the added benefit of using the city name as a key
    const deleteCity = city => {
        setCities(cities.filter(name => name !== city))
    }

    // save the cities in localStorage every time cities changes
    useEffect(() => {
        window.localStorage.setItem('cities', JSON.stringify(cities))
    }, [cities])

    return (
        <div className={styles.appContainer}>
            <div className={styles.app}>
                <h1 className={styles.title}>5 Day Weather Forecast</h1>
                <Search onSubmit={city => cities[city] === undefined ? setCities([...cities, city]) : null} />
                {cities.map(city => {
                    return (
                        <City
                            location={city}
                            key={city}
                            deleteCity={deleteCity}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
