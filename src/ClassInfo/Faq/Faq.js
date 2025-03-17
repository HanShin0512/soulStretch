import React from "react";
import './FaqStyle.css';

function Faq(){

    const showAnswer = (arrow, ans) => {
        const arrowEl = document.getElementById(arrow);
        if(arrowEl){
            const currentDeg = arrowEl.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
            arrowEl.style.transform = currentDeg;
        } else {
            console.log('Could not find tag' + arrowEl)
        }

        const ansEl = document.getElementById(ans);
        if(ansEl){
            const ansDisplay = ansEl.style.display === 'block' ? 'none' : 'block';
            const ansTrans = ansEl.style.transform === 'translateY(0px)' ? 'translateY(-150%)' : 'translateY(0px)';
            ansEl.style.transition = 'transform 0.3s ease';
            ansEl.style.transform = ansTrans;
            ansEl.style.display = ansDisplay;
        } else {
            console.log('Could not find tag' + ansEl);
        }
    }

    return(
        <div>
            <h1 className="faqTitle">Frequently Asked Questions</h1>
            <div className="faqFlex">
                <div className="qContainer">
                    <div className="question">
                        <p> Are the yoga equipments provided? </p>
                        <img 
                            src="../icons/chevron.png"
                            alt="chevron"
                            id="arrow1"
                            onClick={() => showAnswer('arrow1', 'ans1')}>  
                        </img>
                    </div>
                    <p id="ans1"> Yes! We provide yoga mats and towels for all classes, but you're more than welcome to bring your own if you prefer. </p>
                </div>
                <div className="qContainer">
                    <div className="question">
                        <p> Are the classes suitable for beginners? </p>
                        <img 
                            src="../icons/chevron.png"
                            alt="chevron"
                            id="arrow2"
                            onClick={() => showAnswer('arrow2', 'ans2')}>  
                        </img>
                    </div>
                    <p id="ans2"> Absolutely! Our Sunrise Flow class is perfect for beginners, and our instructors always offer modifications for every level. </p>
                </div>
                <div className="qContainer">
                    <div className="question">
                        <p> What’s the difference between online and offline classes? </p>
                        <img 
                            src="../icons/chevron.png"
                            alt="chevron"
                            id="arrow3"
                            onClick={() => showAnswer('arrow3', 'ans3')}>  
                        </img>
                    </div>
                    <p id="ans3"> Online classes are conducted via live video sessions, while offline classes are held at our studio. Both platforms offer the same high-quality experience. </p>
                </div>
                <div className="qContainer">
                    <div className="question">
                        <p> How do I know if my booking was successful? </p>
                        <img 
                            src="../icons/chevron.png"
                            alt="chevron"
                            id="arrow4"
                            onClick={() => showAnswer('arrow4', 'ans4')}>  
                        </img>
                    </div>
                    <p id="ans4"> You’ll receive a confirmation email once you’ve signed up. If you don’t see it, check your spam folder or contact us. </p>
                </div>
                <div className="qContainer">
                    <div className="question">
                        <p> Can I cancel or reschedule a class? </p>
                        <img 
                            src="../icons/chevron.png"
                            alt="chevron"
                            id="arrow5"
                            onClick={() => showAnswer('arrow5', 'ans5')}>  
                        </img>
                    </div>
                    <p id="ans5"> Yes, you can cancel or reschedule up to 24 hours before the class starts through your profile page. </p>
                </div>
                <div className="qContainer">
                    <div className="question">
                        <p> What happens if I’m late to a class? </p>
                        <img 
                            src="../icons/chevron.png"
                            alt="chevron"
                            id="arrow6"
                            onClick={() => showAnswer('arrow6', 'ans6')}>  
                        </img>
                    </div>
                    <p id="ans6"> We recommend arriving 10 minutes early, but if you're late, please join quietly to avoid disrupting others. </p>
                </div>
            </div>
        </div>
    );
}

export default Faq;