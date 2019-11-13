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


function disableConflictingTimes(time) {
    const listOfTimes = $('input[data-day-and-time]');
}