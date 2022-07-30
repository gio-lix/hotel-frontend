import React, {useContext, useEffect, useRef, useState} from 'react';
import s from "./Header.module.scss"
import clsx from "clsx";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {FaBed} from "react-icons/fa"
import {IoIosAirplane} from "react-icons/io"
import {AiFillCar} from "react-icons/ai"
import {MdAttractions} from "react-icons/md"
import {RiTaxiWifiFill} from "react-icons/ri"
import {FaCalendarAlt} from "react-icons/fa"
import PropertyNav from "../propertyNav";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {DatesProps, OptionProps} from "../../../type";
import {AuthContext} from "../../../context/AuthContext";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const {user} = useContext(AuthContext)

    const path = location.pathname === "/"

    const [isFixed, setIsFixed] = useState<boolean>(false);
    const categoriesRef = useRef<HTMLDivElement | null>(null);
    const [openDate, setOpenDate] = useState<boolean>(false);
    const [destination, setDestination] = useState<string>("")


    const [options, setOptions] = useState<any>({
        adult: 1,
        children: 0,
        room: 1,
    });

    const [dates, setDates] = useState<DatesProps[]>([{
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);



    const handleOption = (name: string, operation: string) => {
        setOptions((prev: OptionProps) => {
            return {...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1};
        });
    };


    useEffect(() => {
        if (!categoriesRef.current) return
        window.addEventListener("scroll", () => {
            if (!categoriesRef.current) return
            if (300 < window.scrollY) {
                setIsFixed(true);
            } else {
                setIsFixed(false)
            }
        })
    }, [])

    const handleSearch = () => {
        navigate(`/hotels?city=${destination}`);
    };

    return (
        <header ref={categoriesRef} className={clsx(s.root, !path && s.homePath)}>
            <div className={clsx("container", s.head, path && (isFixed && s.fix))}>
                <p onClick={() => navigate("/")}>LOGO</p>
                <nav>
                    <ul>
                        {!user ? (
                                <>
                                    <li>
                                        <Link to={"/login"}>
                                            login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/register"}>
                                            Register
                                        </Link>
                                    </li>
                                </>
                        ) : (
                            <>
                                <p>{user.email}</p>
                                <li>
                                    <Link to={"/"}>
                                        logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                </nav>
            </div>
            <div className={clsx("container", s.icons, !path && s.propertyPath)}>
                <PropertyNav active={true} Icon={FaBed} text={"text"}/>
                <PropertyNav Icon={IoIosAirplane} text={"text"}/>
                <PropertyNav Icon={AiFillCar} text={"text"}/>
                <PropertyNav Icon={MdAttractions} text={"text"}/>
                <PropertyNav Icon={RiTaxiWifiFill} text={"text"}/>
            </div>
            {path ? (
                <>
                    <p className={clsx('container', s.title)}>
                        A lifetime of discount? it's Genius
                    </p>
                    <p className={clsx('container')}>
                        Get rewarded for your travel-unlock instant saving of 10% or more with a free booking account
                    </p>
                    <div className={clsx(s.box, isFixed && s.visible)}>
                        <div className={clsx('container flex', s.headerSearchBox)}>
                            {/*     hotel    */}
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />

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
                           <div className={s.optionCountBox}>
                               {/*     adult   */}
                               <div>
                                   <span>Adult</span>
                                   <div>
                                       <button disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>
                                           -
                                       </button>
                                       <span>{options.adult}</span>
                                       <button onClick={() => handleOption("adult", "i")}>
                                           +
                                       </button>
                                   </div>
                               </div>
                               {/*    adult    */}
                               <div>
                                   <span>Children</span>
                                   <div>
                                       <button disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>
                                           -
                                       </button>
                                       <span>{options.children}</span>
                                       <button
                                           onClick={() => handleOption("children", "i")}
                                       >
                                           +
                                       </button>
                                   </div>
                               </div>
                               {/*    room    */}
                               <div>
                                   <span>Room</span>
                                   <div >
                                       <button disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>
                                           -
                                       </button>
                                       <span >{options.room}</span>
                                       <button onClick={() => handleOption("room", "i")}>
                                           +
                                       </button>
                                   </div>
                               </div>
                           </div>
                           <button onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </>
            ) : null}
        </header>
    );
};

export default Header;