import React, {useContext, useState} from 'react';
import s from "./Hotels.module.scss"
import clsx from "clsx";
import useFetch from "../../hooks/useFetch";
import SearchItems from "../../components/searchItems";
import {DatesProps, HotelType} from "../../type";
import {SearchContext} from "../../context/SearchConext";
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {FaCalendarAlt} from "react-icons/fa";
import {format} from "date-fns";

interface SearchProps {
    direction: string
    date: DatesProps[]
    min: string
    max: string
    adult: number
    children: number
    room: number
}

const Hotels = () => {
    const {options, dates: ctxDate, destination} = useContext(SearchContext)
    const [openDate, setOpenDate] = useState<boolean>(false);


    const [dates, setDates] = useState<DatesProps[]>([{
        startDate: ctxDate[0].startDate,
        endDate: ctxDate[0].endDate,
        key: "selection",
    },
    ]);
    const [values, setValues] = useState({
        direction: destination,
        date: dates,
        min: "",
        max: "",
        adult: options.adult,
        children: options.children,
        room: options.room
    } as SearchProps)

    const {
        data,
        loading,
        reFetch
    } = useFetch(`/hotels?city=${values.direction}&min=${values.min || 0}&max=${values.max || 999}`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {value, name} = e?.target
        setValues({...values, [name]: value})
    }


    const handleClick = () => {
        reFetch();
    };


    return (
        <section className={clsx("container", s.root)}>
            <aside className={s.leftNav}>
                <h2>Search</h2>
                <div className={s.flexCol}>
                    <label
                        className={s.title}
                        htmlFor="direction"
                    >
                        Direction
                    </label>
                    <input
                        id="direction"
                        type="text"
                        name="direction"
                        value={values['direction'] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className={s.flexCol}>
                    <label
                        className={s.title}
                        htmlFor="date"
                    >
                        Check-in Date
                    </label>
                    {/*     Date    */}
                    <div
                        onClick={() => setOpenDate(!openDate)}
                        className={s.searchDate}
                    >
                        <FaCalendarAlt className={s.Icon}/>
                        {`
                                ${format(dates[0].startDate, "MM/dd/yyyy")}
                                 to 
                                 ${format(dates[0].endDate, "MM/dd/yyyy")}`
                        }
                    </div>
                    {openDate && (
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDates([item.selection] as DatesProps[])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className={s.searchBox}
                            minDate={new Date()}
                        />
                    )}
                </div>

                <h4>Option</h4>
                <div className={s.option}>
                    <label htmlFor="minPrice">Min price per night</label>
                    <input
                        id="minPrice"
                        type="number"
                        name="min"
                        min={1}
                        value={values['min']}
                        onChange={handleChange}
                    />
                </div>
                <div className={s.option}>
                    <label htmlFor="maxPrice">Max price per night</label>
                    <input
                        id="maxPrice"
                        type="number"
                        name="max"
                        min={50}
                        value={values['max']}
                        onChange={handleChange}
                    />
                </div>
                <div className={s.option}>
                    <label htmlFor="adult">Adult</label>
                    <input
                        id="adult"
                        type="number"
                        name="adult"
                        min={1}
                        value={values['adult'] || 1}
                        onChange={handleChange}
                    />
                </div>
                <div className={s.option}>
                    <label htmlFor="children">Children</label>
                    <input
                        id="children"
                        type="number"
                        name="children"
                        min={0}
                        value={values['children'] || 0}
                        onChange={handleChange}
                    />
                </div>
                <div className={s.option}>
                    <label htmlFor="room">Room</label>
                    <input
                        id="room"
                        type="number"
                        name="room"
                        min={1}
                        value={values['room'] || 1}
                        onChange={handleChange}
                    />
                </div>

                <div className={s.button}>
                    <button onClick={handleClick} type="submit">Search</button>
                </div>
            </aside>
            <div>
                {loading ? (
                    <p>Loading</p>
                ) : (
                    <>
                        {data.map((item: HotelType) => <SearchItems items={item} key={item._id}/>)}
                    </>
                )}
            </div>
        </section>
    );
};

export default Hotels;