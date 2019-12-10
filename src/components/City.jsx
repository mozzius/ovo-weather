import React from 'react'

const City = ({ weather }) => {
    const { type, data } = weather
    switch (type) {
        case 'loading':
            return <p>Loading...</p>
        case 'error':
            console.error(data)
            return <p>Error!</p>
        case 'success':
            console.log(data)
            return <h1>{data.city}</h1>
        default:
            return <p>Something's gone badly wrong...</p>
    }
}

export default City;