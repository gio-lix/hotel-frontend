import React, {ChangeEvent, SyntheticEvent, useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "../axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const { dispatch} = useContext(AuthContext)
    const navigate = useNavigate()
    const [credential, setCredential] = useState({
        name: undefined,
        password: undefined
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredential((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch({type: "LOGIN_LOADING"})
        try {
            const {data} = await axios.post("/auth/login", credential)
            dispatch({type: "LOGIN_SUCCESS", payload: data})
            navigate("/")
        } catch (err) {
            dispatch({type: "LOGIN_ERROR", payload: "error"})
        }
    }

    return (
        <section className='container'>
            <div className="login">
                <label htmlFor="name">username</label>
                <input
                    type="text"
                    id="name"
                    onChange={handleChange}
                    value={credential["name"] || ""}
                />

                <label htmlFor="password">username</label>
                <input
                    type="text"
                    id="password"
                    onChange={handleChange}
                    value={credential["password"] || ""}
                />
                <button onClick={handleClick}>login</button>

            </div>
        </section>
    );
};

export default Login;