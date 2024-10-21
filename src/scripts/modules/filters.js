import { initializePeopleSwiper } from "./swipers";
export default function () {
    const researchFilterButtons = document.querySelectorAll(
        ".research_filter-button"
    );
    const researchPosts = document.querySelectorAll(".research_list-item");

    const peopleFilterButtons = document.querySelectorAll(
        ".people-slider_filter-button"
    );

    const peoplePosts = document.querySelectorAll(
        ".people-slider_filters-list-item"
    );

    function moveUnderline(filtersWrapper, button) {
        const underline =
            filtersWrapper.parentNode.parentNode.querySelector(
                ".filter-underline"
            );

        const buttonRect = button.getBoundingClientRect();

        const filtersWrapperRect = filtersWrapper.getBoundingClientRect();

        const leftOffset = buttonRect.left - filtersWrapperRect.left;

        // Move the underline
        underline.style.width = `${buttonRect.width}px`;
        underline.style.transform = `translateX(${leftOffset}px)`;
    }

    function filterPostsByCategory(
        filtersWrapper,
        filterButtons,
        posts,
        swiper = null,
        swiperFn = null
    ) {
        // Convert posts to an array if it isn't already
        let allPostsArray = Array.isArray(posts) ? posts : Array.from(posts);
        let filteredPosts = [...allPostsArray]; // Clone the array

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                filterButtons.forEach((btn) => btn.classList.remove("active"));

                button.classList.add("active");

                const category = button.getAttribute("data-post-filter");

                // Filter posts based on the category
                // Update `filteredPosts` with the result of the filter
                filteredPosts = allPostsArray.filter((post) => {
                    // If "All" is selected, return all posts
                    if (category === "All") {
                        return true; // Keep all posts if "All" is selected
                    }

                    // Return posts that match the selected category
                    return post.getAttribute("data-post-category") === category;
                });

                // Now you can render `filteredPosts` in the DOM
                posts.forEach((post) => {
                    // Hide all posts by default
                    post.classList.add("hidden");
                });

                // Show only the filtered posts
                filteredPosts.forEach((filteredPost) => {
                    filteredPost.classList.remove("hidden");
                });

                moveUnderline(filtersWrapper, button);

                if (swiper && swiperFn) {
                    swiperFn(swiper);
                }
            });
        });
    }

    if (peopleFilterButtons.length) {
        const filtersWrapper = document.querySelector(
            ".people-slider_filters-list-wrapper"
        );

        peopleFilterButtons[0].classList.add("active");
        // Initial position (set to the first active button)
        const activeButton = peopleFilterButtons[0];
        if (activeButton) {
            moveUnderline(filtersWrapper, activeButton);
        }

        const peopleSwiper = document.querySelector(
            ".people-slider_list-wrapper"
        );

        filterPostsByCategory(
            filtersWrapper,
            peopleFilterButtons,
            peoplePosts,
            peopleSwiper,
            initializePeopleSwiper
        );

        activeButton.click();
    }
    if (researchFilterButtons.length) {
        const filtersWrapper = document.querySelector(
            ".research_filters-wrapper"
        );

        // Initial position (set to the first active button)
        const activeButton = document.querySelector(
            ".research_filter-button.active"
        );
        if (activeButton) {
            moveUnderline(filtersWrapper, activeButton);
        }

        filterPostsByCategory(
            filtersWrapper,
            researchFilterButtons,
            researchPosts
        );
    }

    if (peopleFilterButtons.length) {
        const filtersWrapper = document.querySelector(
            ".people-slider_filters-list-wrapper"
        );

        peopleFilterButtons[0].classList.add("active");
        // Initial position (set to the first active button)
        const activeButton = peopleFilterButtons[0];
        if (activeButton) {
            moveUnderline(filtersWrapper, activeButton);
        }

        const peopleSwiper = document.querySelector(
            ".people-slider_list-wrapper"
        );

        filterPostsByCategory(
            filtersWrapper,
            peopleFilterButtons,
            peoplePosts,
            peopleSwiper,
            initializePeopleSwiper
        );

        activeButton.click();
    }
}
