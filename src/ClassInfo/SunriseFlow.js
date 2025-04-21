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

function SunriseFlow(){
        
    const [scrollToSection, setScrollToSection] = useState(null);

    const scheduleData = {
        "Monday": [{ time: "7:00AM", platform: "Online", teacher: "Eve", price: "$10"}],
        "Wednesday": [{ time: "7:00AM", platform: "Online", teacher: "Eve", price: "$10"}],
        "Friday": [{ time: "7:00AM", platform: "Online", teacher: "Eve", price: "$10"}],
        "Saturday": [{ time: "8:00AM", platform: "In Person", teacher: "Liam", price: "$15"}],
        "Sunday": [{ time: "8:00AM", platform: "In Person", teacher: "Liam", price: "$15"}],
    };
      
    return(
        <div>
            <Navbar setScrollToSection={setScrollToSection}></Navbar>
            <PageHeader
                level="Beginner to Intermediate"
                duration="45 minuutes"
                title="Sunrise Flow"
                desc="Gentle yet energizing sequence that focuses on awakening the body and calming the mind. This class incorporates sun salutations, light stretching, and breathwork to set a positive tone for the day."
                image="https://images.pexels.com/photos/8436595/pexels-photo-8436595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                scrollToSection={scrollToSection}>
            </PageHeader>
            <RulesFlower></RulesFlower>
            <Prices scheduleData={scheduleData}></Prices>
            <Teachers
                onlineImg="https://images.pexels.com/photos/8558905/pexels-photo-8558905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                onlineTeacher= "Eve Jhonson"
                onlineDesc= "Eve specializes in gentle flows and mindful breathing. With certifications in Vinyasa Flow and Restorative Yoga, she is skilled at guiding beginners and intermediate practitioners awaken their bodies and calm their minds."
                offlineImg="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                offlineTeacher="Liam William"
                offlineDesc="Liam has been teaching for over 7 years and has completed training in Yin Yoga and Trauma-Informed Yoga. He also holds a Yoga for Mental Health Certification, allowing him to cater to both physical and emotional well-being."
            ></Teachers>
            <Faq></Faq>
            <ClassSignup scheduleData={scheduleData}></ClassSignup>
            <Footer></Footer>
        </div>
    );
}

export default SunriseFlow;