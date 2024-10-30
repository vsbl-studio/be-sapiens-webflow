import { bodyEl } from "./globalElements";
import gsap from "gsap";
export default function () {
    const navbarScroll = document.querySelectorAll(".nav_scroll");
    const navbarFixed = document.querySelectorAll(".nav_fixed");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        let currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;

        if (navbarFixed) {
            if (currentScroll >= 80) {
                navbarFixed.forEach((nav) => {
                    nav.classList.add("hidden");
                });
            } else {
                navbarFixed.forEach((nav) => {
                    nav.classList.remove("hidden");
                });
            }
        }

        if (navbarScroll && !bodyEl.classList.contains("no-scroll")) {
            if (currentScroll >= 200) {
                if (currentScroll < lastScroll) {
                    navbarScroll.forEach((nav) => {
                        nav.classList.add("visible");
                    });
                } else {
                    navbarScroll.forEach((nav) => {
                        nav.classList.remove("visible");
                    });
                }
            } else {
                navbarScroll.forEach((nav) => {
                    nav.classList.remove("visible");
                });
            }
        }

        lastScroll = currentScroll;
    });

    // Burger menu
    const burgerMenuScreen = document.querySelector(".mobile-menu");
    const burgerCheckboxes = document.querySelectorAll(".menu-icon__checkbox");
    if (burgerMenuScreen && burgerCheckboxes.length) {
        burgerCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                const isChecked = this.checked;

                if (isChecked) {
                    setTimeout(() => {
                        burgerMenuScreen.classList.add("open");

                        bodyEl.classList.add("no-scroll");
                    }, 500);
                } else {
                    setTimeout(() => {
                        burgerMenuScreen.classList.remove("open");
                        bodyEl.classList.remove("no-scroll");
                    }, 500);
                }
                burgerCheckboxes.forEach((cb) => {
                    cb.checked = isChecked;
                });
            });
        });

        const burgerCTA = document.querySelector(".js-mobile-menu-cta .button");

        burgerCTA.classList.remove("is-secondary");
        burgerCTA.classList.add("is-primary");
    }

    const resetMenu = () => {
        burgerCheckboxes.forEach((cb) => (cb.checked = false));
        burgerMenuScreen.classList.remove("open");
        bodyEl.classList.remove("no-scroll");
        navbarScroll.forEach((nav) => nav.classList.remove("visible"));
    };

    // Mobile Menu Dropwodn
    const dropdownHead = document.querySelector(".mobile-dropdown_head");
    const dropdownBody = document.querySelector(".mobile-dropdown_body");

    if (dropdownHead && dropdownBody) {
        gsap.set(dropdownBody, {
            height: 0,
            overflow: "hidden",
            marginBottom: 0,
        });

        let isOpen = false;

        dropdownHead.addEventListener("click", function () {
            if (isOpen) {
                gsap.to(dropdownBody, {
                    height: 0,
                    marginBottom: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
                dropdownHead.classList.remove("open");
            } else {
                gsap.to(dropdownBody, {
                    height: "auto",
                    marginBottom: "1rem",
                    duration: 1,
                    ease: "power2.out",
                    onStart: function () {
                        gsap.set(dropdownBody, {
                            height: dropdownBody.scrollHeight,
                        });
                    },
                });
                dropdownHead.classList.add("open");
            }

            isOpen = !isOpen;
        });
    }

    const dropdownMenuLinks = document.querySelectorAll(".nav-dropdown-toggle");
    dropdownMenuLinks.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            if (!e.target.classList.contains("dropdown-menu-link")) {
                e.preventDefault();

                const dropdownContent = btn.querySelector(".nav-dropdown-menu");
                if (btn.classList.contains("open")) {
                    btn.classList.remove("open");
                    dropdownContent.classList.remove("open");
                } else {
                    dropdownMenuLinks.forEach((b) => {
                        btn.classList.add("open");
                        dropdownContent.classList.add("open");
                    });
                }
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        const openDropdowns = document.querySelectorAll(
            ".nav-dropdown-toggle.open"
        );

        openDropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                const dropdownContent =
                    dropdown.querySelector(".nav-dropdown-menu");
                dropdown.classList.remove("open");
                dropdownContent.classList.remove("open");
            }
        });
    });
}
