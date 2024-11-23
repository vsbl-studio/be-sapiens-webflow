export default function () {
    setTimeout(() => {
        const selectItems = document.querySelectorAll(".dropdown-link");
        const selectionPlace = document.querySelector(
            ".form_select .form_label"
        );
        if (selectItems.length && selectionPlace) {
            selectItems.forEach((btn) => {
                btn.addEventListener("click", function () {
                    selectionPlace.style.color = "#000";
                });
            });
        }
    }, 500);
}
