import React from 'react';
import Featured from "../../components/featured";
import PropertyList from "../../components/propertyList";
import FeatureProperties from "../../components/featureProperties";
import s from "./Home.module.scss"

const Home = () => {
    return (
        <div className='container' >
            <Featured />
            <h2 className={s.title}> Browse by property type </h2>
            <PropertyList />
            <h2 className={s.title}> Homes guests love </h2>
            <FeatureProperties/>
        </div>
    );
};

export default Home;