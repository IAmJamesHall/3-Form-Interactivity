/******************************************
Treehouse Techdegree:
FSJS project 3 - Forms Interactivity & Validation
James Hall
Nov 20, 2019 */


/******************************************
NAME input */
const $nameInput = $('#name');
const $nameLabel = $nameInput.prev();
$nameLabel.html("Name:");


// focus on name field onload
$nameInput.focus();

// when focus leaves, check if valid
$nameInput.on('blur', () => {
    checkName();
});

// on focus, clear warning
$nameInput.on('focus', () => {
    $nameLabel.html("Name:");
});

// check name for validitiy
function checkName() {
    if ($nameInput.val()) { 
        return true;
    } else { // if invalid, provide warning
        $nameLabel.html("Name: <span class='red'>(name required)</span>");
        return false;
    }
}


/******************************************
EMAIL input */
const $emailInput = $('#email');
const $emailLabel = $emailInput.prev();
$emailLabel.html("Email:");
// when focus leaves & on input, check if valid
// this provides real-time error checking
$emailInput.on('input blur', () => {
    checkEmail();
})

// on focus, clear warning
$emailInput.on('focus', () => {
    $emailLabel.html("Email:");
});



function checkEmail() {
    const emailRegex = /^[\w.+-]+@[\w.]+\.\w+$/;
    let email = $emailInput.val();
    if (email === "") { // if email is blank, provide custom error message
        $emailLabel.html("<span class='red'>Email: (cannot be blank)</span>");
        return false;
    } else if (email.search(emailRegex)) { // if email is not valid, prompt the user
        $emailLabel.html("<span class='red'>Email: (must be in the form 'user@email.com')</span>");
        return false;
    } else { // if valid email, clear warning
        $emailLabel.html("Email:");
        return true;
    }
}



/******************************************
JOB ROLE select */
const $jobInput = $('#other-title');
const $jobLabel = $jobInput.prev();
$jobLabel.html("Other Job Role:");


// hide custom job role input
$('label[for="other-title"]').hide();
$('#other-title').hide();



// shows other job field if 'Other' title is chosen
$('#title').on('change', function () {
    if ($('#title :selected').val() == "other") {
        // if 'other' is selected, show custom field 
        $('label[for="other-title"]').show();
        $('#other-title').show();
    } else {
        //hide custom job field
        $('label[for="other-title"]').hide();
        $('#other-title').hide();
    }

});

// when focus leaves, check if valid
$jobInput.on('blur', () => {
    checkJob();
});

// on focus, clear warning
$jobInput.on('focus', () => {
    $jobLabel.html("Other Job Role:");
});



function checkJob() {
    if ($('#title :selected').val() === "other") {
        if ($jobInput.val()) {
            return true;
        } else { // if empty job field, provide warning
            $jobLabel.html("Other Job Role: <span class='red'>(type your job role)</span>");
            return false;
        }
    } else {
        return true;
    }
}


/******************************************
TSHIRT select */
//DESIGN select
const $designInput = $('#design');
const $designLabel = $designInput.prev();
$designLabel.html("Select design")

//COLOR select
const $colorInput = $('#color');
const $colorLabel = $colorInput.prev();
$colorLabel.html("Select color")




//hide shirt color select
$('#color').hide();
$('label[for="color"]').hide();

//remove redundant design names from color options
removeDesignFromColorSelector();


function removeDesignFromColorSelector() {
    const colorRegex = /[\w ♥️]+/;
    const colorSelect = $('select#color');

    $('select#color').children().each((index, value) => {
        let text = value.text;
        text = text.replace(/ \([\w ♥️]+\)/, '');
        value.text = text;
    });
}



//when shirt design field in changed, update available colors
$('#design').on('change', function () {
    const selectedShirtDesign = $('#design :selected').val();
    //show all items in dropdown menu
    $('.js-puns').hide();
    $('.i-love-js').hide();
    //reset selected option
    $('#color').val('choose color');

    //selectively hide options based on what is selected
    if (selectedShirtDesign === "js puns") {
        $('#color').show();
        $('label[for="color"]').show();
        $('.js-puns').show();
    } else if (selectedShirtDesign === "heart js") {
        $('#color').show();
        $('label[for="color"]').show();
        $('.i-love-js').show();
    } else {
        const pleaseChooseDesign = document.createElement('option');
        pleaseChooseDesign.text = "Please select a T-shirt design";

    }


});

// on click, clear warnings
$designInput.on('click', () => {
    $designLabel.html("Select design");
})

// on click, clear warnings
$colorInput.on('click', () => {
    $colorLabel.html("Select color");
});

function checkDesign() {
    if ($designInput.val() === "select design") { // if design not selected, show warning
        $designLabel.html("<span class='red'>Select design</span>")
        return false;
    }
    return true;
}

function checkColor() {
    if ($colorInput.val() === "choose color") { // if color not selected, show warning
        $colorLabel.html("<span class='red'>Select color</span>")
        return false;
    }
    return true;
}



/******************************************
ACTIVITIES fieldset */
const $activitiesInput = $('fieldset.activities');
const $activitiesLabel = $('fieldset.activities legend');
$activitiesLabel.html("Register for Activities:");

//set totalPrice to initial price
let totalPrice = 0;


//when activity is selected, add its cost to the totalPrice
$('.activities').on('change', (e) => {
    let cost = e.target.dataset.cost;
    cost = parseInt(cost.slice(1, 4));
    // add or subtract cost, based on whether it was checked or unchecked
    if (e.target.checked) {
        totalPrice += cost;
    } else {
        totalPrice -= cost;
    }
    $('#payment-total').html('$' + totalPrice); //update price on page
});

//when activity is selected, disable conflicting activities
$('fieldset.activities').on('change', (event) => {
    disableIfConflicting();
});


function disableIfConflicting() {
    const $elementList = $('input[data-day-and-time]'); // grab all elements with a date+time

    // this loop goes through each activity and compares it with all other activities
    // if an unchecked activity conflicts with another activity that is checked, 
    // it disables the unchecked activity
    $elementList.each(function (i, selectedActivity) {
        let selectedShouldBeDisabled = false;
        if (selectedActivity.checked === false) {
            $elementList.each(function (j, otherActivity) {
                if (otherActivity.checked === true) {
                    let selectedTimeDate = extractDateObjects(selectedActivity.dataset.dayAndTime);
                    let otherTimeDate = extractDateObjects(otherActivity.dataset.dayAndTime);
                    if (checkIfTimeConflicts(selectedTimeDate, otherTimeDate)) {
                        selectedShouldBeDisabled = true;
                    }
                }
            })
        }
        if (selectedShouldBeDisabled) {
            disable(selectedActivity);
            selectedShouldBeDisabled = false; // set up the loop for the next element
        } else {
            enable(selectedActivity); // if an element does not conflict with any other checked elements, enable it
        }
    })


    // this functions takes a time+date string (loosely ISO 8601), extracts a start & end time,
    // and creates two JS time objects with it returns in an object
    function extractDateObjects(timeString) {
        let regex = /(\d{4}-\d\d-\d\d)(T\d\d:\d\d:\d\d)-(T\d\d:\d\d:\d\d)/g;
        let match = regex.exec(timeString);
        let date = match[1];
        let startTime = new Date(date + match[2]);
        let endTime = new Date(date + match[3]);
        return {
            start: startTime,
            end: endTime
        }
    }

    // this function takes two dates and checks if they overlap
    function checkIfTimeConflicts(oneTimeDate, otherTimeDate) {
        if (oneTimeDate.start > otherTimeDate.end || oneTimeDate.end < otherTimeDate.start) {
            return false;
        } else {
            return true;
        }

    }


    function disable(activity) {
        activity.setAttribute("disabled", ""); //adds disabled attr
        activity.parentElement.style.color = 'grey';
    }

    function enable(activity) {
        activity.removeAttribute("disabled"); //removes disabled attr
        activity.parentElement.style.color = 'white';
    }
}

// when an activity is clicked, check all activities
$activitiesInput.on('click', () => {
    checkActivities();
})


// this checks to see that there is at least 1 activity checked
function checkActivities() {
    let valid = false;
    const $activitiesList = $('fieldset.activities input');
    $activitiesList.each((index, value) => {
        if ($activitiesList[index].checked === true) {
            valid = true;
        }
    })

    // if at least 1 activity is checked, remove warning
    // otherwise, add a warning
    if (valid) {
        $activitiesLabel.html("Register for Activities");
        return true;
    } else {
        $activitiesLabel.html("Register for Activities <span class='red'>(at least one required)</span>");
        return false;
    }
}


/******************************************
CREDIT CARD select */
// hide BTC & PayPal payment fields
$('#paypal').hide();
$('#bitcoin').hide();


//when payment method is selected, hide other methods
$('select#payment').on('change', function () {

    //hide all payment methods
    let selected = $('#payment :selected').val();
    let paymentList = ["credit-card", "paypal", "bitcoin"];
    for (let i = 0; i < paymentList.length; i++) {
        $('#' + paymentList[i]).hide();
    }

    //show only selected payment method
    $('#' + selected).show();

    //change the paypal and bitcoin text to be more friendly
    //while leaving the original HTML intact for progressive enhancement
    $('#paypal').html("<p>We'll take you to Paypal's site to set up your billing information when you click “Register” below.</p>");
    $('#bitcoin').html("<p>Since you selected Bitcoin we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p>")
})

//check the length of number is between lowerCount and upperCount
//this function is used in all the credit card fields
function checkNumberLength(number, lowerCount, upperCount) {
    if (number.length <= upperCount && number.length >= lowerCount) {
        return true;
    } else {
        return false;
    }
}



/******************************************
CREDIT CARD NUMBER input */
const $ccNumberInput = $('#cc-num');
const $ccNumberLabel = $ccNumberInput.prev();
$ccNumberLabel.html("Card number:");

//on blur, check if valid
$ccNumberInput.on('blur', () => {
    checkccNumber();
});
//on focus, clear warnings
$ccNumberInput.on('focus', () => {
    $ccNumberLabel.html("Card number:");
});

//check card number
function checkccNumber() {
    if ($('select#payment :selected').val() === "credit-card") {
        
        if (checkNumberLength($ccNumberInput.val(), 0, 0) === true) { //if cc# field is blank, show custom warning
            $('label[for="cc-num"]').html("Card Number <span class='red'>Enter your credit card number</span>");
        } else if (checkNumberLength($ccNumberInput.val(), 13, 16) === false) { // if cc# is the wrong length, show custom warning
            $('label[for="cc-num"]').html("Card Number <span class='red'>Must be between 13 and 16 digits</span>");
            return false;
        } else { // if cc# is valid
            $('label[for="cc-num"]').html("Card Number:");
            return true;
        }
    } else {
        return true;
    }
}



/******************************************
CREDIT CARD ZIP input */
const $ccZipInput = $('#zip');
const $ccZipLabel = $ccZipInput.prev();
$ccZipLabel.html("ZIP:");

// on blur, check number
$ccZipInput.on('blur', () => {
    checkccZip();
});

// on focus, clear warnings
$ccZipInput.on('focus', () => {
    $ccZipLabel.html('Zip code:');
});


function checkccZip() {
    if ($('select#payment :selected').val() === "credit-card") {
        if (checkNumberLength($ccZipInput.val(), 5, 5) === false) { //if ccZip is not 5 digits long, show warning
            $('label[for="zip"]').html("Zip code <span class='red'>Enter a valid zip code</span>");
            return false;
        } else { // if ccZip is 5 digits long
            $('label[for="zip"]').html("Zip code:");
            return true;
        }
    } else {
        return true;
    }
}


/******************************************
CREDIT CARD CVV input */
const $ccCVVInput = $('#cvv');
const $ccCVVLabel = $ccCVVInput.prev();
$ccCVVLabel.html("CVV:");

//on blur, check if valid
$ccCVVInput.on('blur', () => {
    checkccCVV();
});

//on focus, clear warnings
$ccCVVInput.on('focus', () => {
    $ccCVVLabel.html('CVV:');
})


function checkccCVV() {
    if ($('select#payment :selected').val() === "credit-card") {
        if (checkNumberLength($ccCVVInput.val(), 3, 4) === false) { //if ccCVV is not valid, show warning
            $('label[for="cvv"]').html("CVV <span class='red'>Enter valid CVV</span>");
            return false;
        } else { // if ccCVV is valid
            $('label[for="cvv"]').html("CVV:");
            return true;
        }
    } else {
        return true;
    }
}


/******************************************
SUBMIT button input */

//on submit, check all fields for validity
function finalValidation() {
    let validName = checkName();
    let validEmail = checkEmail();
    let validJob = checkJob();
    let validDesign = checkDesign();
    let validColor = checkColor();
    let validActivities = checkActivities();
    let validCreditCardNumber = checkccNumber();
    let validCreditCardZip = checkccZip();
    let validCreditCardCVV = checkccCVV();

    if (validName &&
        validEmail &&
        validJob &&
        validDesign &&
        validColor &&
        validActivities &&
        validCreditCardNumber &&
        validCreditCardZip &&
        validCreditCardCVV) {
        return true
    }
    return false;
}



//event listener to run validation before submitting form
$('form').on('submit', (e) => {
    e.preventDefault();
    if (finalValidation()) {
        document.form.submit();
    }
});