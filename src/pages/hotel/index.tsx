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
import {AiOutlineLeft, AiOutlineClose} from "react-icons/ai"

const images = [
    {
        id: 1,
        image: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/311380531.jpg?k=c46a39458dac7e0d19305f6d7dc00600d97665653f681d220da2378f57b67d0e&o=&hp=1"
    },
    {
        id: 2,
        image: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/311380580.jpg?k=5166c66040aa77067178a5b560e41e7bce09ade8e90e5b4d55935693b0cd2cce&o=&hp=1"
    },
    {
        id: 3,
        image: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/311387531.jpg?k=70cc118cbf4f40a207734fdc552a664a9a3763489c04e7337da44bda49f56d7c&o=&hp=1"
    },
    {
        id: 4,
        image: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/311380534.jpg?k=34f9ea66ced312003430baa1cd367b158245ce70067c1815520d90b91607db3c&o=&hp=1"
    },
]

const Hotel = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [activeImage, setActiveImage] = useState(false)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
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

    const onHandleImageClick = (id: number) => {
        if (window.innerWidth < 1024) return

        setActiveImage(true)
        setActiveImageIndex(id)
    }


    const onHandleChangeIndex = (item: string) => {
        if (item === "plus") {
            if (activeImageIndex === images.length - 1) return
            setActiveImageIndex(prev => prev + 1)
        }
        if (item === "minus") {
            if (activeImageIndex === 0) return
            setActiveImageIndex(prev => prev - 1)
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
            <div className={clsx('flex', s.box)}>
                {activeImage ? (
                    <div className={s.activeImage}>
                        <img src={images[activeImageIndex].image} alt="images"/>
                        <span className={s.cansel} onClick={() => setActiveImage(false)}>
                            <AiOutlineClose />
                        </span>
                        <div className={s.imageButton}>
                            <button onClick={() => onHandleChangeIndex("minus")}>
                                <AiOutlineLeft />
                            </button>
                            <button onClick={() => onHandleChangeIndex("plus")}>
                                <AiOutlineLeft className={s.rotate}/>
                            </button>
                        </div>
                    </div>
                ) : null}
                <div className={s.grid} style={{flexGrow: 1}}>
                    {images?.map((img, index) => (
                        <div key={img.id} onClick={() => onHandleImageClick(index)}>
                            <img  src={img.image} alt="image"/>
                        </div>
                    ))}
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