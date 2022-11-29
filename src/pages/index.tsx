import React from 'react';
import Featured from "../components/featured";
import PropertyList from "../components/propertyList";
import FeatureProperties from "../components/featureProperties";

const Index = () => {
    return (
        <div className='container' >
            <Featured />
            <h2 className="home-title"> Browse by property type </h2>
            <PropertyList />
            <h2 className="home-title"> Homes guests love </h2>
            <FeatureProperties/>
        </div>
    );
};

export default Index;