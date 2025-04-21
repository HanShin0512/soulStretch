import { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
    const lenisRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 2), // Cubic easing for smooth stop
            smoothWheel: true,
            smoothTouch: true,
        });

        lenisRef.current = lenis;

        function animate(time) {
            lenis.raf(time);
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true, force: true });
        }
    }, [location.pathname]);

    return (
        <ScrollContext.Provider value={lenisRef}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScroll() {
    return useContext(ScrollContext);
}