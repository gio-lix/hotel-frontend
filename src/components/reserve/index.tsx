import React, {FC, useContext, useState} from 'react';
import useFetch from "../../hooks/useFetch";
import s from './Reserved.module.scss'
import {AiOutlineClose} from "react-icons/ai"
import {RoomNumberType, RoomType} from "../../type";
import {SearchContext} from "../../context/SearchConext";
import clsx from "clsx";
import axios from "../../axios";

interface Props {
    setOpen: Function
    hotelId: any
}

const Reserved: FC<Props> = ({ setOpen,hotelId}) => {
    const [selectedRoom, setSelectedRoom] = useState<any>([])
    const {data} = useFetch(`/hotels/room/${hotelId}`)
    const {dates} = useContext(SearchContext)

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRoom(checked
            ? [...selectedRoom, value]
            : selectedRoom.filter((item: any) => item !== value)
        )
    }



    const getDatesInRange = (startDate: Date, endDate: Date) => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        let list = []

        while (start <= end) {
            list.push(new Date(start).getTime())
            start.setDate(start.getDate() + 1)
        }

        return list
    }

    const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

    const isAvailable = (roomsNumbers: RoomNumberType): boolean => {
        const isFound = roomsNumbers.unavailableDates?.some((date: any) => (
            allDates.includes(new Date(date).getTime())
        ))
        return !isFound
    }

    const handleClick = async () => {
        try {
            await Promise.all(selectedRoom.map((roomId: string) => {
                const {data}: ReturnType<any> = axios.put(`/rooms/availability/${roomId}`, {dates: allDates})
                return data
            }))
            setOpen(false)
        } catch (err) {

        }
    }
    return (
        <section className={clsx(s.root,data.length > 3 && s.scroll)}>
            <button className={s.buttonClose} onClick={() => setOpen(false)}>
                <AiOutlineClose />
            </button>
            <h1>Rooms</h1>
            {data && (
                <article>
                    {data?.map((room: RoomType) => {
                        return (
                            <div className={clsx(s.cartBox,)} key={room._id}>
                                <div className={s.cartBox_left}>
                                    <h3>{room.title}</h3>
                                    <p>{room.desc}</p>
                                    <p>Max People: {room.maxPeople}</p>
                                    <p>{room.price}</p>
                                </div>
                                <div className={s.cartBox_right}>
                                    {room.roomNumber?.map((item: RoomNumberType) => {
                                        return (
                                            <div key={item._id}>
                                                <label>{item.number}</label>
                                                <input
                                                    type="checkbox"
                                                    value={item._id}
                                                    onChange={handleSelect}
                                                    disabled={!isAvailable(item)}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </article>
            )}
            <button className={s.button}  onClick={handleClick}>Reserve Now</button>
        </section>
    );
};

export default Reserved;