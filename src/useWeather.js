import { useState, useEffect } from 'react'

const useWeather = (url) => {
    const [weather, setWeather] = useState({ type: 'loading', data: null })

    const getWeatherData = async (url) => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setWeather({ type: 'success', data })
        } catch (e) {
            setWeather({ type: 'error', data: e })
        }
    }

    useEffect(() => {
        getWeatherData(url)
    }, [url])

    return weather
}

export default useWeather