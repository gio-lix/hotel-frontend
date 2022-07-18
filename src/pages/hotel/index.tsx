import React, {useContext, useState} from 'react';
import useFetch, {State} from '../../hooks/useFetch';
import {useParams} from "react-router-dom";
import {ImLocation} from "react-icons/im"
import {useNavigate} from "react-router-dom"
import s from "./Hotel.module.scss"
import clsx from "clsx";
import {SearchContext} from "../../context/SearchConext";
import {AuthContext} from "../../context/AuthContext";
import Reserved from "../../components/reserve";

const Hotel = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { data }: State = useFetch(`/hotels/find/${id}`);


    const { dates, options } = useContext(SearchContext);
    const {user} = useContext(AuthContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    const dayDifference = (date1: Date, date2: Date): number => {
        const timeDiff: number = Math.abs(date2.getTime() - date1.getTime())
        const diffDay: number = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDay
    }


    const days = dayDifference(dates[0].startDate, dates[0].endDate)
    const price = (options.room * days * data.cheapestPrice).toFixed(2)

    const handleClick = () => {
        if (user) {
            setOpenModal(!openModal)
        } else {
            navigate("/login")
        }
    }


    return (
        <section className={clsx('container', s.root)}>
            <article className={s.articleBox}>
                <h1>{data.name}</h1>
                <div className={s.articleBox_location}>
                    <span>
                        <ImLocation />
                    </span>
                    <address>{data.address}</address>
                </div>
                <h4>Book a stay over $144 at this property and get a free airport taxi</h4>
                <button>Reserve or Book Now!</button>
            </article>
            <div className='flex'>
                <div className={s.grid} style={{flexGrow: 1}}>
                    <div>
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                            alt="img"
                        />
                    </div>
                    <div>
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                            alt="img"
                        />
                    </div>
                    <div>
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                            alt="img"
                        />
                    </div>
                    <div>
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                            alt="img"
                        />
                    </div>
                </div>
                <aside className={s.dateLengthBox}>
                    <h3>
                        Perfect for a {days}-nights stay!
                    </h3>
                    <h5>
                        Located in the real heart of know tbilisi, this property has an excellent
                        location score of 9.8
                    </h5>
                    <div>
                        <p>${price}</p>
                        <span>({days} nights)</span>
                    </div>
                    <button onClick={() => handleClick()}>Reserve or book now</button>
                </aside>
            </div>

            {openModal && (
                 <Reserved  setOpen={setOpenModal} hotelId={id}/>
            )}
        </section>
    );
};

export default Hotel;