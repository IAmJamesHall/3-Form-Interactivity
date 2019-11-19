/******************************************
Treehouse Techdegree:
FSJS project 3 - Forms Interactivity & Validation
James Hall
Nov 18, 2019
******************************************/


/******************************************
NAME input */
const $nameInput = $('#name');
const $nameLabel = $nameInput.prev();
$nameLabel.html("Name:");


// focus on name field onload
$nameInput.focus();

$nameInput.on('blur', () => {
    checkName();
});
$nameInput.on('focus', () => {
    $nameLabel.html("Name:");
});


function checkName() {
    if ($nameInput.val()) {
        return true;
    } else {
        $nameLabel.html("Name: <span class='red'>(name required)</span>");
        return false;
    }
}


/******************************************
EMAIL input */
const $emailInput = $('#email');
const $emailLabel = $emailInput.prev();
$emailLabel.html("Email:");

$emailInput.on('focus', () => {
    $emailLabel.html("Email:");
});
$emailInput.on('input blur', () => {
    checkEmail();
})


function checkEmail() {
    const emailRegex = /^[\w.+-]+@[\w.]+\.\w+$/;
    let email = $emailInput.val();
    if (email === "") {
        $emailLabel.html("<span class='red'>Email: (cannot be blank)</span>");
        return false;
    } else if (email.search(emailRegex)) {
        $emailLabel.html("<span class='red'>Email: (must be in the form 'user@email.com')</span>");
        return false;
    } else {
        $emailLabel.html("Email:");
        return true;
    }
}



/******************************************
JOB ROLE select */
const $jobInput = $('#other-title');
const $jobLabel = $jobInput.prev();
$jobLabel.html("Other Job Role:");


// hide other job role field
$('label[for="other-title"]').hide();
$('#other-title').hide();



// shows other job field if 'Other' title is chosen
$('#title').on('change', function () {
    if ($('#title :selected').val() == "other") {
        $('label[for="other-title"]').show();
        $('#other-title').show();
    } else {
        $('label[for="other-title"]').hide();
        $('#other-title').hide();
    }

});

$jobInput.on('blur', () => {
    checkJob();
});
$jobInput.on('focus', () => {
    $jobLabel.html("Other Job Role:");
});



function checkJob() {
    if ($jobInput.val()) {
        return true;
    } else {
        $jobLabel.html("Other Job Role: <span class='red'>(type your job role)</span>");
        return false;
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
    $('#color').val('chooseColor');

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


$designInput.on('click', () => {
    $designLabel.html("Select design");
})

$colorInput.on('click', () => {
    $colorLabel.html("Please select a color");
});

function checkDesign() {
    if ($designInput.val() === "select design") {
        $designLabel.html("<span class='red'>Please select a design</span>")
        return false;
    }
    return true;
}

function checkColor() {
    if ($colorInput.val() === "choose color") {
        $colorLabel.html("<span class='red'>Please select a color</span>")
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

    if (e.target.checked) {
        totalPrice += cost;
    } else {
        totalPrice -= cost;
    }
    $('#payment-total').html('$' + totalPrice);
});

//when activity is selected, disable conflicting activities
$('fieldset.activities').on('change', (event) => {
    disableIfConflicting();
});


function disableIfConflicting() {
    const $elementList = $('input[data-day-and-time]');
    $elementList.each(function (i, selectedActivity) {
        let selectedShouldBeDisabled = false;
        if (selectedActivity.checked === false) {
            $elementList.each(function (j, otherActivity) {
                if (otherActivity.checked === true) {
                    if (checkIfTimeConflicts(selectedActivity, otherActivity)) {
                        selectedShouldBeDisabled = true;
                    }
                }
            })
        }
        if (selectedShouldBeDisabled) {
            disable(selectedActivity);
            selectedShouldBeDisabled = false;
        } else {
            enable(selectedActivity);
        }
    })


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

    function checkIfTimeConflicts(selectedActivity, otherActivity) {
        let selectedTimes = extractDateObjects(selectedActivity.dataset.dayAndTime);
        let otherTimes = extractDateObjects(otherActivity.dataset.dayAndTime);
        if (selectedTimes.start > otherTimes.end || selectedTimes.end < otherTimes.start) {
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

$activitiesInput.on('click', () => {
    checkActivities();
})


function checkActivities() {
    let valid = false;
    const $activitiesList = $('fieldset.activities input');
    $activitiesList.each((index, value) => {
        if ($activitiesList[index].checked === true) {
            valid = true;
        }
    })

    if (valid) {
        $activitiesLabel.html("Register for Activities");
    } else {
        $activitiesLabel.html("Register for Activities <span class='red'>(at least one required)</span>");
    }
}


/******************************************
CREDIT CARD select */
// hide BTC & PayPal payment fields
$('#paypal').hide();
$('#bitcoin').hide();


//when payment method is selected, hide other methods
$('select#payment').on('change', function () {

    let selected = $('#payment :selected').val();
    let paymentList = ["credit-card", "paypal", "bitcoin"];
    for (let i = 0; i < paymentList.length; i++) {
        $('#' + paymentList[i]).hide();
    }
    $('#' + selected).show();

    $('#paypal').html("<p>We'll take you to Paypal's site to set up your billing information when you click “Register” below.</p>");
    $('#bitcoin').html("<p>Since you selected Bitcoin we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p>")
})


function checkNumberField(number, lowerCount, upperCount) {
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

$ccNumberInput.on('blur', () => {
    checkccNumber();
});
$ccNumberInput.on('focus', () => {
    $ccNumberLabel.html("Card number:");
});


function checkccNumber() {
    if ($('select#payment :selected').val() === "credit-card") {
        //check card number
        if (checkNumberField($ccNumberInput.val(), 0, 0) === true) {
            $('label[for="cc-num"]').html("Card Number <span class='red'>Enter your credit card number</span>");
        } else if (checkNumberField($ccNumberInput.val(), 13, 16) === false) {
            $('label[for="cc-num"]').html("Card Number <span class='red'>Must be between 13 and 16 digits</span>");
            return false;
        } else {
            $('label[for="cc-num"]').html("Card Number:");
            return true;
        }
    }
}



/******************************************
CREDIT CARD ZIP input */
const $ccZipInput = $('#zip');
const $ccZipLabel = $ccZipInput.prev();
$ccZipLabel.html("ZIP:");

$ccZipInput.on('blur', () => {
    checkccZip();
});
$ccZipInput.on('focus', () => {
    $ccZipLabel.html('Zip code:');
});


function checkccZip() {
    if ($('select#payment :selected').val() === "credit-card") {
        if (checkNumberField($ccZipInput.val(), 5, 5) === false) {
            $('label[for="zip"]').html("Zip code <span class='red'>Enter a valid zip code</span>");
            return false;
        } else {
            $('label[for="zip"]').html("Zip code:");
            return true;
        }
    }
}


/******************************************
CREDIT CARD CVV input */
const $ccCVVInput = $('#cvv');
const $ccCVVLabel = $ccCVVInput.prev();
$ccCVVLabel.html("CVV:");


$ccCVVInput.on('blur', () => {
    checkccCVV();
});
$ccCVVInput.on('focus', () => {
    $ccCVVLabel.html('CVV:');
})


function checkccCVV() {
    if ($('select#payment :selected').val() === "credit-card") {
        if (checkNumberField($ccCVVInput.val(), 3, 4) === false) {
            $('label[for="cvv"]').html("CVV <span class='red'>Enter valid CVV</span>");
            return false;
        } else {
            $('label[for="cvv"]').html("CVV:");
            return true;
        }
    }
}


/******************************************
SUBMIT button input */
function submitValidation() {
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
        console.log('submit form now');
    }
}



$('form').on('submit', (e) => {
    e.preventDefault();
    submitValidation();
});