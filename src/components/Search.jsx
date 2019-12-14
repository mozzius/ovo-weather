import React, { useState } from 'react'
import styles from './Search.module.css'

const Search = ({ onSubmit }) => {
    const [value, setValue] = useState('')

    return (
        <form className={styles.form} onSubmit={e => {
            e.preventDefault()
            // only delete value if it gets submitted
            onSubmit(value.trim().toLowerCase()) || setValue('')
        }}>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                className={styles.text}
            />
            <input
                type="submit"
                value="Add City"
                className={styles.button}
            />
        </form>
    )
}

export default Search