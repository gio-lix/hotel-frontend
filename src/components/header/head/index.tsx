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
import {GiHamburgerMenu} from "react-icons/gi"
import PropertyNav from "../propertyNav";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {DatesProps, OptionProps} from "../../../type";
import {AuthContext} from "../../../context/AuthContext";
import ResponsiveSearch from "../../responsiveSearch";

const helps = [
    {id: 1, text: "bed", Icon: FaBed},
    {id: 2, text: "airport", Icon: IoIosAirplane},
    {id: 3, text: "car", Icon: AiFillCar},
    {id: 4, text: "fun", Icon: MdAttractions},
    {id: 5, text: "tax", Icon: RiTaxiWifiFill},
]
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation()
    let pathname = location.pathname === "/login" || location.pathname === "/register"

    const {user} = useContext(AuthContext)

    const path = location.pathname === "/"

    const [isFixed, setIsFixed] = useState<boolean>(false);
    const categoriesRef = useRef<HTMLDivElement | null>(null);
    const [openDate, setOpenDate] = useState<boolean>(false);
    const [openBurger, setOpenBurger] = useState<boolean>(false)
    const [destination, setDestination] = useState<string>("")
    const [activeIndex, setActiveIndex] = useState<string>(helps[0].text)


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
    const lockScroll = () => {
        document.body.style.overflow = 'hidden'
    }
    const unlockScroll = () => {
        document.body.style.overflow = ''
    }
    const onHandleClickScroll = () => {
        if (openBurger) {
            lockScroll()
            window.scrollTo(0, 0);
        } else {
            unlockScroll()
        }
    }
    useEffect(() => {
        window.addEventListener('click', onHandleClickScroll)
        return () => window.removeEventListener("click", onHandleClickScroll)
    }, [openBurger])

    const handleSearch = () => {
        setOpenBurger(false)
        setDestination("")
        navigate(`/hotels?city=${destination}`);
    };




    return (
        <header ref={categoriesRef} className={clsx(s.root, !path && s.homePath, pathname && s.pageSignUp)}>
            <section className={clsx(openBurger ? s.openMenu : s.closeMenu)}>
                <ResponsiveSearch
                    options={options}
                    handleOption={handleOption}
                    openBurger={openBurger}
                    setDates={setDates}
                    dates={dates}
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    handleSearch={handleSearch}
                    destination={destination}
                    setDestination={setDestination}
                />
            </section>
            <section className={clsx("container", s.head, path && (isFixed && s.fix), pathname && s.pageSignUp)}>
                <div className={s.burger}>
                    <div className={clsx(openBurger && s.openBurgerMenu)} onClick={() => setOpenBurger(!openBurger)}>
                        <GiHamburgerMenu/>
                    </div>
                </div>
                <p className={s.logo} onClick={() => navigate("/")}>LOGO</p>
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
                                <p className={s.user}>{user.email}</p>
                                <li>
                                    <Link to={"/"}>
                                        logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                </nav>
            </section>
            <div className={clsx("container", s.icons, !path && s.propertyPath)}>
                {pathname ? null : (
                    <>
                        {helps?.map(ele => (
                            <PropertyNav
                                key={ele.id}
                                activeIndex={setActiveIndex}
                                active={activeIndex === ele.text && true}
                                Icon={ele.Icon}
                                text={ele.text}
                            />
                        ))}
                    </>
                )}
            </div>
            {path ? (
                <>
                    <p className={clsx('container', s.title)}>
                        A lifetime of discount? it's Genius
                    </p>
                    <p className={clsx('container', s.descTitle)}>
                        Get rewarded for your travel-unlock instant saving of 10% or more with a free booking account
                    </p>
                    <section className={clsx(s.box, isFixed && s.visible)}>
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
                                        <button disabled={options.adult <= 1}
                                                onClick={() => handleOption("adult", "d")}>
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
                                        <button disabled={options.children <= 0}
                                                onClick={() => handleOption("children", "d")}>
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
                                    <div>
                                        <button disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>
                                            -
                                        </button>
                                        <span>{options.room}</span>
                                        <button onClick={() => handleOption("room", "i")}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSearch}>Search</button>
                        </div>
                    </section>
                </>
            ) : null}
        </header>
    );
};

export default Header;