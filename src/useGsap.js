import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsap = (targetRef, gsapOptions, scrollTriggerOptions) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const animation = gsap.to(targetRef.current, {
      ...gsapOptions,
      scrollTrigger: scrollTriggerOptions,
    });

    return () => {
      animation.kill();
      if (scrollTriggerOptions) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [targetRef, gsapOptions, scrollTriggerOptions]);
};

export default useGsap;