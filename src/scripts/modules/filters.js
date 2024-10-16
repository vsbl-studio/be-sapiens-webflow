export default function () {
    const filterButtons = document.querySelectorAll(".research_filter-button");
    const researchPosts = document.querySelectorAll(".research_list-item");
    const underline = document.querySelector(".filter-underline");

    if (filterButtons) {
        function moveUnderline(button) {
            const buttonRect = button.getBoundingClientRect();

            const filtersWrapper = document.querySelector(
                ".research_filters-wrapper"
            );
            const filtersWrapperRect = filtersWrapper.getBoundingClientRect();

            const leftOffset = buttonRect.left - filtersWrapperRect.left;

            // Move the underline
            underline.style.width = `${buttonRect.width}px`;
            underline.style.transform = `translateX(${leftOffset}px)`;
        }

        // Initial position (set to the first active button)
        const activeButton = document.querySelector(
            ".research_filter-button.active"
        );
        if (activeButton) {
            moveUnderline(activeButton);
        }

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                filterButtons.forEach((btn) => btn.classList.remove("active"));

                button.classList.add("active");

                const category = button.getAttribute("data-research-filter");

                console.log(category);
                researchPosts.forEach((post) => {
                    if (category === "All") {
                        post.style.display = "block";
                        post.classList.remove("hidden");
                    } else {
                        post.style.display = "none";
                        post.classList.add("hidden");

                        if (
                            post.getAttribute("data-post-category") === category
                        ) {
                            post.style.display = "block";
                            post.classList.remove("hidden");
                        }
                    }
                });
                moveUnderline(button);
            });
        });
    }
}
