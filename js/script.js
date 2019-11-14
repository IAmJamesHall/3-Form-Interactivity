let totalPrice = 0;


// focus on name field onload
$('#name').focus();

// hide BTC & PayPal payment fields
$('#paypal').hide();
$('#bitcoin').hide();

// hide other job role field
$('label[for="other-title"]').hide();
$('#other-title').hide();

// shows other job field if 'Other' title is chosen
$('#title').on('change', function() {
    if ($('#title :selected').val() == "other") {
        $('label[for="other-title"]').show();
        $('#other-title').show();
    } else {
        $('label[for="other-title"]').hide();
        $('#other-title').hide();
    }
});


//when shirt design field in changed, update available colors
$('#design').on('change', function() {

    const selectedShirtDesign = $('#design :selected').val();
    //show all items in dropdown menu
    $('.js-puns').show();
    $('.i-love-js').show();
    //reset selected option

    $('#color').val('chooseColor');

    //selectively hide options based on what is selected
    if (selectedShirtDesign === "js puns") {
        $('.i-love-js').hide();
    }
    if (selectedShirtDesign === "heart js") {
        $('.js-puns').hide();
    }
});


//when activity is selected, add its cost to the totalPrice
$('.activities').on('change', (e) => {
    let cost = e.target.dataset.cost;
    cost = parseInt(cost.slice(1,4));

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
    $elementList.each(function(i, selectedActivity) {
        let selectedShouldBeDisabled = false;
        if (selectedActivity.checked === false) {
            $elementList.each(function(j, otherActivity) { 
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
        activity.parentElement.style.color = 'black';
    }
}

//when payment method is selected, hide other methods
$('select#payment').on('change', function() {

    let selected = $('#payment :selected').val();
    let paymentList = ["credit-card", "paypal", "bitcoin"];
    for (let i = 0; i < paymentList.length; i++) {
        $('#' + paymentList[i]).hide();
    }
    $('#' + selected).show();

    $('#paypal').html("<p>We'll take you to Paypal's site to set up your billing information when you click “Register” below.</p>");
    $('#bitcoin').html("<p>Since you selected Bitcoin we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p>")
})




///////////////////////////////
//Validation
///////////////////////////////



///////////////////////////////
//define variables & hide validation messages

//NAME input
const $nameInput = $('#name');
const $nameLabel = $nameInput.prev();
$nameLabel.html("Name:");

//EMAIL input
const $emailInput = $('#email');
const $emailLabel = $emailInput.prev();
$emailLabel.html("Email:");

//JOB input
const $jobInput = $('#other-title');
const $jobLabel = $jobInput.prev();
$jobLabel.html("Other Job Role:");

//COLOR select
const $colorInput = $('#color');
const $colorLabel = $colorInput.prev();
$colorLabel.html("Please select a color")

//ACTIVITIES checkbox
const $activitiesLabel = $('fieldset.activities legend');
$activitiesLabel.html("Register for Activities:");





function showApplicableErrorMessages() {
    console.log('showApplicableErrorMessages()')
    //check each field and show needed messages
}

function showHideErrorMessages() {
    //show/hide messages when input is selected or text box is focused/blurred

    $nameInput.on('blur', () => {
        checkName();
    });
    $nameInput.on('focus', () => {
        $nameLabel.html("Name:");
    });

    $emailInput.on('blur', () => {
        checkEmail();
    });
    $emailInput.on('focus', () => {
        $emailLabel.html("Email:");
    });

    $jobInput.on('blur', () => {
        checkJob();
    });
    $jobInput.on('focus', () => {
        $jobLabel.html("Other Job Role:");
    });

    $colorInput.on('focus', () => {
        $jobLabel.html("Please select a color");
    })
}



//DONE
function checkName() {
    if ($nameInput.val()) {
        return true;
    } else {
        $nameLabel.html("Name: <span class='red'>(name required)</span>");
    }
}

function checkEmail() {
    const emailRegex = /^[\w.+-]+@[\w.]+\.\w+$/;
    let email = $emailInput.val();
    if (email.search(emailRegex)) {
        $emailLabel.html("Email: <span class='red'>(valid email required)</span>");
    } else {
        return true;
    }
}

function checkJob() {
    if ($jobInput.val()) {
        return true;
    } else {
        $jobLabel.html("Other Job Role: <span class='red'>(type your job role)</span>");
    }
}

function checkColor() {
    if ($colorInput.val() === "chooseColor") {
        $colorLabel.html("<span class='red'>Please select a color</span>")
    }
}

function checkActivities() {
    const $activitiesList = $('fieldset.activities input');
    $activitiesList.each((index, value) => {
        if ($activitiesList[index].checked === true) {
            return true;
        } else {
            $activitiesLabel.html("Register for Activities <span class='red'>(at least one required)</span>")
        }
    })
}

function checkCreditCard() {
    if ($('select#payment :selected').val() === "credit-card") {
        //check card number
        if (checkNumber("#cc-num", 13, 16) === false) {
            $('label[for="cc-num"]').html("Card Number <span class='red'>Must be between 13 and 16 digits</span>");
        }
        if (checkNumber("#zip", 5, 5) === false) {
            $('label[for="zip"]').html("Zip code <span class='red'>Enter a valid zip code</span>");
        }
        if (checkNumber("#cvv", 3, 4) === false) {
            $('label[for="cvv"]').html("CVV <span class='red'>Enter valid CVV</span>");
        }

    }
}

function checkNumber(element, lowerCount, upperCount) {
    let number = $(element).val();
    if (number.length <= upperCount && number.length >= lowerCount) {
        return true;
    } else {
        return false;
    }
}

function submitValidation() {
    checkName();
    checkEmail();
    checkJob();
    checkColor();
    checkActivities();
    checkCreditCard();
}








showHideErrorMessages();
$('form').on('submit', (e) => {
    e.preventDefault();
    submitValidation();
});