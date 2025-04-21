import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from "gsap/Draggable";
import { useNavigate  } from 'react-router-dom';
import './HomeStyle.css';
import Navbar from '../Navbar/Navbar';
import Article from '../Article/Article';
import Footer from '../Footer/Footer';

gsap.registerPlugin(ScrollTrigger, Draggable);

function Home() {

  //references and states
  const containerRef = useRef(null); //drag reviews
  const progressBarRef = useRef(null); // Reference to the progress bar
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
    
    const pinnedText = document.querySelector('.pinned-text');

    ScrollTrigger.matchMedia({
      // only for desktops
      "(min-width: 1025px)": function () {
        gsap.to(pinnedText, {
          scrollTrigger: {
            trigger: pinnedText,
            start: "top top",
            end: "bottom bottom",
            pin: true,
            scrub: 1,
            pinSpacing: false,
          },
        });
      }
    });    

    //color change
    const changeLotus = document.querySelector('.pinned-text img');
    const lines = document.querySelectorAll('.line');
    const navbar = document.querySelector('nav');
    document.body.style.transition = "all 1s ease";
    gsap.to(document.body, {
      scrollTrigger: {
        trigger: ".descriptionII",
        start: "top-=300px top",
        end: "bottom+=300px bottom",
        scrub: 1,

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
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    
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
  
    return () => {
      const instance = Draggable.get(reviews);
      if (instance) {
        instance.kill(); // Destroy Draggable instance
      }
    }
  }, []);

  // change hero vid when clicked
  //change cursor when video viewed
  const [isYouTube, setIsYouTube] = useState(false);
  const handleVideoChange = () => {
    setIsYouTube(!isYouTube);
    const stopVidCursor = document.querySelector('.hero.home');
    stopVidCursor.style.cursor = isYouTube
      ? "url('http://localhost:3000/icons/play-video.png') 64 64, auto"
      : "url('http://localhost:3000/icons/stop-video.png') 64 64, auto";
  }
  
  return (
    <div className="homeContainer" >
      
      {/* hero section */}
      <header className='hero home'>

        {/* navbar */}
        <Navbar/>

        <div onClick={handleVideoChange} id='hero'>          

          {/* video */}
          {isYouTube ? (
            <div class="youtube-container">
            <iframe src="https://www.youtube.com/embed/GSENAaAu8QQ?autoplay=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=GSENAaAu8QQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          ) : (
            <div className='parallex'>
              <div className='hero-img'></div>
            </div>
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

          <video src='https://videos.pexels.com/video-files/4327275/4327275-uhd_1440_2732_25fps.mp4' className='vertical-yoga' autoPlay webkit-playsInline playsInline loop disablePictureInPicture></video>
          
        </div>

      </section>

      {/* line */}
      <div className='line'  id='classes'></div>

      {/* classes section */}
      <section>

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
              <img src='/classes/firstClass.jpg' alt='yoga class' onClick={() => navigate("/ClassInfo/SunriseFlow", { replace: true }) || window.scrollTo(0, 0)}></img>
            </div>
            <h1 className='name'>Sunrise Flow</h1>
            <p className='classLvl'> <b>Level</b>: Beginner to Intermediate</p>
            <p className='classDesc'> Gentle yet energizing sequence that focuses on awakening the body and calming the mind. This class incorporates sun salutations, light stretching, and breathwork to set a positive tone for the day.</p>
            <p className='duration'> <b>Duration</b>: 45 minutes </p>
            <button className='classSignup' onClick={() => {navigate("/ClassInfo/SunriseFlow"); window.scrollTo(0, 0);}}>Sign Up Now</button>
          </div>

          <div className='class secClass'>
            <div className='classImageContainer'>
              <img src='/classes/secClass.jpg' alt='yoga class' onClick={() => {navigate("/ClassInfo/PowerPulse"); window.scrollTo(0, 0);}}></img>
            </div>
            <h1 className='name'>Power Pulse Yoga</h1>
            <p className='classLvl'> <b>Level</b>: Intermediate to Advanced </p>
            <p className='classDesc'> Perfect for those who want to level up their yoga practice! A dynamic and strength-focused yoga session that combines traditional poses with modern power moves. Expect to sweat and challenge your limits.</p>
            <p className='duration'> <b>Duration</b>: 60 minutes </p>
            <button className='classSignup' onClick={() => {navigate("/ClassInfo/PowerPulse"); window.scrollTo(0, 0);}}>Sign Up Now</button>
          </div>

          <div className='class thirdClass'>
            <div className='classImageContainer'>
              <img src='/classes/thirdClass.png' alt='yoga class' onClick={() => {navigate("/ClassInfo/YinYan"); window.scrollTo(0, 0);}}></img>
            </div>
            <h1 className='name'>Yin & Yang</h1>
            <p className='classLvl'> <b>Level</b>: All Levels</p>
            <p className='classDesc'> An intimate class designed for partners to sweat together and connect through breath and movement. You’ll work together to support each other in poses that foster trust and communication. </p>
            <p className='duration'> <b>Duration</b>: 60 minutes </p>
            <button className='classSignup' onClick={() => {navigate("/ClassInfo/YinYan"); window.scrollTo(0, 0);}}>Sign Up Now</button>
          </div>

        </div>  

      </section>

      {/* line */}
      <div className='line' id='testimonials'></div>

      {/* testimonials section */}
      <section>

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
        <div className='reviewsScrollbar' id='articles'>
          <div className='scrollbarProgress' ref={progressBarRef}></div>
        </div>

      </section>

      {/* articles section */}
      <section>   

        {/* title container for articles */}
        <div className='titleContainer articles'>
          <h1> Inner Peace Library </h1>
          <span class="wavy-line">∿∿∿∿∿∿∿∿</span>  
          <h1> Explore the World of Yoga </h1>
        </div>

        <div className='articles'>
          <Article
            img={'/articles/balance.jpg'}
            title={'Finding Balance: The Art of Mindful Yoga'}  
            desc={'Discover how practicing mindfulness during yoga can transform your physical and mental well-being.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/power.jpg'}
            title={'The Power of Daily Yoga'}  
            desc={'Uncover the benefits of a consistent yoga practice and how it can energize your life.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/modern.jpg'}
            title={'Yoga for Modern Life'}  
            desc={'Learn yoga techniques designed to combat daily stress and restore inner peace.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/beginner.jpg'}
            title={'Flow and Glow: Yoga for Beginners Made Easy'}  
            desc={'A friendly guide to starting yoga and finding your flow, no matter your experience level.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/soul.jpg'}
            title={'Soulful Movements'}  
            desc={'Dive into the spiritual and philosophical roots of yoga and connect with your soul.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/self-discovery.jpg'}
            title={'Breathe, Bend, and Blossom'}  
            desc={'Discover how yoga can be a journey of personal transformation and self-discovery.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/nature.jpg'}
            title={'Yoga and the Seasons: Aligning Your Practice with Nature'}  
            desc={'Tips for adapting your yoga routine to match the rhythms of nature throughout the year.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/rest.jpg'}
            title={'The Joy of Rest'}  
            desc={'Find out why slowing down and practicing restorative poses is vital for your health.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/confidence.jpg'}
            title={'Empowered Poses: How Yoga Builds Confidence'}  
            desc={'Learn how specific yoga poses can boost your self-esteem and self-awareness.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

          <Article
            img={'/articles/secret.jpg'}
            title={'Soul Stretch Secrets'}  
            desc={'Master key techniques to deepen your stretches and strengthen your practice.'}
          >
          </Article>
          {/* line */}
          <div className='line'></div>

      </div>
      </section>

      {/* footer */}
      <Footer></Footer>

    </div>
    
  );
  
}

export default Home;