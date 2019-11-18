# Team Treehouse Project 3
## Form Interactivity & Validation

This project started with a simple form and added interactivity.

My starter files were `index.html` and `style.css`.
I added `script.js` and [`normalize.css`](github.com/necolas/normalize.css).
I tweaked small things in `index.html`, such as adding more activities as test cases for my interactivity. I made minor changes to a few class names as well.

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
    - email field must have valid email
    - job role (if 'other') must be filled
    - T-shirt design & color must be selected
    - at least 1 activity must be selected
    - if credit card is used
        - card number must have 13-16 digits
        - zip must have 5 digits
        - CVV must have 3-4 digits
- Progressive enhancement: form works without JS

### Extra Credit