import React from 'react';
import {HotelType} from "../../type";
import s from "./SearchItems.module.scss"
import {useNavigate} from "react-router-dom";

interface Props  {
    items: HotelType
}

const SearchItems = ({ items: {_id,name,address,cheapestPrice,city,distance,featured,photos,rooms,type,desc}   }: Props) => {

    const navigate = useNavigate()

    return (
        <section className={s.root}>
            <div className={s.imageBox}>
                <img
                    src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                    alt="img"
                />
            </div>
            <article className={s.info}>
                <div className={s.info_box}>
                    <h2 className={s.info_name}>{name}</h2>
                    <h5 className={s.info_address}>{address}</h5>
                    <button className={s.info_button}>Free airport</button>
                    <h4 className={s.info_additional_info}>Studio Apartment with Air conditioning</h4>
                    <p className={s.info_desc}>{desc}</p>
                    <h5 className={s.info_cancel}>Free cancellation</h5>
                    <h5>Free cancellation</h5>
                </div>
                <div className={s.info_price_box}>
                    <p>${cheapestPrice}</p>
                    <h5>includes taxes and fees</h5>
                    <button onClick={() => navigate(`/hotels/${_id}`)}>see availability</button>
                </div>
            </article>
        </section>
    );
};

export default SearchItems;