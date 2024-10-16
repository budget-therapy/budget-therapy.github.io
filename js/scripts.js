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
    Sorry! There was an error submitting this form, please try sending us an email at <span style="white-space:nowrap;"><a href="mailto:nic@budget-therapy.com" class="alert-link">nic@budget-therapy.com</a></span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
const formValidationMessage = `
<div id="google-form-error" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Oops, please check that all the required fields are filled in and re-submit!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;


// Reset Google Form Fields on Success
function resetGoogleForm() {
    $('#firstname').val("");
    $('#lastname').val("");
    $('#emailaddress').val("");
    $('#phonenumber').val("");
    $('#age').val("");
    $('input[name="gridRadios"]:first').prop('checked', true);
    $('#rent').val("");
    $('#debt').val("");
    $('#comments').val("");
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
        var annualIncome = $('input[name="gridRadios"]:checked').val();
        var rentMonthly = $('#rent').val();
        var debtTotal = $('#debt').val();
        var comment = $('#comments').val().replace(/\n/g, '<br>');

        // Disable submit button until complete
        $("#send-btn").prop("disabled", true);
        $("#send-btn").html("<div class='spinner-border text-light' style='vertical-align: middle; height: 1.5rem; width: 1.5rem;'></div>");
        $("#form-message").html("");

        // Submit Google Form
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzvbk8I4RAquhnUiFGfFYYzwQzDZ6WGfdd2uB2JH0ov6Y3nIcSZ5hUCrKZoR0L8-3UdXA/exec",
            data: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "emailAddress": emailAddress,
                "phoneNumber": phoneNumber,
                "age": age,
                "annualIncome": annualIncome,
                "rentMonthly": rentMonthly,
                "debtTotal": debtTotal,
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
