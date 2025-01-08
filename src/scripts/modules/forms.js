import jqueryValidate from "jquery-validation";
const client = new BeehiivClient({
    token: "wd4FnQVcPGShzvIhjccLSXCG6qMwPrHcaB4bhIijBray4AqJhIVfzBP60mLcIHpe",
});
import { BeehiivClient } from "@beehiiv/sdk";

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

    // Submission function
    async function submitToBeehiiv(email) {
        try {
            const response = await client.subscriptions.create(
                "pub_93d89ae0-4b60-47ca-b79f-d488c58ac9bd",
                {
                    email: email,
                    referringSite: "Sapiens", // Replace with dynamic data if needed
                }
            );
            console.log("Subscriber added successfully:", response);
        } catch (error) {
            console.error("Error adding subscriber:", error);
        }
    }

    // Use MutationObserver to detect form success
    const formObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.type === "childList" &&
                $(mutation.target).hasClass("w-form-done")
            ) {
                const $emailField = $(".your-email-field-class"); // Replace with the actual class or ID of your email input
                validateAndSubmit($emailField);
            }
        });
    });

    // Observe the success message container
    const successContainer = document.querySelector(".w-form-done");
    if (successContainer) {
        formObserver.observe(successContainer, {
            childList: true,
        });
    }

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

            errorPlacement: function (error, element) {
                // Handle input errors
                if (
                    element.attr("name") === "name" ||
                    element.attr("name") === "E-mail" ||
                    element.attr("name") === "Phone"
                ) {
                    const $inputWrapper = element
                        .closest(".form_field-wrapper")
                        .find(".form_input-error");
                    $inputWrapper.show();
                } else if (element.attr("name") === "Privacy-Policy") {
                    const $privacyWrapper = element
                        .closest(".form_checkbox")
                        .find(".form_privacy-error");

                    $privacyWrapper.show();
                } else if (element.attr("name") === "Newsletter-Email") {
                    const $newsletterErrorWrapper = element
                        .closest(".form_newsletter-input-wrapper")
                        .find(".form_newsletter-input-error");
                    $newsletterErrorWrapper.show();
                } else if (
                    element.attr("name") === "Privacy-Policy-Newsletter"
                ) {
                    const $privacyErrorWrapper = element
                        .closest(".form_pp-wrapper")
                        .next(".form_newsletter-privacy-error");
                    $privacyErrorWrapper.show();

                    const $modalPrivacyErrorWrapper = element
                        .closest(".form_pp-checkbox-wrapper")
                        .find(".form_newsletter-privacy-error");

                    $modalPrivacyErrorWrapper.show();
                } else {
                    error.insertAfter(element); // Default placement
                }
            },
            success: function (label, element) {
                // Hide input errors on success

                if (
                    element.name === "name" ||
                    element.name === "E-mail" ||
                    element.name === "Phone"
                ) {
                    const $inputWrapper = $(element)
                        .closest(".form_field-wrapper")
                        .find(".form_input-error");
                    $inputWrapper.hide();
                } else if (element.name === "Privacy-Policy") {
                    const $privacyWrapper = $(element)
                        .closest(".form_checkbox")
                        .find(".form_privacy-error");

                    $privacyWrapper.hide();
                } else if (element.name === "Newsletter-Email") {
                    const $newsletterErrorWrapper = $(element)
                        .closest(".form_newsletter-input-wrapper")
                        .find(".form_newsletter-input-error");
                    $newsletterErrorWrapper.hide();

                    $(".form_newsletter").on("submit", async function (e) {
                        submitToBeehiiv($(element).val());
                    });
                } else if (element.name === "Privacy-Policy-Newsletter") {
                    const $privacyErrorWrapper = $(element)
                        .closest(".form_pp-wrapper")
                        .next(".form_newsletter-privacy-error");
                    $privacyErrorWrapper.hide();

                    const $modalPrivacyErrorWrapper = $(element)
                        .closest(".form_pp-checkbox-wrapper")
                        .find(".form_newsletter-privacy-error");

                    $modalPrivacyErrorWrapper.hide();
                }
            },
        });
    });
};
