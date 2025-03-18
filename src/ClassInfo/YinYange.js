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

function YinYan(){

    const [scrollToSection, setScrollToSection] = useState(null);

    const scheduleData = {
        "Tuesday": [{ time: "8:00AM", platform: "Online", teacher: "Ava", price: "$15" }, { time: "6:00PM", platform: "In Person", teacher: "Noah", price: "$20" }],
        "Thursday": [{ time: "4:00PM", platform: "Online", teacher: "Ava", price: "$15" }],
        "Friday": [{ time: "2:00PM", platform: "Online", teacher: "Ava", price: "$15" }],
        "Saturday": [{ time: "11:00AM", platform: "In Person", teacher: "Noah", price: "$20" }, { time: "4:00PM", platform: "Online", teacher: "Ava", price: "$15" }],
        "Sunday": [{ time: "5:00PM", platform: "In Person", teacher: "Noah", price: "$20" }]
    };

    return(
        <div>
            <Navbar setScrollToSection={setScrollToSection}></Navbar>
            <PageHeader
                level="All Levels"
                duration="60 minutes"
                title="Yin & Yang"
                desc="An intimate class designed for partners to sweat together and connect through breath and movement. You’ll work together to support each other in poses that foster trust and communication."
                image="https://images.pexels.com/photos/7592420/pexels-photo-7592420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                scrollToSection={scrollToSection}>
            </PageHeader>
            <RulesFlower></RulesFlower>
            <Prices scheduleData={scheduleData}></Prices>
            <Teachers
                onlineImg="https://images.pexels.com/photos/31084772/pexels-photo-31084772/free-photo-of-portrait-of-a-smiling-woman-in-floral-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                onlineTeacher= "Ava Thompson"
                onlineDesc= "Ava is a certified yoga instructor with advanced training in Yin Yoga and Partner Yoga, helping partners create meaningful connections through breath and movement."
                offlineImg="https://images.pexels.com/photos/8437076/pexels-photo-8437076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                offlineTeacher="Noah Clark"
                offlineDesc="With over 10 years of teaching experience and the Best Yoga Teacher Award at the Global Wellness Conference, Noah has received multiple praises from his students. "
            ></Teachers>
            <Faq></Faq>
            <ClassSignup scheduleData={scheduleData}></ClassSignup>
            <Footer></Footer>
        </div>
    );
}

export default YinYan;