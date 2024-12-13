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
import forms, { customFormValidation } from "./modules/forms";
import insights from "./modules/insights";
import scrollbars from "./modules/scrollbars";
import animation from "./modules/animation";
import currentYear from "./modules/currentYear";
document.addEventListener("DOMContentLoaded", function () {
    // Modules
    setupLenis();
    animation();
    navbar();
    // scrollbars();
    cookieYes();
    accordion();
    forms();
    insights();
    swipers();
    filters();
    video();
    // mailerlite();
    modals();
    customFormValidation();
    currentYear();
});
