export default function () {
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
