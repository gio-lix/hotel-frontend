import React from 'react';
import {IconType} from 'react-icons';
import s from "./PropertyNav.module.scss"
import clsx from "clsx";

interface Props {
    Icon: IconType
    text: string
    active?: boolean
}


const PropertyNav = ({text, Icon, active}: Props) => {


    return (
        <div className={clsx(s.IconBox, active && s.active  )}>
            <span>
                {<Icon/>}
            </span>
            <p>
                {text}
            </p>
        </div>
    );
};

export default PropertyNav;