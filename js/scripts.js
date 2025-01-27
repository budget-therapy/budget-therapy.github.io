$(function () {
    // Prevent Form Submission on Enter
    $(document).on('keyup keypress', 'form input[type="text"]', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    // Update copyright year
    $('#copyright-year').html(new Date().getFullYear());

});


// Google Form Submission - Alert Message for Success or Error
const successMessage = `
<div id="google-form-success" class="alert alert-success alert-dismissible fade show text-center" role="alert">
    Success! We've recieved your message and we'll get back to you asap!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
const errorMessage = `
<div id="google-form-error" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Sorry! There was an error submitting this form, please try sending us an email at <span style="white-space:nowrap;"><a href="mailto:interviews@budget-therapy.com" class="alert-link">interviews@budget-therapy.com</a></span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
const formValidationMessage = `
<div id="google-form-error" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Oops, please check that all the required fields are filled in and re-submit!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById("budgetingRating");
    const sliderValue = document.getElementById("sliderValue");

    if (slider && sliderValue) {
        sliderValue.textContent = slider.value; // Set initial value

        slider.oninput = function() {
            sliderValue.textContent = this.value;
        };
    }
});

// Naming requirements - no special characters or numbers
document.addEventListener('DOMContentLoaded', function() {
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const form = firstNameInput?.closest('form') || lastNameInput?.closest('form');

    function filterNonLetters(inputElement) {
        if (inputElement) {
            inputElement.addEventListener('input', function(event) {
                this.value = this.value.replace(/[^A-Za-z\s\-\']/g, ''); // Remove anything not a letter, space, hyphen, or apostrophe
            });
        } else {
            console.error(inputElement.id + " input element not found!");
        }
    }

    filterNonLetters(firstNameInput);
    filterNonLetters(lastNameInput);


    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                console.log("Form submitted with firstName:", firstNameInput.value)
                console.log("Form submitted with lastName:", lastNameInput.value)
            }
        });
    } else {
        console.error("Form element not found!");
    }
});

// Numbering requirements
document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const form = ageInput?.closest('form'); // Get the form, handling cases where the input might not exist

    if (ageInput) {
        ageInput.addEventListener('input', function(event) {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 2) {
                this.value = this.value.slice(0, 2);
            }
        });
    } else {
        console.error("Age input element not found!");
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true; // Use a flag to track overall form validity

            const ageValue = ageInput?.value;

            if (!ageValue || ageValue.length !== 2) {
                alert("Please enter a valid 2-digit age.");
                isValid = false;
            } else if (isNaN(ageValue)) {
                alert("Please enter a valid age.");
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission if not valid
            } else {
                console.log("Form submitted with age:", ageValue);
            }
        });
    } else {
        console.error("Form element not found!");
    }
});

// Rent and Debt requirements
document.addEventListener('DOMContentLoaded', function() {
    const rentInput = document.getElementById('rent');
    const form = rentInput?.closest('form') || debtInput?.closest('form');

    function filterNumbersAndHyphens(inputElement) {
        if (inputElement) {
            inputElement.addEventListener('input', function(event) {
                this.value = this.value.replace(/[^0-9\-]/g, ''); // Remove anything not a number or hyphen
            });
        } else {
            console.error(inputElement.id + " input element not found!");
        }
    }

    filterNumbersAndHyphens(rentInput);

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                console.log("Form submitted with rent:", rentInput.value)
            }
        });
    } else {
        console.error("Form element not found!");
    }
});

// Email checker
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailaddress');
    const form = emailInput?.closest('form');

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                //If the form is invalid, prevent submission
                event.preventDefault();
                event.stopPropagation();
            } else {
                //If the form is valid, continue with submission
                console.log("Form submitted with email:", emailInput.value)
            }
        });
    } else {
        console.error("Form element not found!");
    }
});

// Character countdown for open text box
document.addEventListener('DOMContentLoaded', function() {
    const commentsInput = document.getElementById('comments');
    const commentsCount = document.getElementById('comments-count');

    if (commentsInput && commentsCount) {
        commentsInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.maxLength;
            commentsCount.textContent = currentLength + " / " + maxLength + " characters";

            if (currentLength > maxLength) {
                this.value = this.value.slice(0, maxLength); // Truncate if they somehow exceed limit
                commentsCount.classList.add("text-danger");
            } else {
                commentsCount.classList.remove("text-danger");
            }
        });
    } else {
        console.error("Comments input or counter element not found!");
    }
});

// Minimum word count on comment box
document.addEventListener('DOMContentLoaded', function() {
    const commentsTextarea = document.getElementById('comments');
    const commentsWordCount = document.getElementById('comments-word-count');
    const minWordFeedback = document.getElementById('min-word-feedback');

    commentsTextarea.addEventListener('input', function() {
        const text = this.value.trim();
        const words = text.split(/\s+/).filter(word => word !== ""); // Split by spaces and filter out empty strings
        const wordCount = words.length;

        commentsWordCount.textContent = `${wordCount} / 30 words`;

        if (wordCount < 30) {
            commentsTextarea.setCustomValidity("Please enter at least 30 words.");
            minWordFeedback.style.display = "block"; // Show the feedback
        } else {
            commentsTextarea.setCustomValidity(""); // Reset custom validity
            minWordFeedback.style.display = "none"; // Hide the feedback
        }
    });
});

// Phone number auto-formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phonenumber');

    phoneInput.addEventListener('input', function(event) {
        let input = this.value.replace(/\D/g, ''); // Remove non-digits
        let formatted = input;

        if (input.length > 0) {
            if (input.length > 3) {
                formatted = `(${input.substring(0, 3)}) ${input.substring(3)}`;
            }
            if (input.length > 6) {
                formatted = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}`;
            }
        }

        this.value = formatted;
        // Check for validity after formatting
        if (input.length === 10) {
            this.setCustomValidity(""); // Valid
        } else {
            this.setCustomValidity("Please provide a valid 10-digit phone number."); // Invalid
        }
    });
});

// Reset Google Form Fields on Success
function resetGoogleForm() {
    $('#firstname').val("");
    $('#lastname').val("");
    $('#emailaddress').val("");
    $('#phonenumber').val("");
    $('#age').val("");
    $('#socialMediaHandles').val("");
    $('#occupation').val("");
    $('#budgetingRating').val(5);
    $('#sliderValue').text(5);
    $('input[name="gridRadios"]:first').prop('checked', true);
    $('input[name="inDenver"]:first').prop('checked', true);
    $('#rent').val("");
    $('#debt').val("");
    $('#comments').val("");
    $('input[name="focusAreas[]"]').prop('checked', false);
    $('#creatingBudgetCheck').prop('checked', true);
}


// Submit Google Form
function submitGoogleForm(event) {
    // Prevent Default Submit
    event.preventDefault();

    // Get form and button elements
    const form = document.querySelector('#join-show-form');
    const sendBtn = document.getElementById('send-btn');

    if (!form || !sendBtn) {
        console.error("Form or send button not found.");
        return; // Important: Exit early if elements are not found
    }

    // Bootstrap Form Validation
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        $("#form-message").html(formValidationMessage);
        return;
    } else {
        form.classList.remove('was-validated');
        $("#form-message").html("");
    }

    // Disable submit button and change text
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending..."; // Change button text

    // Collect Inputs
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var emailAddress = $('#emailaddress').val();
    var phoneNumber = $('#phonenumber').val();
    var age = $('#age').val();
    var socialMediaHandles = $('#socialMediaHandles').val();
    var occupation = $('#occupation').val();
    var budgetingRating = $('#budgetingRating').val();
    var annualIncome = $('input[name="gridRadios"]:checked').val();
    var inDenver = $('input[name="inDenver"]:checked').val();
    var rentMonthly = $('#rent').val();
    var debtTotal = $('#debt').val();
    var comment = $('#comments').val().replace(/\n/g, '<br>');
    var focusAreas = [];
    $('input[name="focusAreas[]"]:checked').each(function() {
        focusAreas.push($(this).val());
    });

    // Stop Spam
    var hiddenField = $('#email-catch').val();
    if (hiddenField != "") {
        $("#form-message").html(errorMessage);
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
        return false;
    }

    // Submit Google Form
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxwaN88nUV_h-NRxAozDRfkhyu1GN_i57nceJEDzuL8YVU1sgFYgXb7yZzdCrNrzqkF/exec",
        data: JSON.stringify({
            "inDenver": inDenver,
            "firstName": firstName,
            "lastName": lastName,
            "emailAddress": emailAddress,
            "phoneNumber": phoneNumber,
            "age": age,
            "socialMediaHandles": socialMediaHandles,
            "occupation": occupation,
            "budgetingRating": budgetingRating,
            "annualIncome": annualIncome,
            "rentMonthly": rentMonthly,
            "debtTotal": debtTotal,
            "focusAreas": focusAreas,
            "comment": comment,
        }),
        type: "POST",
        redirect: "follow",
        contentType: 'text/plain;charset=utf-8',
        success: function(response) {
            if (response.result === "success") {
                $("#form-message").html(successMessage);
                resetGoogleForm();
            } else {
                $("#form-message").html(errorMessage);
            }
        },
        error: function() {
            $("#form-message").html(errorMessage);
        },
        complete: function() {
            // Re-enable submit button and restore text
            sendBtn.disabled = false;
            sendBtn.textContent = "Send";
        }
    });

    return false;
}