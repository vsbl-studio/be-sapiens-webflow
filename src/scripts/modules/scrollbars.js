import { OverlayScrollbars } from "overlayscrollbars";

export default function () {
    const overlays = document.querySelectorAll(".side-overlay_content");

    if (overlays.length) {
        overlays.forEach((el) => {
            OverlayScrollbars(el, {
                scrollbars: {
                    theme: "os-theme-dark",
                },
            });
        });
    }
}
