import jqueryValidate from "jquery-validation";

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
export const customFormValidation = function () {
    // Find all forms
    const $forms = $("form");

    // Add custom methods
    $.validator.addMethod("letters", function (value, element) {
        return (
            $.validator.methods.required.call(this, value, element) ||
            /^[\p{L}\s]*$/u.test(value)
        );
    });
    $.validator.addMethod("phone", function (value, element) {
        return (
            $.validator.methods.required.call(this, value, element) ||
            /^[\d\s().+-]+$/.test(value)
        );
    });

    $forms.each(function () {
        $(".form_input-error").hide();
        $(".form_privacy-error").hide();
        $(".form_newsletter-input-error").hide();
        $(".form_newsletter-privacy-error").hide();

        const $form = $(this);

        $form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    letters: true,
                },
                "E-mail": {
                    required: true,
                    email: true,
                },
                "Newsletter-Email": {
                    required: true,
                    email: true,
                },
                Phone: {
                    required: true,
                    minlength: 5,
                    phone: true,
                },
                Message: {
                    required: false,
                    minlength: 3,
                },
                "Privacy-Policy": {
                    required: true,
                },
                "Privacy-Policy-Newsletter": {
                    required: true,
                },
            },
            messages: {
                name: "This field is required.",
                "E-mail": "Please provide a valid email.",
                Phone: "Please provide a valid phone number.",
                Message: "Please enter your message.",
                "Privacy-Policy":
                    "You must agree with Privacy Policy to proceed.",
            },
            errorPlacement: function (error, element) {
                const $errorWrapper = element
                    .closest(".form_field-wrapper")
                    .find(".form_input-error");

                const $newsletterErrorWrapper = element
                    .closest(".form_newsletter-input-wrapper")
                    .find(".form_newsletter-input-error");

                if ($errorWrapper.length) {
                    $errorWrapper.show();
                } else if (element.attr("name") === "Newsletter-Email") {
                    $newsletterErrorWrapper.show();
                } else if (element.attr("name") === "Privacy-Policy") {
                    const $privacyErrorWrapper = element
                        .closest(".form_pp-checkbox-wrapper")
                        .find(".form_privacy-error");
                    $privacyErrorWrapper.show();
                } else if (
                    element.attr("name") === "Privacy-Policy-Newsletter"
                ) {
                    const $privacyErrorWrapper = element
                        .closest(".form_pp-checkbox-wrapper")
                        .find(".form_newsletter-privacy-error");
                    $privacyErrorWrapper.show();
                } else {
                    error.insertAfter(element);
                }
            },
            success: function (label, element) {
                const $errorWrapper = $(element)
                    .closest(".form_field-wrapper")
                    .find(".form_input-error");

                const $newsletterErrorWrapper = $(element)
                    .closest(".form_newsletter-input-wrapper")
                    .find(".form_newsletter-input-error");

                if ($errorWrapper.length) {
                    $errorWrapper.hide();
                } else if (element.name === "Newsletter-Email") {
                    $newsletterErrorWrapper.hide();
                } else if (element.name === "Privacy-Policy") {
                    const $privacyErrorWrapper = $(element)
                        .closest(".form_pp-checkbox-wrapper")
                        .find(".form_privacy-error");
                    $privacyErrorWrapper.hide();
                } else if (element.name === "Privacy-Policy-Newsletter") {
                    const $privacyErrorWrapper = $(element)
                        .closest(".form_pp-checkbox-wrapper")
                        .find(".form_newsletter-privacy-error");
                    $privacyErrorWrapper.hide();
                }
            },
        });
    });
};
