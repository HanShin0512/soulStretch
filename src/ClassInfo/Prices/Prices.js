import React from "react";
import './PricesStyle.css'

function Prices({scheduleData}){

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return(
        <div>
            <h1 className="pricesTitle">Class Schedule</h1>
            <div className="classSchedule">
                <table>
                    <thead>
                        <tr>
                        {daysOfWeek.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {daysOfWeek.map((day) => {
                                const dayClasses = scheduleData[day];
                                return (
                                    <td key={day} >
                                        {dayClasses &&
                                            dayClasses.map((classInfo, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`classInfo ${classInfo.platform === "Online" ? "onlineClass" : "inPersonClass"}`}
                                                >
                                                    <p> {classInfo.time} </p>
                                                    <p> {classInfo.platform} </p>
                                                    <p> {classInfo.teacher} </p>
                                                    <p> {classInfo.price} </p>
                                                </div>
                                            ))
                                        }
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prices;