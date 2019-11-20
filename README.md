# Team Treehouse Project 3
## Form Interactivity & Validation

This project started with a simple form and I added interactivity & validation.

My starter files were `index.html` and `style.css`.
I added `script.js` and [`normalize.css`](github.com/necolas/normalize.css).
I tweaked small things in `index.html`, such as adding more activities as test cases for my interactivity (detailed below). I made minor changes to a few class names as well.

My main work was done in `script.js`. I progressively added features to the form to make it more user-friendly.


### Features
- Interactiveness
    - 'Other' job field appears when necessary
    - correct T-shirt colors appear, depending on which design is selectd
    - selecting an activity automatically disables conflicting activities
    - cost total is updated live
    - payment method info updates based on payment method selection
    - validation messages appear and disappear without having to hit 'Submit'
    - 'Register' button checks form validation before submitting

- Form validation
    - name field must be filled
    - email field must be filled & have valid email
    - job role (if 'other') must be filled
    - T-shirt design & color must be selected
    - at least 1 activity must be selected
    - if credit card is used
        - card number must have 13-16 digits
        - zip must have 5 digits
        - CVV must have 3-4 digits

- Progressive enhancement: form works without JS

### Extra Credit
- hides the t-shirt 'color' menu until a design has been chosen
- conditional error message on credit card number input
- real-time error message on email input


### Changes to the Provided Template
- styling is mildly changed
- added extra activites as test cases for my overlapping date/time code
- changed `data-day-and-time` property to more closely follow ISO 8601 standards
- changed some tag names, etc to make code easier to work with & more uniform
- added less severe warning messages directly into HTML for progressive enhancement