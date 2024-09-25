$(function () {
    // Placeholder
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


// Reset Google Form Fields on Success
function resetGoogleForm() {
    $('#firstname').val("");
    $('#lastname').val("");
    $('#emailaddress').val("");
    $('#phonenumber').val("");
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
        var annualIncome = $('input[name="gridRadios"]:checked').val();
        var rentMonthly = $('#rent').val();
        var debtTotal = $('#debt').val();
        var comment = $('#comments').val();

        // Submit Google Form
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfNeRXa5TpshFP4lZr1RX-rvKh1_SkpjzDeHUSb55WpU4Dq1w/formResponse",
            data: {
                "entry.535990808": firstName,
                "entry.1543733340": lastName,
                "entry.1149073394": emailAddress,
                "entry.198946514": phoneNumber,
                "entry.891155476": annualIncome,
                "entry.1574405577": rentMonthly,
                "entry.1919481366": debtTotal,
                "entry.1210713953": comment,
            },
            type: "POST",
            dataType: "xml",
            complete: function (e, xhr, settings) {
                if (e.status === 0) {
                    $("#form-message").html(successMessage);
                    resetGoogleForm();
                } else if (e.status === 200) {
                    $("#form-message").html(successMessage);
                    resetGoogleForm();
                } else {
                    $("#form-message").html(errorMessage);
                    // Don't reset form on failure
                }
            }
        });
    }

    return false;
}
