import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

function App() {

  //references and states
  const containerRef = useRef(null); //drag reviews
  const progressBarRef = useRef(null); // Reference to the progress bar
  const [bgColor, setBgColor] = useState('transparent'); 
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [sidebarShown, setSideBarShown] = useState(false);

  useEffect(() => {

    //smooth scroll
    const scrollEl = document.querySelector('.appContainer');
    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 0.6,
      revealClass: 'is-reveal',
    });

    // Tell ScrollTrigger to use LocomotiveScroll
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    //position fixed for nav
    const navbar = document.querySelector('nav');
    locoScroll.on('scroll', ({ scroll }) => {
      navbar.style.transform = `translateY(${scroll.y}px)`;
      //change nav color 
      const heroVid = document.querySelector('.hero-vid');
      const heroHeight = heroVid.offsetHeight;
      //if scrolled more than hero vid
      if (scroll.y > heroHeight) {
        setBgColor('#FFFFFF');  // Set background to white
        setTextColor('#000000'); // Set text to black
      } else {
        setBgColor('transparent'); // Make navbar transparent
        setTextColor('#FFFFFF');  // Keep text white
      }
    });

    //scroll to navlinks
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if(target){
          locoScroll.scrollTo(target);
        }
      })
    })

    // Pinned text animation
    const pinnedText = document.querySelector('.pinned-text');
    ScrollTrigger.matchMedia({
      // For desktop
      "(min-width: 1025px)": function () {
        gsap.to(pinnedText, {
          scrollTrigger: {
            trigger: pinnedText,
            start: "top top",
            end: "bottom bottom",
            pin: true,
            scrub: 1,
            scroller: scrollEl,
          },
        });
      }
    });    

    //color change
    const changeLotus = document.querySelector('.pinned-text img');
    const lines = document.querySelectorAll('.line');
    document.body.style.transition = "all 1s ease";
    gsap.to(document.body, {
      scrollTrigger: {
        trigger: ".descriptionII",
        start: "top-=300px top",
        end: "bottom+=300px bottom",
        scrub: 1,
        scroller: scrollEl,
        onEnter: () => {
          document.body.style.backgroundColor = '#81AF88' 
          document.body.style.color = '#FFFFFF'
          changeLotus.src = '/icons/lotus-white.png'
          lines.forEach((line) => {line.style.backgroundColor = '#FFFFFF'})
          navbar.style.opacity = '0'
        },
        onLeave: () => {
          document.body.style.backgroundColor = '#FFFFFF'
          document.body.style.color = '#000000' 
          changeLotus.src = 'favicon.ico'
          lines.forEach((line) => {line.style.backgroundColor = '#000000'})
          navbar.style.opacity = '1'
        },
        onEnterBack: () => {
          document.body.style.backgroundColor = '#81AF88' 
          document.body.style.color = '#FFFFFF'
          changeLotus.src = '/icons/lotus-white.png'
          lines.forEach((line) => {line.style.backgroundColor = '#FFFFFF'})
          navbar.style.opacity = '0'
        },
        onLeaveBack: () => {
          document.body.style.backgroundColor = '#FFFFFF'
          document.body.style.color = '#000000'
          changeLotus.src = 'favicon.ico'
          lines.forEach((line) => {line.style.backgroundColor = '#000000'})
          navbar.style.opacity = '1'
        }
      }
    })

    //drag reviews
    const reviewsContainer = containerRef.current;
    const reviews = reviewsContainer.querySelector(".reviews");
    const reviewsWidth = reviews.scrollWidth; // Total width of reviews
    const progressBar = progressBarRef.current;

    // Calculate initial progress bar width
    const progressWidth = (reviewsContainer.offsetWidth / reviewsWidth) * 100;
    if (progressBar) {
      progressBar.style.width = `${Math.min(progressWidth, 100)}%`;
    }

    // Create Draggable instance
    Draggable.create(reviews, {
      type: "x",
      bounds: {
        maxX: 0,
        minX: -(reviewsWidth - reviewsContainer.offsetWidth),
      },
      inertia: true,
      snap: {
        x: (value) => Math.round(value / 300) * 300, // Adjust snapping points
      },
      onDrag: function () {
        const progress = Math.abs(this.x) / (reviewsWidth - reviewsContainer.offsetWidth); // Drag progress (0 to 1)
        if (progressBar) {
          progressBar.style.left = `${Math.min(progress, 1) * (100 - progressWidth)}%`; // Update left based on drag progress
        }
      },
    });

    // Cleanup on unmount
    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      const instance = Draggable.get(reviews);
      if (instance) {
        instance.kill(); // Destroy Draggable instance
      }
    };
  }, []);

  // custom cursor
  const [cursorPosition, setCursorPosition] = useState({ x: '0%', y: '0%' });
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    // Check if it's a desktop device
    setIsDesktop(!('ontouchstart' in window));
  }, []);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseMove = (e) => {
    isDesktop &&
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // change hero vid when clicked
  const [isYouTube, setIsYouTube] = useState(false);
  const handleVideoChange = () => setIsYouTube(!isYouTube);

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

  // Handle sidebar toggle
  const toggleSidebar = () => setSideBarShown((prev) => !prev); // Toggle sidebar state

  return (
    <div className="appContainer" >
      
      {/* hero section */}
      <header className='hero-section'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        >

        {/* navbar */}
        <nav 
          style={{ backgroundColor: bgColor }}
          onMouseEnter={handleMouseLeave}
          onMouseLeave={handleMouseEnter}>
          <a className='logo logo-nav' style={{ color: textColor }} href='#hero'>Soul Stretch
          </a>
          <div className='links'>
            <a href='#about' style={{ color: textColor }} className='hideOnMobile'> About </a>
            <a href='#classes' style={{ color: textColor }} className='hideOnMobile'> Classes </a>
            <a href='#testimonials' style={{ color: textColor }} className='hideOnMobile'> Testimonials </a>
            <a href='#articles' style={{ color: textColor }} className='hideOnMobile'> Articles </a>
            <a href='#contact' style={{ color: textColor }} className='hideOnMobile'> Contact </a>
            <button className='bx bx-menu' style={{ color: textColor }} onClick={toggleSidebar}></button>
          </div>
          <div className='links sidebar' >
              <button className='bx bx-x' onClick={toggleSidebar}></button>
              <a href='#about'> About </a>
              <a href='#classes'> Classes </a>
              <a href='#testimonials'> Testimonials </a>
              <a href='#articles'> Articles </a>
              <a href='#contact'> Contact </a>
          </div>
        </nav>

        <div onClick={handleVideoChange} id='hero'>
          {/* view cursor */}
          {isDesktop && isHovered && (
            <div className="customCursor" 
            style={{
              transform: `translate(${cursorPosition.x - 80}px, ${cursorPosition.y - 80}px)`,
              opacity: 1
            }}>
              <p>View Video</p>
            </div>
          )}
          

          {/* video */}
          {isYouTube ? (
            <div class="youtube-container">
            <iframe src="https://www.youtube.com/embed/GSENAaAu8QQ?autoplay=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=GSENAaAu8QQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          ) : (
            <video className='hero-vid' src="https://videos.pexels.com/video-files/7580229/7580229-uhd_2560_1440_25fps.mp4" autoPlay webkit-playsInline playsInline loop disablePictureInPicture >
              Your browser does not support the video tag.
            </video>
          )}

        </div>

      </header>

      {/* about us section */}
      <section id='about'>

        {/* description */}
        <div className='description'>
          <p className='desc-left'> <span className='logo logo-left'>Soul Stretch</span> is a holistic yoga studio dedicated to creating transformative wellness experiences. We combine mindful movement, breathwork, and meditation to help our students cultivate balance, strength, and inner peace. Our mission is to build a supportive community where individuals can connect with themselves, embrace personal growth, and find harmony between body and mind. </p>
          <p className='logo logo-description'> Soul Stretch </p>
        </div>

        {/* line */}
        <div className='line'></div>

        {/* awards */}
        <div className='yogaClassAwards'>
          <div className='award'>
            <img className='zoom-img' src='/awards/mind-body-harmony.png' alt='Mind-Body Harmony Accreditation'></img>
            <p>transformative yoga experiences and fostering mindfulness</p>
          </div>
          <div className='award'>
            <img className='zoom-img' src='/awards/best-yoga-studio.png' alt='Best Yoga Studio Award'></img>
            <p>outstanding instruction, environment, and student satisfaction</p>
          </div>
          <div className='award'>
            <img className='zoom-img' src='/awards/wellness-program.png' alt='Wellness Program Recognition'></img>
            <p>enhances physical and mental health</p>
          </div>
        </div>

        {/* line */}
        <div className='line'></div>

        {/* second descsription with video */}
        <div className="descriptionII">
          <div className="pinned-text">
            <h1> <span className='logo logo-descriptionII'>Soul Stretch</span> </h1>
            <span class="wavy-line">∿∿∿∿∿∿∿∿</span> <img src='favicon.ico' alt='lotus'></img> <span class="wavy-line">∿∿∿∿∿∿∿∿</span>
            <p> Guiding your journey to balance and mindfulness </p>
          </div>

          <div className="scrolling-image">
          <video src='https://videos.pexels.com/video-files/4327275/4327275-uhd_1440_2732_25fps.mp4' className='vertical-yoga' autoPlay webkit-playsInline playsInline loop disablePictureInPicture></video>
          </div>
        </div>

      </section>

      {/* line */}
      <div className='line'></div>

      {/* classes section */}
      <section id='classes'>

        {/* classes title container  */}
        <div className='titleContainer classes'>
          <h1> Stretch & Strengthen </h1>
          <span class="wavy-line">∿∿∿∿∿∿∿∿</span>  
          <h1>  Join Our Classes </h1>
        </div>

        {/* classes container */}
        <div className='classesContainer'>

          <div className='class firstClass'>
            <div className='classImageContainer'>
              <img src='/classes/firstClass.jpg' alt='yoga class'></img>
            </div>
            <h2 className='name'>Sunrise Flow</h2>
            <p className='classLvl'> <b>Level</b>: Beginner to Intermediate</p>
            <p className='classDesc'> Gentle yet energizing sequence that focuses on awakening the body and calming the mind. This class incorporates sun salutations, light stretching, and breathwork to set a positive tone for the day.</p>
            <p className='duration'> <b>Duration</b>: 45 minutes </p>
          </div>

          <div className='class secClass'>
            <div className='classImageContainer'>
              <img src='/classes/secClass.jpg' alt='yoga class'></img>
            </div>
            <h2 className='name'>Power Pulse Yoga</h2>
            <p className='classLvl'> <b>Level</b>: Intermediate to Advanced </p>
            <p className='classDesc'> Perfect for those who want to level up their yoga practice! A dynamic and strength-focused yoga session that combines traditional poses with modern power moves. Expect to sweat and challenge your limits.</p>
            <p className='duration'> <b>Duration</b>: 60 minutes </p>
          </div>

          <div className='class thirdClass'>
            <div className='classImageContainer'>
              <img src='/classes/thirdClass.png' alt='yoga class'></img>
            </div>
            <h2 className='name'>Yin & Yang</h2>
            <p className='classLvl'> <b>Level</b>: All Levels</p>
            <p className='classDesc'> An intimate class designed for partners to sweat together and connect through breath and movement. You’ll work together to support each other in poses that foster trust and communication. </p>
            <p className='duration'> <b>Duration</b>: 60 minutes </p>
          </div>

        </div>  

      </section>

      {/* line */}
      <div className='line'></div>

      {/* testimonials section */}
      <section id='testimonials'>

        {/* title container for reviews */}
        <div className='titleContainer review'>
          <h1> Zen Insights </h1>
          <span class="wavy-line">∿∿∿∿∿∿∿∿</span>  
          <h1> Real Yoga Reviews </h1>
        </div>

        {/* reviews container */}
        <div className='reviewsContainer' ref={containerRef}>
          
          <div className='reviews'>

            <div className='review'>
              <h1> A Game-Changer for My Mind and Body </h1>
              <p> I joined Soul Stretch a month ago, and it's been life-changing. The instructors are so calming, and the sessions are beginner-friendly but still challenging. </p>
              <h3> — Amelia R. </h3>
            </div>

            <div className='review'>
              <h1> The Perfect Stress Reliever </h1>
              <p> After a hectic workday, the evening yoga sessions here are my sanctuary. The flow classes help me reconnect with myself, and the environment is so peaceful. Highly recommend the virtual options too.</p>
              <h3> — John M. </h3>
            </div>

            <div className='review'>
              <h1> I Feel So Much More Flexible </h1>
              <p> I was hesitant to try yoga, but the team at Soul Stretch made me feel so comfortable. Just a few weeks in, and I can already see improvements in my posture and flexibility. Can't wait to explore the advanced classes. </p>
              <h3> — Priya S. </h3>
            </div>

            <div className='review'>
              <h1> A Unique Experience </h1>
              <p> I signed up for the couples' yoga class with my boyfriend, and it was such a fun way to unwind together. The instructors were great at guiding us through the poses and kept it lighthearted yet meaningful. </p>
              <h3> — Kevin L. </h3>
            </div>

            <div className='review'>
              <h1> Best Yoga Studio Ever </h1>
              <p> From the moment you walk in, the vibe is so welcoming. The playlists during class are amazing, and the instructors really know their stuff. I'm hooked on the candlelight yoga sessions—it’s pure bliss. </p>
              <h3> — Sophia D. </h3>
            </div>

            <div className='review'>
              <h1> Kind Instructors </h1>
              <p> The instructors are so patient and knowledgeable, guiding us through every pose with care. The atmosphere is calm and welcoming, making it the perfect escape from a busy day. </p>
              <h3> — Lily B. </h3>
            </div>

          </div>

        </div>   

        {/* scrollbar for reviews */}
        <div className='reviewsScrollbar'>
          <div className='scrollbarProgress' ref={progressBarRef}></div>
        </div>

      </section>

      {/* articles section */}
      <section id='articles'>   

        {/* title container for articles */}
        <div className='titleContainer articles'>
          <h1> Inner Peace Library </h1>
          <span class="wavy-line">∿∿∿∿∿∿∿∿</span>  
          <h1> Explore the World of Yoga </h1>
        </div>

        <div className='articles'>
          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/balance.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Finding Balance: The Art of Mindful Yoga </h1>
                <p> Discover how practicing mindfulness during yoga can transform your physical and mental well-being. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/power.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> The Power of Daily Yoga </h1>
                <p> Uncover the benefits of a consistent yoga practice and how it can energize your life. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/modern.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Yoga for Modern Life </h1>
                <p> Learn yoga techniques designed to combat daily stress and restore inner peace. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/beginner.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Flow and Glow: Yoga for Beginners Made Easy </h1>
                <p> A friendly guide to starting yoga and finding your flow, no matter your experience level.</p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/soul.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Soulful Movements </h1>
                <p> Dive into the spiritual and philosophical roots of yoga and connect with your soul. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/self-discovery.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Breathe, Bend, and Blossom </h1>
                <p> Discover how yoga can be a journey of personal transformation and self-discovery. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/nature.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Yoga and the Seasons: Aligning Your Practice with Nature </h1>
                <p> Tips for adapting your yoga routine to match the rhythms of nature throughout the year. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/rest.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> The Joy of Rest </h1>
                <p> Find out why slowing down and practicing restorative poses is vital for your health. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/confidence.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Empowered Poses: How Yoga Builds Confidence </h1>
                <p> Learn how specific yoga poses can boost your self-esteem and self-awareness. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

          <div className='article'>
              <div className='articleImgContainer'>
                <img src='/articles/secret.jpg' alt='article'></img>
              </div>
              <div className='right'>
                <h1> Soul Stretch Secrets </h1>
                <p> Master key techniques to deepen your stretches and strengthen your practice. </p>
              </div>
              <img className='icon' src='/icons/chakra.png' alt='icon'></img>
          </div>
          {/* line */}
          <div className='line'></div>

       </div>
      </section>

      {/* footer */}
      <footer id='contact'>

        {/* logo and title */}
        <div className='top'>
          <p className='logo footer'>Soul Stretch
          </p>
          <h1> Made with Love (and Lots of Debugging) by Han Shin – Let’s Connect! </h1>
        </div>

        <div className='bottom'>

          {/* input email */}
          <form action="https://api.web3forms.com/submit" method="POST">
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

    </div>
    
  );
  
}

export default App;