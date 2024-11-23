import { lenis } from "./lenisSetup";
import { bodyEl } from "./globalElements";
export default function () {
    const overlayBg = document.querySelector(".overlay-background");
    const anchorsWithHash = document.querySelectorAll('a[href^="#"]');
    const sideOverlays = document.querySelectorAll(".side-overlay");
    const closeOverlayBtns = document.querySelectorAll(
        ".side-overlay_head .button"
    );

    function toggleOverlayBackground(isOpen) {
        if (overlayBg) {
            overlayBg.classList.toggle("open", isOpen);
            overlayBg.style.pointerEvents = isOpen ? "auto" : "none";
        }
    }

    function closeSideOverlays() {
        document
            .querySelector(`a[href="${window.location.hash}"]`)
            ?.classList.remove("active");

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
                e.preventDefault();

                anchor.classList.add("active");
                const targetId = anchor.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

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

    const discardNewsletterBtn = document.querySelector(".discard-newsletter");
    const newsletterCTA = document.querySelector(".newsletter_cta");
    const newsletterModal = document.querySelector(".section_newsletter");

    if (newsletterModal) {
        if (discardNewsletterBtn) {
            discardNewsletterBtn.addEventListener("click", function () {
                sessionStorage.setItem("discardNewsletter", true);
                newsletterCTA.style.transform = "translateX(100%)";
            });
        }

        if (!sessionStorage.getItem("discardNewsletter")) {
            newsletterModal.classList.add("available");
        }
    }
}
