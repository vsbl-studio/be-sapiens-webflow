import { initializePeopleSwiper } from "./swipers";
export default function () {
    // Research Posts Component Filter
    const researchFilterButtons = document.querySelectorAll(
        ".research-filters_button"
    );

    const researchPosts = document.querySelectorAll(".research_list-item");

    if (researchFilterButtons.length && researchPosts.length) {
        const filtersWrapper = document.querySelector(
            ".research-filters_outer-list-wrapper"
        );

        // Initial position (set to the first active button)
        const activeButton = researchFilterButtons[0];
        if (activeButton) {
            moveUnderline(filtersWrapper, activeButton);
        }

        filterPostsByCategory(
            filtersWrapper,
            researchFilterButtons,
            researchPosts
        );

        activeButton.click();
    }

    // People Slider Filters
    const peopleFilterButtons = document.querySelectorAll(
        ".people-slider_filter-button"
    );
    const peoplePosts = document.querySelectorAll(
        ".js-people-slider_list-item"
    );

    if (peopleFilterButtons.length && peoplePosts.length) {
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

    // Insights Filter Active State Management.
    // Filters are manipulated by Finsweet Attributes.
    const insightsFilterWrapper = document.querySelector(
        ".insights-hero_filters-items-wrapper"
    );

    if (insightsFilterWrapper) {
        const insightsFilterButtons = insightsFilterWrapper.querySelectorAll(
            ".insights-hero_filter-button"
        );

        moveUnderline(insightsFilterWrapper, insightsFilterButtons[0]);

        insightsFilterButtons[0].classList.add("active");
        insightsFilterButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                insightsFilterButtons.forEach((b) => {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
                moveUnderline(insightsFilterWrapper, btn);
            });
        });
    }

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
}
