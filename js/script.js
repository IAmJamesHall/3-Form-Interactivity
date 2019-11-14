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
    $('.jsPuns').show();
    $('.iLoveJS').show();
    //reset selected option

    $('#color').val('chooseColor');

    //selectively hide options based on what is selected
    if (selectedShirtDesign === "js puns") {
        $('.iLoveJS').hide();
    }
    if (selectedShirtDesign === "heart js") {
        $('.jsPuns').hide();
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
});

$('fieldset.activities').on('change', (event) => {
    let target = event.target;
    if (target.checked) {
        toggleDisabledOnConflictingActivities(true, target);
    } else {
        toggleDisabledOnConflictingActivities(false, target);
    }
});

// this function works except when the "Main Conference" box is checkedd. 
// Something to look into.
function toggleDisabledOnConflictingActivities(disable, activity) {
    let selectedActivity = extractDateObjects(activity.dataset.dayAndTime);

    const $elementList = $('input[data-day-and-time]');
    $elementList.each(function (index, value) {
        if (activity != value) {
            let otherActivity = extractDateObjects(value.dataset.dayAndTime);
            if (checkIfTimeConflicts(selectedActivity, otherActivity)) {
                if (disable) {
                    value.setAttribute("disabled", ""); //adds disabled attr
                } else {
                    value.removeAttribute("disabled"); //removes disabled attr
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