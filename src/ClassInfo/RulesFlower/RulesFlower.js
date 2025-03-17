import React from "react";
import './RulesFlowerStyle.css';

function RulesFlower(){
    return(
        <div>
            <h1 className="rulesTitle"> Guidelines for a Peaceful Practice </h1>
            <div className="flower">
                <div className="top">
                    <div class="tl petal">
                        <p>Please arrive 10 minutes early to set up. Late arrivals may disrupt the session.</p>
                    </div>
                    <div class="tr petal">
                        <p>Phones must be on silent and minimal distractions. Let’s keep the space calm. </p>
                    </div>
                </div>
                <div className="bottom">
                    <div class="bl petal">
                        <p> Wipe down your mat and props after use. Clean space, clear thoughts.</p>
                    </div>
                    <div class="br petal">
                        <p>Respect everyone’s journey. Encourage, don’t compare.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RulesFlower;