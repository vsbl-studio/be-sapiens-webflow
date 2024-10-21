import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Swiper from "swiper";
import {
    Navigation,
    Pagination,
    EffectFade,
    Autoplay,
    Scrollbar,
} from "swiper/modules";
// import "swiper/css";
// Modules
import { bodyEl, overlayEl } from "./modules/globalElements";

import helloModule from "./modules/helloModule";
import navbar from "./modules/navbar";
import accordion from "./modules/accordion";
import swipers from "./modules/swipers";
import filters from "./modules/filters";
import video from "./modules/video";
import mailerlite from "./modules/mailerlite";
import currentYear from "./modules/currentYear";
document.addEventListener("DOMContentLoaded", function () {
    helloModule();
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay, Scrollbar]);
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Modules
    navbar();
    accordion();
    swipers();
    filters();
    video();
    mailerlite();
    currentYear();

    const revealTitles = document.querySelectorAll(".js-reveal-title");

    if (revealTitles) {
        revealTitles.forEach((title) => {
            const splitText = new SplitText(title, { type: "lines" });

            splitText.lines.forEach((line) => {
                const lineWrapper = document.createElement("div");
                lineWrapper.style.overflow = "hidden";
                line.parentNode.insertBefore(lineWrapper, line);
                lineWrapper.appendChild(line);
            });
            gsap.from(splitText.lines, {
                y: 75,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });
    }

    // Get In Touch Modal Toggle
    const closeGetInTouchBtns = document.querySelectorAll(
        ".is-close-get-in-touch"
    );

    if (closeGetInTouchBtns) {
        closeGetInTouchBtns.forEach((btn) => {
            closeGetInTouch(btn);
        });
    }

    if (overlayEl) {
        closeGetInTouch(overlayEl);
    }

    function closeGetInTouch(btn) {
        btn.addEventListener("click", function () {
            // Store the current scroll position
            const scrollPosition = window.scrollY || window.pageYOffset;

            // Listen for hash change
            window.location.hash = "";
            // Remove # symbol from URL
            history.replaceState(null, null, " ");

            // Restore the scroll position after removing the hash
            window.scrollTo(0, scrollPosition);
        });
    }
    function getInTouchVisibility() {
        const getInTouchModal = document.querySelector(".modal_get-in-touch");

        if (window.location.hash === "#get-in-touch") {
            getInTouchModal.classList.add("open");
            bodyEl.classList.add("no-scroll");
            lenis.stop();

            if (overlayEl) {
                overlayEl.classList.add("open");
            }
        } else {
            getInTouchModal.classList.remove("open");
            bodyEl.classList.remove("no-scroll");
            lenis.start();

            if (overlayEl) {
                overlayEl.classList.remove("open");
            }
        }
    }

    // window.addEventListener("load", getInTouchVisibility);

    // window.addEventListener("hashchange", getInTouchVisibility);
});
