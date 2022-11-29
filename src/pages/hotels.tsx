import React, {useContext, useEffect, useState} from 'react';
import clsx from "clsx";
import useFetch from "../hooks/useFetch";
import SearchItems from "../components/searchItems";
import {DatesProps, HotelType} from "../type";
import {SearchContext} from "../context/SearchConext";
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {FaCalendarAlt} from "react-icons/fa";
import {format} from "date-fns";
import {useSearchParams} from "react-router-dom";



const Hotels = () => {
    const {dates: ctxDate} = useContext(SearchContext)
    const [openDate, setOpenDate] = useState<boolean>(false);
    let [searchParams, setSearchParams] = useSearchParams();


    const [dates, setDates] = useState<DatesProps[]>([{
        startDate: ctxDate[0].startDate,
        endDate: ctxDate[0].endDate,
        key: "selection",
    },
    ]);


    const [query, setQuery] = useState<any>({
        city: "" ,
        // date: dates || searchParams.get("date"),
        min: "" || searchParams.get("min"),
        max: "" || searchParams.get("max") ,
        // adult: 0 || searchParams.get("adult") ,
        // children: 0 || searchParams.get("children"),
        // room: 0 || searchParams.get("room"),
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e?.target
        setQuery({...query, [name]: value})
    }

    useEffect(() => {
        let obj: any = { city:  searchParams.get("city")}
        Object.entries(query).forEach(el => {
             if (el[1]) Object.assign(obj, {[el[0]]: el[1]});
        })
        setSearchParams(obj)
    },[query])

    const {
        data,
        loading,
        reFetch
    } = useFetch(`/hotels?city=${query.city || searchParams.get("city")}&min=${query.min || 0}&max=${query.max || 999}`);



    const handleClick = () => {
        reFetch();
    };


    return (
        <section className={clsx("container", "hotels")}>
            <aside className="hotels-left-nav">
                <h2>Search</h2>
                <div className="hotels-flex-col">
                    <label
                        className="hotels-title"
                        htmlFor="city"
                    >
                        Direction
                    </label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        value={query['city'] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="hotels-flex-col">
                    <label
                        className="hotels-title"
                        htmlFor="date"
                    >
                        Check-in Date
                    </label>
                    {/*     Date    */}
                    <div
                        onClick={() => setOpenDate(!openDate)}
                        className="hotels-search-data"
                    >
                        <FaCalendarAlt />
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
                            className="hotels-search-box"
                            minDate={new Date()}
                        />
                    )}
                </div>

                <h4>Option</h4>
                <div className="hotels-option">
                    <label htmlFor="minPrice">Min price per night</label>
                    <input
                        id="minPrice"
                        type="number"
                        name="min"
                        min={1}
                        value={query['min'] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="hotels-option">
                    <label htmlFor="maxPrice">Max price per night</label>
                    <input
                        id="maxPrice"
                        type="number"
                        name="max"
                        min={50}
                        value={query['max'] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="hotels-option">
                    <label htmlFor="adult">Adult</label>
                    <input
                        id="adult"
                        type="number"
                        name="adult"
                        min={1}
                        value={query['adult'] || 1}
                        onChange={handleChange}
                    />
                </div>
                <div className="hotels-option">
                    <label htmlFor="children">Children</label>
                    <input
                        id="children"
                        type="number"
                        name="children"
                        min={0}
                        value={query['children'] || 0}
                        onChange={handleChange}
                    />
                </div>
                <div className="hotels-option">
                    <label htmlFor="room">Room</label>
                    <input
                        id="room"
                        type="number"
                        name="room"
                        min={1}
                        value={query['room'] || 1}
                        onChange={handleChange}
                    />
                </div>

                <div className="hotels-button">
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