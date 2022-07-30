import React from 'react';
import useFetch from "../../hooks/useFetch";
import s from './FeatureProperties.module.scss'
import {HotelType} from "../../type";
import {useNavigate} from "react-router-dom"


const FeatureProperties = () => {
    const navigate = useNavigate()
    const {data, loading} = useFetch("/hotels?featured=false&limit=4");

    const onHandleClick = (id: string) => {
        navigate(`/hotels/${id}`)
    }


    return (
        <section className={s.root}>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    {data.slice(0, 4).map((item: HotelType) => {
                        return (
                            <div onClick={() => onHandleClick(item._id)} key={item._id} className={s.box}>
                                <figure className={s.imageBox}>
                                    <img
                                        src={item.photos[0] ? "" : "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"}
                                        alt="img"
                                    />
                                </figure>
                                <span>{item.name}</span>
                                <span>{item.city}</span>
                                <span>Starting from ${item.cheapestPrice}</span>
                            </div>
                        )
                    })}
                </>
            )}

        </section>
    );
};

export default FeatureProperties;