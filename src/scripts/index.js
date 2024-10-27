// Libs
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Modules
import { setupLenis } from "./modules/lenisSetup";

import navbar from "./modules/navbar";
import cookieYes from "./modules/cookieYes";
import accordion from "./modules/accordion";
import swipers from "./modules/swipers";
import filters from "./modules/filters";
import video from "./modules/video";
import mailerlite from "./modules/mailerlite";
import modals from "./modules/modals";
import scrollbars from "./modules/scrollbars";
import currentYear from "./modules/currentYear";
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    // Modules
    setupLenis();
    scrollbars();
    navbar();
    cookieYes();
    accordion();
    swipers();
    filters();
    video();
    mailerlite();
    modals();
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
});
