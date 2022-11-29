import {useEffect, useState} from "react";
import axios from "../axios"
import {HotelType} from "../type";

export interface State {
    data: HotelType
    loading: boolean
    error: any
}

export const useFetch = (url: string): any => {
    const [data, setData] = useState<HotelType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const {data} = await axios.get(url)
                setData(data)
            } catch (err:any) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get(url)
            setData(data)
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }


    return {data, loading, error, reFetch}
}

export default useFetch

