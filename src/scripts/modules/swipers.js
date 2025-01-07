import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

export default function () {
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);
    const slideSpeed = 1000;

    const syncSliderSection = document.querySelector(".js-sync-slider_section");

    if (syncSliderSection) {
        function initializeSyncSlider(initSlider) {
            const syncSliderImageSwiper = syncSliderSection.querySelector(
                ".js-sync-slider_image-swiper"
            );
            const syncSliderContentSwiper = syncSliderSection.querySelector(
                ".js-sync-slider_content-swiper"
            );
            const progressLine = syncSliderSection.querySelector(
                ".js-sync-slider_progress"
            );
            const progressCounter = syncSliderSection.querySelector(
                ".js-sync-slider_counter"
            );
            const prevButton = syncSliderSection.querySelector(
                ".js-sync-slider_prev"
            );
            const nextButton = syncSliderSection.querySelector(
                ".js-sync-slider_next"
            );

            let slidesCount =
                syncSliderContentSwiper.querySelectorAll(
                    ".swiper-slide"
                ).length;

            if (slidesCount < 10) {
                slidesCount = `0${slidesCount}`;
            }

            if (progressCounter) {
                progressCounter.innerHTML = `01 / ${slidesCount}`;
            }

            if (initSlider) {
                const syncSliderImageSwiperInstance = new Swiper(
                    syncSliderImageSwiper,
                    {
                        spaceBetween: 30,
                        autoplay: {
                            delay: 6000,
                            disableOnInteraction: false,
                        },
                        slidesPerView: 1,
                        loop: true,
                        centeredSlides: true,
                        effect: "fade",
                        speed: slideSpeed,
                    }
                );

                const syncSliderContentSwiperInstance = new Swiper(
                    syncSliderContentSwiper,
                    {
                        spaceBetween: 30,
                        autoplay: {
                            delay: 6000,
                            disableOnInteraction: false,
                        },
                        slidesPerView: 1,
                        loop: true,
                        centeredSlides: false,
                        pagination: {
                            el: ".overview-swiper-progress",
                            type: "progressbar",
                        },
                        navigation: {
                            prevEl: prevButton,
                            nextEl: nextButton,
                        },
                        speed: slideSpeed,
                        on: {
                            autoplayTimeLeft(s, time, progress) {
                                if (progressLine) {
                                    progressLine.style.setProperty(
                                        "width",
                                        `${100 - 100 * progress}%`
                                    );
                                }
                            },
                            slideChange: function () {
                                const activeIndex = this.activeIndex;
                                const realIndex = this.realIndex;

                                let currentSlideIndex = realIndex + 1;

                                const activeSlide = this.slides[activeIndex];

                                const sourceButton = activeSlide.querySelector(
                                    ".cases-slider-cta.hidden a"
                                );

                                const targetButton = document.getElementById(
                                    "js-cases-dynamic-button"
                                );

                                if (targetButton && sourceButton) {
                                    targetButton.setAttribute(
                                        "href",
                                        sourceButton.getAttribute("href")
                                    );
                                }

                                if (progressCounter) {
                                    progressCounter.innerHTML = `${
                                        currentSlideIndex < 10
                                            ? "0" + currentSlideIndex
                                            : currentSlideIndex
                                    }  / ${slidesCount}`;
                                }

                                if (currentSlideIndex === slidesCount) {
                                    setTimeout(() => {
                                        syncSliderImageSwiperInstance.slideToLoop(
                                            0,
                                            0
                                        );
                                        this.slideToLoop(0, 0);
                                    }, 3000);
                                }

                                syncSliderImageSwiperInstance.slideToLoop(
                                    realIndex
                                );
                            },
                        },
                    }
                );
            }
        }

        initializeSyncSlider(false);
        const observerOptions = {
            root: null, // Observes within the viewport
            threshold: 0.5, // Trigger when 50% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    initializeSyncSlider(true);
                    observer.unobserve(entry.target); // Stop observing once triggered
                }
            });
        }, observerOptions);

        observer.observe(syncSliderSection);
    }
}
let peopleSwiperInstance = null;

export function initializePeopleSwiper(peopleSwiper, slideSpeed = 1000) {
    if (peopleSwiper) {
        if (peopleSwiperInstance) {
            peopleSwiperInstance.destroy(true, true); // Destroy the previous instance
        }

        peopleSwiperInstance = new Swiper(peopleSwiper, {
            spaceBetween: 20,
            slidesPerView: 1.2,
            loop: false,
            centeredSlides: false,
            navigation: {
                nextEl: ".people-button-next",
                prevEl: ".people-button-prev",
            },
            speed: slideSpeed,
            breakpoints: {
                0: {
                    spaceBetween: 20,
                    slidesPerView: 1.2,
                },
                576: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });

        return peopleSwiperInstance;
    }
}
