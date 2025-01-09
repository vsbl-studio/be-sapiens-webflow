import gsap from "gsap";
export default function () {
    const accordion = document.querySelector(".accordion");
    if (accordion) {
        const items = accordion.querySelectorAll(".accordion-item");
        const imageBackgroundWrapper = document.querySelector(
            ".what-we-do_grid-left"
        );
        const imagesForItems = document.querySelectorAll(".what-we-do_image");
        const intervalTime = 10000; // 10 seconds
        let currentIndex = 0;
        let autoPlayInterval;
        let observer;

        if (imageBackgroundWrapper && imagesForItems.length) {
            imagesForItems.forEach((image) => {
                image.style.opacity = "0";
            });
            imagesForItems[0].style.opacity = "1";
        }

        // Initialize: Close all accordion contents
        function closeAllAccordions(items) {
            items.forEach((item, index) => {
                const content = item.querySelector(".accordion-content");
                gsap.set(content, { height: 0, overflow: "hidden" });
            });
        }

        closeAllAccordions(items);

        items.forEach((item, index) => {
            const header = item.querySelector(".accordion-header");
            const indexEl = header.querySelector(".what-we-do_accordion-index");

            indexEl.innerHTML = `${index < 10 ? "0" : ""}${index + 1}`;
            header.addEventListener("click", () => {
                // Stop autoplay when user interacts
                stopAutoplay();

                // Toggle the clicked item
                if (item.classList.contains("active")) {
                    closeItem(index);
                } else {
                    // Close any open items
                    items.forEach((itm, idx) => {
                        if (itm.classList.contains("active")) {
                            closeItem(idx);
                        }
                    });
                    openItem(index);
                }
            });
        });

        // Function to open an accordion item
        function openItem(index) {
            const item = items[index];
            const content = item.querySelector(".accordion-content");

            // Animate opening
            gsap.to(content, {
                height: "auto",
                duration: 0.5,
                ease: "power2.out",
            });

            if (imageBackgroundWrapper && imagesForItems.length) {
                imagesForItems.forEach((image) => {
                    image.style.opacity = "0";
                });

                if (imagesForItems[index]) {
                    imagesForItems[index].style.opacity = "1";
                }
            }

            // Optionally, add an active class
            item.classList.add("active");
        }

        // Function to close an accordion item
        function closeItem(index) {
            const item = items[index];
            const content = item.querySelector(".accordion-content");

            // Animate closing
            gsap.to(content, {
                height: 0,
                duration: 0.5,
                ease: "power2.in",
            });

            // Optionally, remove the active class
            item.classList.remove("active");
        }

        // Function to cycle through accordion items
        function cycleAccordion() {
            // Close the current item
            closeItem(currentIndex);

            // Move to the next item
            currentIndex = (currentIndex + 1) % items.length;

            // Open the next item
            openItem(currentIndex);
        }

        // Function to start autoplay
        function startAutoplay() {
            // Reset Index for smooth reseting when component gets in view for the next times
            closeAllAccordions(items);
            currentIndex = 0;

            // Open the first item
            openItem(currentIndex);

            // Set interval to cycle through items
            autoPlayInterval = setInterval(cycleAccordion, intervalTime);
        }

        // Function to stop autoplay
        function stopAutoplay() {
            clearInterval(autoPlayInterval);
        }

        // Setup Intersection Observer to detect when accordion is in view
        function setupObserver() {
            const options = {
                root: null, // viewport
                threshold: 0.5, // 50% of the accordion is visible
            };

            observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startAutoplay();
                        // Once autoplay starts, you might want to unobserve
                        // observerInstance.unobserve(entry.target);
                    } else {
                        stopAutoplay(); // Stop autoplay when the component is out of view
                    }
                });
            }, options);

            observer.observe(accordion);
        }

        if (window.innerWidth >= 992) {
            setupObserver();
        } else {
            openItem(0);
        }
    }
}
