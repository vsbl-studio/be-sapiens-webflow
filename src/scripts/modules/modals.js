import { lenis } from "./lenisSetup";
import { bodyEl } from "./globalElements";
export default function () {
    const overlayBg = document.querySelector(".overlay-background");
    const anchorsWithHash = document.querySelectorAll('a[href^="#"]');
    const sideOverlays = document.querySelectorAll(".side-overlay");
    const closeOverlayBtns = document.querySelectorAll(
        ".side-overlay_head .button"
    );

    console.log(anchorsWithHash);
    function toggleOverlayBackground(isOpen) {
        if (overlayBg) {
            overlayBg.classList.toggle("open", isOpen);
            overlayBg.style.pointerEvents = isOpen ? "auto" : "none";
        }
    }

    function closeSideOverlays() {
        sideOverlays.forEach((el) => el.classList.remove("open"));
        toggleOverlayBackground(false);
        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
        lenis.start();
        bodyEl.classList.remove("no-scroll");
    }

    if (overlayBg) {
        overlayBg.addEventListener("click", closeSideOverlays);
    }

    if (closeOverlayBtns.length) {
        closeOverlayBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                closeSideOverlays();
            });
        });
    }

    if (anchorsWithHash.length) {
        anchorsWithHash.forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                console.log("Click");
                e.preventDefault();

                const targetId = anchor.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

                console.log(targetElement);
                if (
                    targetElement &&
                    targetElement.classList.contains("side-overlay")
                ) {
                    closeSideOverlays();
                    targetElement.classList.add("open");
                    toggleOverlayBackground(true);

                    lenis.stop();
                    bodyEl.classList.add("no-scroll");
                }
            });
        });
    }

    function handleModalVisibility() {
        const hash = window.location.hash.substring(1);

        if (sideOverlays.length) {
            const targetOverlay = Array.from(sideOverlays).find(
                (el) => el.getAttribute("id") === hash
            );

            if (targetOverlay) {
                targetOverlay.classList.add("open");
                toggleOverlayBackground(true);
                lenis.stop();
                bodyEl.classList.add("no-scroll");
            }
        }
    }

    window.addEventListener("load", handleModalVisibility);
}
