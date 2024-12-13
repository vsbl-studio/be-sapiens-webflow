import Lenis from "lenis";

export const lenis = new Lenis({
    smooth: true,
    smoothTouch: true,
    direction: "vertical",
    prevent: (node) => node.classList.contains("side-overlay"),
});

export function setupLenis() {
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}
