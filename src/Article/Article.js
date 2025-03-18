import React from "react";
import './ArticleStyle.css';

function Article({img, title, desc}){
    return(
        <article className='article'>
            <div className='articleImgContainer'>
                <img src={img} alt='article'></img>
            </div>
            <div className='right'>
                <h1> {title} </h1>
                <p> {desc} </p>
            </div>
            <img className='icon' src='/icons/chakra.png' alt='icon'></img>
        </article>
    );
};

export default Article;