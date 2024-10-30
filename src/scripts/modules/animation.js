import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function () {
    const revealTitles = document.querySelectorAll(".js-reveal-title");

    if (revealTitles) {
        revealTitles.forEach((title) => {
            const splitText = new SplitText(title, { type: "words" });

            splitText.words.forEach((word) => {
                const wordWrapper = document.createElement("div");
                wordWrapper.style.overflow = "hidden";
                wordWrapper.style.display = "inline-block";
                word.parentNode.insertBefore(wordWrapper, word);
                wordWrapper.appendChild(word);
            });
            gsap.from(splitText.words, {
                y: 100,
                opacity: 1,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                delay: 0.5,

                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });
        });
    }

    const revealTexts = document.querySelectorAll(".js-reveal-text");

    if (revealTexts) {
        revealTexts.forEach((text) => {
            const splitText = new SplitText(text, { type: "lines" });

            splitText.lines.forEach((line) => {
                const lineWrapper = document.createElement("div");
                lineWrapper.style.overflow = "hidden";
                line.parentNode.insertBefore(lineWrapper, line);
                lineWrapper.appendChild(line);
            });
            gsap.from(splitText.lines, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                delay: 1.5,
                scrollTrigger: {
                    trigger: text,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });
        });
    }

    const revealButtons = document.querySelectorAll(".js-reveal-button");

    revealButtons.forEach((btn) => {
        gsap.set(btn, { y: 50, opacity: 0 });

        gsap.to(btn, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            delay: 2.5,
            scrollTrigger: {
                trigger: btn,
                start: "top 100%",
                toggleActions: "play none none none",
            },
        });
    });

    // Text Underline line by line
    const underlinedTextHoverblocks = document.querySelectorAll(
        ".js-hover-text-parent"
    );

    if (underlinedTextHoverblocks.length) {
        underlinedTextHoverblocks.forEach((element) => {
            element.addEventListener("mouseenter", () => {
                element.classList.add("hovered");
            });

            element.addEventListener("mouseleave", () => {
                element.classList.add("leaving-hover");

                setTimeout(() => {
                    element.classList.remove("leaving-hover");
                    element.classList.remove("hovered");
                }, 500);
            });
        });
    }
}
