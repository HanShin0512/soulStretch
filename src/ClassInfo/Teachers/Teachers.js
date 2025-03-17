import React from "react";
import './TeachersStyle.css'

function Teachers({onlineImg, onlineTeacher, onlineDesc, offlineImg, offlineTeacher, offlineDesc}) {
    return(
        <div className="sectionWrap">
            <h1 className="teachersTitle">Meet Our Instructors</h1>
            <p className="teacherDesc"> Our certified yoga instructors bring years of experience and deep expertise in various yoga styles. Skilled in guiding all levels, they blend traditional techniques with modern practices, ensuring each session is safe, effective, and empowering. Join them on the mat and elevate your yoga journey. </p>
            <div className="teachersFlex">
                <div className="online">
                    <img src={onlineImg}></img>
                    <h1 className="teacherName">{onlineTeacher}</h1>
                    <p className="teacherOnline">Online</p>
                    <p> {onlineDesc} </p>
                </div>
                <div className="offline">
                    <img src={offlineImg}></img>
                    <h1 className="teacherName">{offlineTeacher}</h1>
                    <p className="teacherOffline">In Person</p>
                    <p> {offlineDesc} </p>
                </div>
            </div>
        </div>
    );
};

export default Teachers;