import useFetch from "../../hooks/useFetch";
import s from "./Features.module.scss"
import clsx from "clsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import {useEffect} from "react";

const category = [
    {id: 1, name: "Berlin", image: "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="},
    {id: 2, name: "Madrid", image: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="},
    {id: 3, name: "London", image: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="}
]

const Featured = () => {
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const {data, loading} = useFetch("/hotels/countByCity?cities=berlin,madrid,london");
    const page = searchParams.get("city")

    useEffect(() => {
        if (page) {
            navigate("/hotels?city=" + searchParams.get("city"));
        }
    },[page])

    const onHandleClick = (item: string) => {
        setSearchParams({"city": item.toLowerCase()})
    }


    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : (
                <section className={clsx(s.feature)}>
                    {category.map((item, index: number) => (
                        <div key={item.name} onClick={() => onHandleClick(item.name)}>
                            <img
                                src={item.image}
                                alt={item.name}
                            />
                            <div  className={s.titleBox}>
                                <h1>{item.name}</h1>
                                <h2>{data[index]} properties</h2>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>

    );
};

export default Featured;