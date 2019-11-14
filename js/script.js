let totalPrice = 0;

// focus on name field onload
$('#name').focus();

// hide BTC & PayPal payment fields
$('#paypal').hide();
$('#bitcoin').hide();

// hide other job role field if js is enabled
$('label[for="other-title"]').hide();
$('#other-title').hide();

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


