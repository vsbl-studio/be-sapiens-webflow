export default function () {
    const mailerliteForm = document.getElementById("wf-form-Newsletter-Form");

    if (mailerliteForm) {
        const newsletterSuccess = document.getElementById("newsletter-success");
        const newsletterError = document.getElementById("newsletter-error");
        const newsletterSubmit = document.querySelector(".newsletter-submit");

        const emailInput = document.getElementById("Subscriber-Email");
        const privacyCheckbox = document.getElementById(
            "Newsletter-Privacy-Policy"
        );

        const emailRequired = document.getElementById("email-required");
        const privacyRequired = document.getElementById(
            "newsletter-privacy-error"
        );

        emailInput.addEventListener("input", function () {
            emailRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });

        privacyCheckbox.addEventListener("change", function () {
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });
        newsletterSubmit.addEventListener("click", function (e) {
            e.preventDefault();

            let isValid = true;

            emailRequired.style.display = "none";
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";

            if (!privacyCheckbox.checked) {
                isValid = false;
                privacyRequired.style.display = "flex";
            }

            if (emailInput.value.trim() === "") {
                emailRequired.style.display = "flex";
                isValid = false;
            }

            const data = {
                email: emailInput.value,
            };

            if (isValid) {
                fetch("https://connect.mailerlite.com/api/subscribers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer API_KEY",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // console.log("Success:", data);

                        mailerliteForm.style.display = "none";

                        if (newsletterSuccess) {
                            newsletterSuccess.style.display = "block";
                        }
                    })
                    .catch((error) => {
                        if (newsletterError) {
                            newsletterError.style.display = "block";
                        }
                        console.error("Error:", error);
                    });
            }
        });
    }
}
