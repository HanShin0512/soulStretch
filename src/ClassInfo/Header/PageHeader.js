import React from "react";
import './HeaderStyle.css';

function PageHeader({level, duration, title, desc, image}){

    return(
        <div className="hero classes">
            <div className="overlay"></div>
            <div className="title">
                <p> {level}</p>
                <p> {duration} </p>
                <h1>{title}</h1>
                <p> {desc} </p>
            </div>
            <div className="scrollToSignUp">
                <img src="../icons/curve-arrow.png" className="curve-arrow" alt="curve-arrow"/>
                <button>
                    Sign Up
                </button>
            </div>
            <img src={image} className="headerImg" alt="yoga class"></img>
        </div>
    );
}

export default PageHeader;