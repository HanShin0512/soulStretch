import React from "react";
import { useState } from "react";
import './ClassSignupStyle.css';

function ClassSignup ({scheduleData}) {

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedClasses, setSelectedClasses] = useState([]);

    const availableDays = Object.keys(scheduleData);

    const availableClasses = selectedDay ? scheduleData[selectedDay] : [];

    // Toggle class selection
    const handleClassSelection = (session) => {
        setSelectedClasses((prev) => 
            prev.includes(session) 
            ? prev.filter((s) => s !== session) 
            : [...prev, session]
        )
    };

    return (
        <form id="classReg">
            <h1 className="classRegTitle">Class Registration</h1>

            <h2 className="personalTitle"> Personal Information </h2>
            <div className="personalInfo">
                {/* Name */}
                <label for="name"><b>Name</b></label> 
                <input type="text" id="name" name="name" value="Jhon Doe" readOnly></input>

                {/* Email */}
                <br></br>
                <label for="email"><b>Email</b></label> 
                <input type="email" id="name" name="email" value="JhonDoe@gmail.com" readOnly></input>
            </div>

            <h2 className="classesTitle"> Availble Classes </h2>
            {/* Day selection */}
            <div className="daySelect">
                <label><b>Day</b></label> 
                <select onChange={(e) => setSelectedDay(e.target.value)} value={selectedDay}>
                    <option value="">Select a day</option>
                    {availableDays.map((day,index) => (
                        <option key={index} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>

            {/* Multiple class selection */}
            {selectedDay && availableClasses.length > 0 && (
                    <div className="availableClasses">
                        {availableClasses.map((session, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    onChange={() => handleClassSelection(session)}
                                    value={session}
                                    checked={selectedClasses.includes(session)}>
                                </input>
                                {session.time}({session.platform}) - {session.price}
                            </label>
                        ))}
                    </div>
                )
            }

            <div className="formButton">
                <button type="submit" disabled={!selectedDay || selectedClasses.length === 0}>
                    Register
                </button>
            </div>

        </form>
    );
};

export default ClassSignup;