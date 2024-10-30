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
import animation from "./modules/animation";
import currentYear from "./modules/currentYear";
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    // Modules
    setupLenis();
    animation();
    navbar();
    scrollbars();
    cookieYes();
    accordion();
    swipers();
    filters();
    video();
    mailerlite();
    modals();
    currentYear();
});
