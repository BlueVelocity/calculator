# Calculator
This calculator takes two operands and an operator as input and returns the
calculated result. It also allows for further calculations based on the previous
result.

**Link to project:** [Calculator Project](https://bluevelocity.github.io/calculator/)

## How It's Made:

This project was built using plain HTML, CSS, and JavaScript.

First, the HTML structure of the page was generated using Emmet strings to create
the basic structure.

Then, CSS styles were applied to make the calculator usable on both desktop and
mobile devices.

After setting up the basic HTML and CSS, JavaScript code was written to
implement the calculator's functionality, following the constraints specified by
The Odin Project.

The calculator is designed with two objects: one for HTML element selection and
another to store the calculator's "memory." This approach helps clarify where
these variables are used in the code.

The code also includes logic to handle operator selection, operand input, and
error handling for scenarios like division by zero, large numbers (bigInts), and
handling floating-point and integer values.

Once the core logic was implemented, testing was conducted to ensure the
calculator operates smoothly and that users cannot bypass its restrictions.

Additionally, the calculator supports user input via the keyboard.

## Lessons Learned:

This project provided valuable insights into code maintainability, usability,
and the importance of testing.

**Code Maintainability:** During the development process, I had to revisit the
project multiple times and refactor the code to introduce new features. This
experience highlighted the importance of applying lessons learned about code
maintainability from my reading and education.

**Bugs:** One important lesson from this project is that when adding new
features, unintended consequences can arise due to both the new feature and its
interaction with existing code. For instance, a specific bug occurred with the
error handling for division by zero, where attempting to display a snarky
comment allowed users to interact with the displayed text, leading to a "NaN"
output when mixing letters and numbers. This issue underscored the need for
careful feature implementation and consideration of potential side effects.

**Encapsulation:** Implementing encapsulation in the middle of the project
proved to be a valuable practice that I plan to carry forward. Encapsulation
made it easier to understand the code's functionality and reduced the risk of
unintended variable calls by isolating variables within their respective scopes.
