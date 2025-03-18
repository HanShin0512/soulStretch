import React from "react";
import Navbar from "../Navbar/Navbar";
import PageHeader from "./Header/PageHeader";
import RulesFlower from "./RulesFlower/RulesFlower";
import Prices from "./Prices/Prices";
import Teachers from "./Teachers/Teachers";
import Faq from "./Faq/Faq";
import ClassSignup from "./ClassSignup/ClassSignup";
import Footer from "../Footer/Footer";
import { useState } from "react";

function PowerPulse(){

    const [scrollToSection, setScrollToSection] = useState(null);

    const scheduleData = {
        "Monday": [{ time: "7:00AM", platform: "Online", teacher: "Max", price: "$15" }, { time: "6:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }],
        "Tuesday": [{ time: "12:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }, { time: "7:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }],
        "Wednesday": [{ time: "7:30AM", platform: "Online", teacher: "Max", price: "$15" }, { time: "3:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }, { time: "7:00PM", platform: "Online", teacher: "Max", price: "$15" }],
        "Thursday": [{ time: "8:00AM", platform: "In Person", teacher: "Sophie", price: "$20" }, { time: "5:00PM", platform: "Online", teacher: "Max", price: "$15" }],
        "Friday": [{ time: "10:00AM", platform: "Online", teacher: "Max", price: "$15" }, { time: "2:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }],
        "Saturday": [{ time: "3:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }, { time: "6:00PM", platform: "Online", teacher: "Max", price: "$15" }],
        "Sunday": [{ time: "9:00AM", platform: "Online", teacher: "Max", price: "$15" }, { time: "1:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }, { time: "6:00PM", platform: "In Person", teacher: "Sophie", price: "$20" }]
    };

    return(
        <div>
            <Navbar setScrollToSection={setScrollToSection}></Navbar>
            <PageHeader
                level="Intermediate to Advanced"
                duration="60 minutes"
                title="Power Pulse"
                desc="Perfect for those who want to level up their yoga practice! A dynamic and strength-focused yoga session that combines traditional poses with modern power moves. Expect to sweat and challenge your limits."
                image="https://images.pexels.com/photos/8436457/pexels-photo-8436457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                scrollToSection={scrollToSection}>
            </PageHeader>
            <RulesFlower></RulesFlower>
            <Prices scheduleData={scheduleData}></Prices>
            <Teachers
                onlineImg="https://images.pexels.com/photos/6598980/pexels-photo-6598980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                onlineTeacher= "Max Anderson"
                onlineDesc= "Max holds a RYT 200 Yoga Instructor certification, with additional training in Athletic Yoga and Power Yoga. With his athletic background, Max uses a structured approach to increase muscle engagement and endurance."
                offlineImg="https://images.pexels.com/photos/4534668/pexels-photo-4534668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                offlineTeacher="Sophie Miller"
                offlineDesc="Sophie is certified in Power and Strength-Based Yoga. She has worked with well known athletes to improve flexibility and strength through yoga. Her energetic and dynamic classes are designed to challenge and transform her students' bodies."
            ></Teachers>
            <Faq></Faq>
            <ClassSignup scheduleData={scheduleData}></ClassSignup>
            <Footer></Footer>
        </div>
    );
}

export default PowerPulse;