export default function () {
    const mutationsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const pagination = document.querySelector(".pagination");

            if (pagination) {
                const paginationItems = document.querySelectorAll(
                    ".button.is-pagination"
                );
                if (paginationItems.length <= 1) {
                    pagination.style.opacity = "0";
                } else {
                    pagination.style.opacity = "1";
                }
            }
        });
    });

    mutationsObserver.observe(document.body, {
        childList: true, // Watches for the addition/removal of child nodes
        subtree: true, // Watches for changes in all descendant nodes
    });
}
