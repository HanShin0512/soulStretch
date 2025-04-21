import React from "react";
import { useState, useEffect } from "react";
import './NavStyle.css';
import { useNavigate } from "react-router-dom";
import { useScroll } from "../ScrollContext";

function Navbar(){

    const [bgColor, setBgColor] = useState('transparent'); 
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [signupBg, setSignupBg] = useState('transparent');
    const lenisRef = useScroll();
    const navigate = useNavigate();

    //change navbar color
    useEffect(() => {
        const changeNavColor = () => {
            const scrollPosition = window.scrollY;
            const hero = document.querySelector('.hero');
            if(hero){
                const heroHeight = hero.offsetHeight;
                if(scrollPosition >= heroHeight-1){
                    setBgColor('#FFFFFF');  // Set background to white
                    setTextColor('#000000'); // Set text to black
                    setSignupBg('var(--mainGreen)');
                } else {
                    setBgColor('transparent'); // Make navbar transparent
                    setTextColor('#FFFFFF');  // Keep text white
                    setSignupBg('transparent');
                }
            }
        }
        window.addEventListener('scroll', changeNavColor);
        return () => {
            window.removeEventListener('scroll', changeNavColor);
        }
    }, []);
    
    //scroll to sections
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            lenisRef.current.scrollTo(element); // Scroll if on the home page
        } else {
            window.location.href = `/#`; // Navigate to home page 
        }
    }

    // Handle sidebar toggle
    const [sidebarShown, setSideBarShown] = useState(false);
    const toggleSidebar = () => setSideBarShown((prev) => !prev); // Toggle sidebar state

    // useEffect to update sidebar display when sidebarShown changes
    useEffect(() => {
        const sidebar = document.querySelector('.links.sidebar');
        if (sidebar) {
        if (sidebarShown) {
            sidebar.classList.add('open'); // Apply transition class
        } else {
            sidebar.classList.remove('open'); // Remove transition class
        }
        }
    }, [sidebarShown]);

    return(

        <nav 
            style={{ backgroundColor: bgColor }} >
            <a className='logo logo-nav' style={{ color: textColor }} href='#hero' onClick={() => scrollToSection('hero')}>Soul Stretch </a>
            <div className='links'>
                <a href='#classes' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('classes')}> Classes </a>
                <a href='#articles' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('articles')}> Articles </a>
                <a href='#contact' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('contact')}> Contact </a>
                <button 
                    className="signin" 
                    style={{ "--signup-bg": signupBg, color: textColor }}
                    onClick={() => navigate('/SignInUp/AuthForm')}
                >
                Sign In / Sign Up
                </button>
                <button className='bx bx-menu' style={{ color: textColor }} onClick={toggleSidebar}></button>
            </div>
            <div className='links sidebar' >
                <button className='bx bx-x' onClick={toggleSidebar}></button>
                <a href='#about' onClick={() => scrollToSection('about')}> About </a>
                <a href='#classes' onClick={() => scrollToSection('testimonials')}> Classes </a>
                <a href='#testimonials' onClick={() => scrollToSection('testimonials')}> Testimonials </a>
                <a href='#articles' onClick={() => scrollToSection('articles')}> Articles </a>
                <a href='#contact' onClick={() => scrollToSection('contact')}> Contact </a>
            </div>
        </nav>

    );
};

export default Navbar;