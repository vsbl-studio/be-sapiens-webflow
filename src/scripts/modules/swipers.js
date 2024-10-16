import Swiper from "swiper";
import {
    Navigation,
    Pagination,
    EffectFade,
    Autoplay,
    Scrollbar,
} from "swiper/modules";

export default function () {
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay, Scrollbar]);

    const testimonialImageSwiper = document.querySelector(
        ".js-testimonials_image-swiper"
    );
    const testimonialContentSwiper = document.querySelector(
        ".js-testimonials_content-swiper"
    );

    if (testimonialImageSwiper && testimonialContentSwiper) {
        const progressLine = document.querySelector(".autoplay-progress");
        const progressCounter = document.querySelector(
            ".tetimonials_progress-counter"
        );
        const slideSpeed = 1000;
        let slidesCount =
            testimonialContentSwiper.querySelectorAll(".swiper-slide").length;

        if (slidesCount < 10) {
            slidesCount = `0${slidesCount}`;
        }

        const testimonialImageSwiperInstance = new Swiper(
            testimonialImageSwiper,
            {
                spaceBetween: 30,
                slidesPerView: 1,
                loop: true,
                centeredSlides: true,
                effect: "fade",
                speed: slideSpeed,
            }
        );

        const testimonialContentSwiperInstance = new Swiper(
            testimonialContentSwiper,
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
                    nextEl: ".testimonials-button-next",
                    prevEl: ".testimonials-button-prev",
                },
                speed: slideSpeed,
                on: {
                    autoplayTimeLeft(s, time, progress) {
                        progressLine.style.setProperty(
                            "width",
                            `${100 - 100 * progress}%`
                        );
                    },

                    slideChange: function () {
                        const currentSlideIndex = this.realIndex + 1;
                        progressCounter.innerHTML = `${
                            currentSlideIndex < 10
                                ? "0" + currentSlideIndex
                                : currentSlideIndex
                        }  / ${slidesCount}`;

                        testimonialImageSwiperInstance.slideTo(this.realIndex);
                    },
                },
            }
        );
    }
}
