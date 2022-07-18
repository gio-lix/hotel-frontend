import React from 'react';
import s from "./Footer.module.scss"

const Footer = () => {
    return (
        <footer className={s.footer}>
           <div className="container">
               <h4>
                   Save time, save money!
               </h4>
           </div>
        </footer>
    );
};

export default Footer;