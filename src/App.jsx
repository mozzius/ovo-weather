import React from 'react';
import styles from './App.module.css';
import City from './components/City'

function App() {
    // the <City /> is self-contained, so you could have more than one if you
    // wanted to
    // You would probably pass it a name or co-ordinates or something from here
    return (
        <div className={styles.appContainer}>
            <div className={styles.app}>
                <City />
            </div>
        </div>
    );
}

export default App;
