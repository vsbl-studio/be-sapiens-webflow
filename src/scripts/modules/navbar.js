import { bodyEl } from "./globalElements";

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

    const burgerMenuScreen = document.querySelector(".mobile-menu");
    const burgerCheckboxes = document.querySelectorAll(".menu-icon__checkbox");
    if (burgerCheckboxes.length) {
        burgerCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                const isChecked = this.checked;

                console.log(isChecked);
                if (isChecked) {
                    // burgerMenuScreen.classList.add("open");

                    bodyEl.classList.add("no-scroll");
                } else {
                    // burgerMenuScreen.classList.remove("open");
                    bodyEl.classList.remove("no-scroll");
                }
                burgerCheckboxes.forEach((cb) => {
                    cb.checked = isChecked;
                });
            });
        });
    }

    const resetMenu = () => {
        burgerCheckboxes.forEach((cb) => (cb.checked = false));
        burgerMenuScreen.classList.remove("open");
        bodyEl.classList.remove("no-scroll");
        navbarScroll.forEach((nav) => nav.classList.remove("visible"));
    };

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
}
