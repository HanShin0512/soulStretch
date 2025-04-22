import React from "react";
import Navbar from '../Navbar/Navbar';
import './contactStyle.css';

function Contact(){
    return(
        <div className="contactContainer">
            <Navbar></Navbar>
            <h1>Get In Touch</h1>
            <p> Let&apos;s design and develop the website of your dreams together</p>

            <div className="contact-icons">
                <div className="email">
                    <img src="/icons/email.png"></img>
                    <p>Email</p>
                    <p className="info">thwinhanshin123@gmail.com</p>
                </div>
                <div className="phone">
                    <img src="/icons/phone.png"></img>
                    <p>Phone</p>
                    <p className="info"> 9022 7760 </p>
                </div>
                <div className="linkedin">
                    <img src="/icons/linkedin.png"></img>
                    <p>LinkedIn</p>
                    <a href='https://www.linkedin.com/in/thwin-han-shin-44b157334/' target="_blank" rel='noreferrer' className="info"> Thwin Han Shin </a>
                </div>
                <div className="github">
                    <img src="/icons/github.png"></img>
                    <p>Github</p>
                    <a href='https://github.com/HanShin0512' target="_blank" rel='noreferrer' className="info"> HanShin0512 </a>
                </div>
            </div>
            <div className="address">
                <img src="/icons/home.png"></img>
                <p>Home</p>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127637.16892757978!2d103.68147186382711!3d1.3797458016878015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11c40296ea29%3A0xae35ab240792ee19!2sPalm%20Gardens!5e0!3m2!1sen!2ssg!4v1745298974722!5m2!1sen!2ssg" 
                    allowfullscreen 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    className="googleMap">    
                </iframe>
            </div>
        </div>
    );
};

export default Contact;