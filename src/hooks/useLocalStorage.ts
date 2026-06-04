import { useState, useEffect } from "react"


export const useLocalStorage = <T>(key: string, init: T) => {

    const [storedData, setStoredData] = useState(() => {

        const local = localStorage.getItem(key)
        return local ? JSON.parse(local) as T : init

    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedData))
    }, [key, storedData])


    return { storedData, setStoredData }

}