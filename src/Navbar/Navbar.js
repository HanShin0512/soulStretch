import React from "react";
import { useState, useEffect, useRef } from "react";
import './NavStyle.css';
import Lenis from '@studio-freight/lenis';

function Navbar({setScrollToSection}){

    const [bgColor, setBgColor] = useState('transparent'); 
    const [textColor, setTextColor] = useState('#FFFFFF');
    const lenis = useRef(null);

    //lenis
    useEffect(() => {
    //initialise lenis
    lenis.current = new Lenis({
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 2), //cubic easing for smooth stop
        smooth: true,
        smoothTouch: true, //for touch screens
    });

    const animate = (time) => {
        lenis.current.raf(time);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
        lenis.current.destroy();
    };
    }, []);

    //change navbar color
    useEffect(() => {
        const changeNavColor = () => {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        const heroHeight = hero.offsetHeight;
        if(scrollPosition >= heroHeight-1){
            setBgColor('#FFFFFF');  // Set background to white
            setTextColor('#000000'); // Set text to black
        } else {
            setBgColor('transparent'); // Make navbar transparent
            setTextColor('#FFFFFF');  // Keep text white
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
            lenis.current.scrollTo(element); // Scroll if on the home page
        } else {
            window.location.href = `/#${id}`; // Navigate to home page and scroll
        }
    }

    useEffect(() => {
        if(setScrollToSection){
            setScrollToSection(() => scrollToSection);
        }
    }, [setScrollToSection]);

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
                <a href='#about' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('about')}> About </a>
                <a href='#classes' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('classes')}> Classes </a>
                <a href='#testimonials' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('testimonials')}> Testimonials </a>
                <a href='#articles' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('articles')}> Articles </a>
                <a href='#contact' style={{ color: textColor }} className='hideOnMobile' onClick={() => scrollToSection('contact')}> Contact </a>
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