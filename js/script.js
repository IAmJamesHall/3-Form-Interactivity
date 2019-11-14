let totalPrice = 0;

// focus on name field onload
$('#name').focus();

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
    console.log($('h3#payment-total'));
    console.log(totalPrice);
    $('#payment-total').html('$' + totalPrice);
});

//when activity is selected, disable conflicting activities
$('fieldset.activities').on('change', (event) => {
    /* let target = event.target;
    if (target.checked) {
        toggleDisabledOnConflictingActivities(true, target);
    } else {
        toggleDisabledOnConflictingActivities(false, target);
    } */

    
    const $elementList = $('input[data-day-and-time]');
    let checkedList = [];
    $elementList.each(function(index, value) {
        if (value.checked === true) {
            checkedList.push(true);
            value.checked = false;
        } else {
            checkedList.push(false);
        }   
    });


    for (let i = 0; i < checkedList.length; i++) {
        if (checkedList[i] === true) {
            toggleDisabledOnConflictingActivities(true, $elementList[i]);
        } else {
            toggleDisabledOnConflictingActivities(false, $elementList[i]);
        }
    }

    $elementList.each((index, value) => {
        if (checkedList[index] === true) {
            value.checked = true;
        }
    })

    
});

// this function works except when the "Main Conference" box is checked. 
// Something to look into.

//DOC: this function disables all other possible activities that fill that time slot
//     in the "register for activities" section. It accepts two arguments:
//     - disable: a flag that tells the function to either disable or enable conflicting argument
//     - activity: the activity that all other activities will be tested against
function toggleDisabledOnConflictingActivities(disable, activity) {
    let selectedActivity = extractDateObjects(activity.dataset.dayAndTime);
    const $elementList = $('input[data-day-and-time]');
    $elementList.each(function (index, value) {
        if (activity != value) {
            let otherActivity = extractDateObjects(value.dataset.dayAndTime);
            if (checkIfTimeConflicts(selectedActivity, otherActivity)) {
                if (disable) {
                    value.setAttribute("disabled", ""); //adds disabled attr
                    value.parentElement.style.color = 'grey';
                    //value.checked = false;
                } else {
                    value.removeAttribute("disabled"); //removes disabled attr
                    value.parentElement.style.color = 'black';
                }
            }
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
        if (selectedActivity.start > otherActivity.end || selectedActivity.end < otherActivity.start) {
            return false;
        } else {
            return true;
        }

    }
}