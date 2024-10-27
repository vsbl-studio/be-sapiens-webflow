import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

export default function () {
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);
    const slideSpeed = 1000;

    const syncSliderSection = document.querySelector(".js-sync-slider_section");

    if (syncSliderSection) {
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
            syncSliderContentSwiper.querySelectorAll(".swiper-slide").length;

        if (slidesCount < 10) {
            slidesCount = `0${slidesCount}`;
        }

        const syncSliderImageSwiperInstance = new Swiper(
            syncSliderImageSwiper,
            {
                spaceBetween: 30,
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
                        const currentSlideIndex = this.realIndex + 1;

                        if (progressCounter) {
                            progressCounter.innerHTML = `${
                                currentSlideIndex < 10
                                    ? "0" + currentSlideIndex
                                    : currentSlideIndex
                            }  / ${slidesCount}`;
                        }

                        syncSliderImageSwiperInstance.slideTo(this.realIndex);
                    },
                },
            }
        );
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
