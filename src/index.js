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
import helloModule from "./modules/helloModule";
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

    const bodyEl = document.querySelector("body");
    const overlayEl = document.querySelector(".overlay-bg");

    const navbarScroll = document.querySelectorAll(".nav_scroll");
    const navbarFixed = document.querySelectorAll(".nav_fixed");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        let currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;

        if (navbarFixed) {
            if (currentScroll >= 80) {
                navbarFixed.forEach((nav) => {
                    nav.classList.add("hidden");
                });
            } else {
                navbarFixed.forEach((nav) => {
                    nav.classList.remove("hidden");
                });
            }
        }

        if (navbarScroll && !bodyEl.classList.contains("no-scroll")) {
            if (currentScroll >= 200) {
                if (currentScroll < lastScroll) {
                    navbarScroll.forEach((nav) => {
                        nav.classList.add("visible");
                    });
                } else {
                    navbarScroll.forEach((nav) => {
                        nav.classList.remove("visible");
                    });
                }
            } else {
                navbarScroll.forEach((nav) => {
                    nav.classList.remove("visible");
                });
            }
        }

        lastScroll = currentScroll;
    });
    const burgerMenuScreen = document.querySelector(".mobile-menu");
    const burgerCheckboxes = document.querySelectorAll(".menu-icon__checkbox");
    if (burgerCheckboxes.length) {
        burgerCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                const isChecked = this.checked;
                if (isChecked) {
                    burgerMenuScreen.classList.add("open");
                    navbarScroll.forEach((nav) => {
                        nav.classList.add("visible");
                    });
                    bodyEl.classList.add("no-scroll");
                } else {
                    burgerMenuScreen.classList.remove("open");
                    navbarScroll.forEach((nav) => {
                        nav.classList.remove("visible");
                    });
                    bodyEl.classList.remove("no-scroll");
                }
                burgerCheckboxes.forEach((cb) => {
                    cb.checked = isChecked;
                });
            });
        });
    }

    const resetMenu = () => {
        burgerCheckboxes.forEach((cb) => (cb.checked = false));
        burgerMenuScreen.classList.remove("open");
        bodyEl.classList.remove("no-scroll");
        navbarScroll.forEach((nav) => nav.classList.remove("visible"));
    };

    // Reset the menu on page load and when navigating back
    // window.addEventListener("pageshow", resetMenu);

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

    // MIGRATION: Swiper
    // const testimonialSwiper = document.querySelector(".js-testimonials-swiper");

    // if (testimonialSwiper) {
    //     const testimonialSwiperInstance = new Swiper(testimonialSwiper, {
    //         slidesPerView: 1,
    //         centeredSlides: true,
    //         loop: false,
    //         navigation: {
    //             nextEl: ".swiper-button-next",
    //             prevEl: ".swiper-button-prev",
    //         },
    //         pagination: {
    //             el: ".testimonials-pagination",
    //             type: "bullets",
    //             clickable: true,
    //         },
    //         effect: "fade",
    //         speed: 500,
    //     });
    // }

    // let trustedBySwiperInstance;

    // function initTrustedBySwiper() {
    //     const trustedBySwiper = document.querySelector("#trusted-by-slider");

    //     if (trustedBySwiper) {
    //         // Destroy the existing instance if it exists
    //         if (trustedBySwiperInstance) {
    //             trustedBySwiperInstance.destroy(true, true);
    //         }

    //         // Initialize a new instance
    //         trustedBySwiperInstance = new Swiper(trustedBySwiper, {
    //             slidesPerView: 6,
    //             spaceBetween: 0,
    //             loop: true,
    //             speed: 4000,
    //             centeredSlides: true,
    //             autoplay: {
    //                 delay: 0,
    //                 disableOnInteraction: false,
    //             },
    //             breakpoints: {
    //                 320: {
    //                     slidesPerView: 3,
    //                 },
    //                 768: {
    //                     slidesPerView: 4,
    //                 },
    //                 1280: {
    //                     slidesPerView: 5,
    //                     spaceBetween: 16,
    //                 },
    //                 1440: {
    //                     slidesPerView: 6,
    //                     spaceBetween: 20,
    //                 },
    //             },
    //         });
    //     }
    // }

    // initTrustedBySwiper();

    // window.addEventListener("resize", initTrustedBySwiper);

    // const overviewSwiper = document.querySelector(".js-overview-swiper");

    // if (overviewSwiper) {
    //     const overviewSwiperInstance = new Swiper(overviewSwiper, {
    //         slidesPerView: 1.1,
    //         spaceBetween: 8,
    //         loop: false,
    //         centeredSlides: false,
    //         pagination: {
    //             el: ".overview-swiper-progress",
    //             type: "progressbar",
    //         },

    //         speed: 500,
    //         breakpoints: {
    //             576: {
    //                 slidesPerView: 1.2,
    //                 spaceBetween: 20,
    //                 loop: false,
    //                 centeredSlides: false,
    //             },
    //             768: {
    //                 slidesPerView: 1.3,
    //                 spaceBetween: 16,
    //                 loop: false,
    //                 centeredSlides: false,
    //             },
    //             992: {
    //                 slidesPerView: 1,
    //                 spaceBetween: 0,
    //                 centeredSlides: true,
    //                 loop: true,
    //                 navigation: {
    //                     nextEl: ".swiper-overview-next",
    //                     prevEl: ".swiper-overview-prev",
    //                 },
    //                 pagination: {
    //                     el: ".js-overview-pagination",
    //                     type: "bullets",
    //                     clickable: true,
    //                 },
    //             },
    //         },
    //     });
    // }

    // const productConfigSwipersWrappers = document.querySelectorAll(
    //     ".product-config-swiper-wrapper"
    // );

    // if (productConfigSwipersWrappers) {
    //     productConfigSwipersWrappers.forEach((wrapper) => {
    //         const productConfigSlidesCount =
    //             wrapper.querySelectorAll(".swiper-slide");

    //         if (productConfigSlidesCount.length > 0) {
    //             const instanceWrapper = wrapper.querySelector(
    //                 ".js-product-config-swiper"
    //             );

    //             const nextArrow = wrapper.querySelector(".swiper-config-next");
    //             const prevArrow = wrapper.querySelector(".swiper-config-prev");
    //             const progressBar = wrapper.querySelector(
    //                 ".product-config-swiper-progress"
    //             );
    //             const configSwiperInstance = new Swiper(instanceWrapper, {
    //                 slidesPerView: 1.1,
    //                 loop: false,
    //                 centeredSlides: false,
    //                 spaceBetween: 8,
    //                 navigation: {
    //                     nextEl: nextArrow,
    //                     prevEl: prevArrow,
    //                 },
    //                 scrollbar: {
    //                     el: progressBar,
    //                     draggable: true,
    //                     // type: "progressbar",
    //                 },
    //                 speed: 500,
    //                 breakpoints: {
    //                     576: {
    //                         slidesPerView: 1.3,
    //                         spaceBetween: 16,
    //                     },
    //                     768: {
    //                         slidesPerView: 1.5,
    //                         spaceBetween: 20,
    //                     },
    //                     992: {
    //                         slidesPerView: 3.1,
    //                         spaceBetween: 20,
    //                     },
    //                 },
    //             });
    //         }
    //     });
    // }

    const accordionsInit = () => {
        const accordions = [
            ...document.querySelectorAll(".js-accordion-header"),
        ];

        if (accordions.length > 0) {
            accordions.forEach((item, index) => {
                const content = item.parentElement.querySelector(
                    ".accordion-item_body"
                );
                const iconPlus = item.querySelector(".plus");
                const iconMinus = item.querySelector(".minus");

                // Initialize the accordions
                if (
                    index === 0 &&
                    !item.classList.contains("mobile-menu_item")
                ) {
                    item.classList.add("is-active");
                    content.style.height = "auto";
                    iconPlus.style.display = "none";
                    iconMinus.style.display = "block";
                } else {
                    content.style.height = "0px";
                    item.classList.remove("is-active");
                    iconPlus.style.display = "block";
                    iconMinus.style.display = "none";
                }

                item.onclick = () => {
                    const isActive = item.classList.contains("is-active");

                    if (isActive) {
                        content.style.height = "0px";
                        item.classList.remove("is-active");
                        iconPlus.style.display = "block";
                        iconMinus.style.display = "none";
                    } else {
                        accordions.forEach((acc) => {
                            const accContent = acc.parentElement.querySelector(
                                ".accordion-item_body"
                            );
                            const accIconPlus = acc.querySelector(".plus");
                            const accIconMinus = acc.querySelector(".minus");

                            accContent.style.height = "0px";
                            acc.classList.remove("is-active");
                            accIconPlus.style.display = "block";
                            accIconMinus.style.display = "none";
                        });

                        content.style.height = "auto";
                        const getHeight = content.clientHeight + "px";
                        content.style.height = "0px";
                        setTimeout(() => {
                            content.style.height = getHeight;
                        }, 0);
                        item.classList.add("is-active");
                        iconPlus.style.display = "none";
                        iconMinus.style.display = "block";
                    }
                };
            });
        }
    };

    accordionsInit();

    // const observer = new IntersectionObserver(
    //     (entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 const video = entry.target.querySelector("video");
    //                 if (video) {
    //                     playVideo(video);
    //                 }
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     },
    //     {
    //         threshold: 0.5,
    //     }
    // );

    // videoWrappers.forEach((wrapper) => {
    //     const video = wrapper.querySelector("video");
    //     if (video) {
    //         video.hasPlayed = false;
    //         observer.observe(wrapper);
    //     }
    // });

    // MIGRATION: Animation
    // const overviewTableRows = document.querySelectorAll(".overview-table-row");

    // function growBorderToRight(rows) {
    //     rows.forEach((row) => {
    //         gsap.to(row, {
    //             scrollTrigger: {
    //                 trigger: row,
    //                 start: "top 80%",
    //                 once: true,
    //             },
    //             onStart: () => {
    //                 let borders;

    //                 if (row.classList.contains("position-top")) {
    //                     borders = [row];
    //                 } else {
    //                     borders = row.querySelectorAll(".js-animated-border");
    //                 }

    //                 borders.forEach((border) => {
    //                     border.style.setProperty("width", "100%");
    //                 });
    //             },
    //         });
    //     });
    // }

    // if (overviewTableRows.length) {
    //     growBorderToRight(overviewTableRows);
    // }

    // MIGRATION: Filters

    // const teamFilterBtns = document.querySelectorAll(
    //     ".team_members-filter-item"
    // );

    // if (teamFilterBtns.length) {
    //     const members = document.querySelectorAll(".team_members-list-wrapper");

    //     teamFilterBtns.forEach((filter) => {
    //         filter.addEventListener("click", function (e) {
    //             e.preventDefault();

    //             const ID = filter.getAttribute("id");

    //             teamFilterBtns.forEach((btn) => {
    //                 if (btn.getAttribute("id") === ID) {
    //                     btn.classList.add("active");
    //                 } else {
    //                     btn.classList.remove("active");
    //                 }
    //             });

    //             members.forEach((memb) => {
    //                 if (memb.getAttribute("data-members") == ID) {
    //                     memb.classList.add("active");
    //                 } else {
    //                     memb.classList.remove("active");
    //                 }
    //             });
    //         });
    //     });
    // }

    // MIGRATION: Mega Menu

    // const megaMenuLinks = document.querySelectorAll(".products-menu-toggle");
    // const megaMenu = document.querySelector(".products-mega-menu");
    // function closeMegaMenu() {
    //     megaMenuLinks.forEach((b) => {
    //         b.classList.remove("open");
    //     });
    //     megaMenu.classList.remove("open");
    //     bodyEl.classList.remove("no-scroll");
    //     lenis.start();
    // }
    // megaMenuLinks.forEach((btn) => {
    //     btn.addEventListener("click", function (e) {
    //         e.preventDefault();
    //         if (this.classList.contains("open")) {
    //             closeMegaMenu();
    //         } else {
    //             megaMenuLinks.forEach((b) => {
    //                 b.classList.add("open");
    //             });
    //             megaMenu.classList.add("open");
    //             bodyEl.classList.add("no-scroll");
    //             lenis.stop();
    //         }
    //     });
    // });

    // // Close the mega menu when clicking outside of it
    // document.addEventListener("click", function (e) {
    //     // If the click is not inside the mega menu or on the menu toggle button
    //     if (
    //         !megaMenu.contains(e.target) &&
    //         !Array.from(megaMenuLinks).some((link) => link.contains(e.target))
    //     ) {
    //         if (megaMenu.classList.contains("open")) {
    //             closeMegaMenu();
    //         }
    //     }
    // });

    // Mailerlite Newsletter
    const mailerliteForm = document.getElementById("wf-form-Newsletter-Form");

    if (mailerliteForm) {
        const newsletterSuccess = document.getElementById("newsletter-success");
        const newsletterError = document.getElementById("newsletter-error");
        const newsletterSubmit = document.querySelector(".newsletter-submit");

        const emailInput = document.getElementById("Subscriber-Email");
        const privacyCheckbox = document.getElementById(
            "Newsletter-Privacy-Policy"
        );

        const emailRequired = document.getElementById("email-required");
        const privacyRequired = document.getElementById(
            "newsletter-privacy-error"
        );

        emailInput.addEventListener("input", function () {
            emailRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });

        privacyCheckbox.addEventListener("change", function () {
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });
        newsletterSubmit.addEventListener("click", function (e) {
            e.preventDefault();

            let isValid = true;

            emailRequired.style.display = "none";
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";

            if (!privacyCheckbox.checked) {
                isValid = false;
                privacyRequired.style.display = "flex";
            }

            if (emailInput.value.trim() === "") {
                emailRequired.style.display = "flex";
                isValid = false;
            }

            const data = {
                email: emailInput.value,
            };

            if (isValid) {
                fetch("https://connect.mailerlite.com/api/subscribers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjhhODg3NjMwNzhhOTIxNDg2YTA4NzFjOTA4ZGU3ZWIyNWEyMjA1MGQ0YWM1YjNiNjBjM2RkNzkxOTUwMWVkNjk5MDQ3MTcwOGExY2Y5NDIiLCJpYXQiOjE3MjY2NTg2OTAuNjgxMjkzLCJuYmYiOjE3MjY2NTg2OTAuNjgxMjk3LCJleHAiOjQ4ODIzMzIyOTAuNjc3MzY4LCJzdWIiOiIxMTA4NTUyIiwic2NvcGVzIjpbXX0.ueZVWOw66s2AN4cmmD5mZMdKcvZ4jbB2tJcNxKtNywwVFTnevBkQuy8S42lmozxotpecYQ5IwzDqJMf66AchJSpAW7mxlO86Ck0BhwdS7Lfaeuvp5mlkt6s2oHTKErPjGHewStUcMdizRMn432OTuwokJ5PexV-c-0xGYAS59q2pwQZC2L9v61JsPO2ROBB0JXXAbUqS56N52Wp5oxHIztUdkyrF8cEaInrxf4o2AvJ6jMzgPdh73fwCGUSFw9lebsfgveFvjeDyOKWj9C6qAXn9PnE-_knKsj_LVWfCy9yntmf_smwQ1LUcuMbrXcuwI-oh15ZEfdrzl2rPJqlBFPUVx3ItzesbwmlhmRgKyeDRvOQ3E6WaXdErTMD-jb8MX2izGs0I36GO71eARhXBXIA5gtGWBKGujqkzKkJbSsvkSrXvoNxhVeGqw9pkoD3VoQ9tHJssws3WC3nyn6tBrHZlQGqEZ9EEoVig8yZF2q6xpgroDMxoX204DD8YkThSHO1ZfkM-wmNL64-XmW-ZZDqrQNoAm3uwJYM1RfMxFfAXp9LWY5_YKt5DiBUO57EGrljkH4BHvQGa6ObfrYptw0Rr2QnUPGNSFRFQsy3qpXrnivkqw5R6TtuACdCRYGgw3N8g-D1hoIrv5Qn2Jy225znQjgmY_XfqozMv_FNMfcE",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // console.log("Success:", data);

                        mailerliteForm.style.display = "none";

                        if (newsletterSuccess) {
                            newsletterSuccess.style.display = "block";
                        }
                    })
                    .catch((error) => {
                        if (newsletterError) {
                            newsletterError.style.display = "block";
                        }
                        console.error("Error:", error);
                    });
            }
        });
    }

    const currentYear = new Date().getFullYear();
    $(`[data="year"]`).html(currentYear);
});
