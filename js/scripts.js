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

// Numbering requirements
document.addEventListener('DOMContentLoaded', function() {
    const phonenumberInput = document.getElementById('phonenumber');
    const ageInput = document.getElementById('age');
    const form = phonenumberInput?.closest('form') || ageInput?.closest('form'); // Get the form, handling cases where one input might not exist

    if (phonenumberInput) {
        phonenumberInput.addEventListener('input', function(event) {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    } else {
        console.error("Phone number input element not found!");
    }

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

            const phonenumberValue = phonenumberInput?.value;
            const ageValue = ageInput?.value;

            if (!phonenumberValue || phonenumberValue.length !== 10) {
                alert("Please enter a valid 10-digit phone number.");
                isValid = false;
            } else if (isNaN(phonenumberValue)) {
                alert("Please enter a valid phone number.");
                isValid = false;
            }

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
                console.log("Form submitted with phone number:", phonenumberValue);
                console.log("Form submitted with age:", ageValue);
            }
        });
    } else {
        console.error("Form element not found!");
    }
});


// Reset Google Form Fields on Success
function resetGoogleForm() {
    $('#firstname').val("");
    $('#lastname').val("");
    $('#emailaddress').val("");
    $('#phonenumber').val("");
    $('#age').val("");
    $('#budgetingRating').val(5);
    $('#sliderValue').text(5);
    $('input[name="gridRadios"]:first').prop('checked', true);
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

    // Bootstrap Form Validation
    var validJoinForm = false;
    const form = document.querySelectorAll('#join-show-form')[0];
    if (!form.checkValidity()) {
        validJoinForm = false;
        form.classList.add('was-validated');
        $("#form-message").html(formValidationMessage);
    } else {
        validJoinForm = true;
        form.classList.remove('was-validated');
    }

    // If Bootstrap Form Input is Valid
    if (validJoinForm) {
        // Collect Inputs
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var emailAddress = $('#emailaddress').val();
        var phoneNumber = $('#phonenumber').val();
        var age = $('#age').val();
        var budgetingRating = $('#budgetingRating').val();
        var annualIncome = $('input[name="gridRadios"]:checked').val();
        var rentMonthly = $('#rent').val();
        var debtTotal = $('#debt').val();
        var comment = $('#comments').val().replace(/\n/g, '<br>');
        var focusAreas = [];
        $('input[name="focusAreas[]"]:checked').each(function() {
            focusAreas.push($(this).val());
        });

        // Disable submit button until complete
        $("#send-btn").prop("disabled", true);
        $("#send-btn").html("<div class='spinner-border text-light' style='vertical-align: middle; height: 1.5rem; width: 1.5rem;'></div>");
        $("#form-message").html("");

        // Submit Google Form
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxwaN88nUV_h-NRxAozDRfkhyu1GN_i57nceJEDzuL8YVU1sgFYgXb7yZzdCrNrzqkF/exec",
            data: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "emailAddress": emailAddress,
                "phoneNumber": phoneNumber,
                "age": age,
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
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    if (e.responseJSON.result === "success") {
                        $("#form-message").html(successMessage);
                        resetGoogleForm();
                    } else {
                        $("#form-message").html(errorMessage);
                        // Don't reset form on failure
                    }
                } else {
                    $("#form-message").html(errorMessage);
                    // Don't reset form on failure
                }
                // Re-enable submit button
                $("#send-btn").html("Send");
                $("#send-btn").prop("disabled", false);
            }
        });
    }

    return false;
}
