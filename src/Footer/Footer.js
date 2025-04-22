import React from "react";
import './FooterStyle.css';

function Footer(){
    return(
        <footer id='footer'>

            {/* logo and title */}
            <div className='top'>
                <p className='logo footer'>Soul Stretch</p>
                <h1> Made with Love (and Lots of Debugging) by Han Shin – Let’s Connect! </h1>
            </div>

            <div className='bottom'>

                {/* input email */}
                <form action="https://api.web3forms.com/submit" method="POST" className='emailForm'>
                    <input type="hidden" name="access_key" value="56c117b5-fe5a-4b82-b1a7-3edd3606dcf6" />
                
                    <input
                        className="sendEmail"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                    />
                
                    {/* Honeypot Spam Protection */}
                    <input type="checkbox" name="botcheck" className="hidden" />
                
                    <button type="submit">
                        <img src="/icons/right-arrow.png" alt="submit" />
                    </button>
                </form>

                {/* social media and contact information */}
                <div className='social'>
                    <h3>Social</h3>
                    <a href='https://www.linkedin.com/in/thwin-han-shin-44b157334/' target="_blank" rel='noreferrer'> LinkedIn </a> 
                    <a href='https://github.com/HanShin0512' target="_blank" rel='noreferrer'> GitHub </a>
                </div>
                <div className='contactInfo'>
                    <h3>Contact Information</h3>
                    <p>Choa Chu Kang</p>
                    <p> +65 9022 7760 </p>
                    <p> thwinhanshin123@gmail.com </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;