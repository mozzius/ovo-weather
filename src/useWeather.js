import { useState, useEffect } from 'react'

const useWeather = (url) => {
    const [weather, setWeather] = useState({ type: 'loading', data: null })

    const getWeatherData = async (url) => {
        try {
            const res = await fetch(url, {
                mode: 'no-cors'
            })
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("Oops, we haven't got JSON!");
            }
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