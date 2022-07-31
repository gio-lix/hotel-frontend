import React, {FC} from 'react';
import s from './ResponsiveSearch.module.scss'
import {DateRange} from "react-date-range";
import {DatesProps} from "../../type";
import {FaCalendarAlt} from "react-icons/fa";
import {format} from "date-fns";
import clsx from "clsx";

interface Props {
    openBurger: boolean
    dates: DatesProps[]
    setDates: Function
    setOpenDate: Function
    handleOption: Function
    openDate: boolean
    handleSearch: Function
    options: any
    destination: string
    setDestination: any
}


const ResponsiveSearch: FC<Props> = ({
                                         setDates,
                                         handleOption,
                                         dates,
                                         setOpenDate,
                                         openDate,
                                         options,
                                         openBurger,
                                         handleSearch,
                                         destination,
                                         setDestination
                                     }) => {
    return (
        <div className={s.root}>
            {openBurger ? (
                    <>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            value={destination}
                            className={s.destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        <div className={clsx(s.box, s.openDate)} onClick={() => setOpenDate(!openDate)}>
                            <FaCalendarAlt className={s.Icon}/>
                            {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            {openDate && (
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDates([item.selection] as DatesProps[])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className={s.takeDate}
                                    minDate={new Date()}
                                />
                            )}

                        </div>

                        <div className={s.listOfBox}>
                            <div>

                                <div>
                                    <button disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>
                                        -
                                    </button>
                                    <div>
                                        <span>Adult</span>
                                        <span>{options.adult}</span>
                                    </div>
                                    <button onClick={() => handleOption("adult", "i")}>
                                        +
                                    </button>
                                </div>
                            </div>
                            {/*    adult    */}
                            <div>

                                <div>
                                    <button disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>
                                        -
                                    </button>
                                    <div>
                                        <span>Children</span>
                                        <span>{options.children}</span>
                                    </div>

                                    <button
                                        onClick={() => handleOption("children", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            {/*    room    */}
                            <div>
                                <div >
                                    <button disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>
                                        -
                                    </button>
                                    <div>
                                        <span>Room</span>
                                        <span >{options.room}</span>
                                    </div>

                                    <button onClick={() => handleOption("room", "i")}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className={s.searchButton} onClick={() => handleSearch()}>Search</button>


                    </>
            ) : null}
        </div>
    );
};

export default ResponsiveSearch;