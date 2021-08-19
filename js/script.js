const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const inputs = document.querySelectorAll('input')
const inputArr = [...inputs]
const errorIcons = document.querySelectorAll('.__error-icon')
const errorIconArr = [...errorIcons]
const form = document.querySelector('form');

//  trigger the input error state style and display the error message of that input
const showErrorStyleAndMessage = (input, message) => {
    //  indexing the small tag after the input where to display the error message
    const small = input.nextElementSibling

    //  change the input class into error to apply the error style
    input.className = '--error'

    //  display the error message under the input
    small.style.display = 'block'

    //  writing the message into the small tag
    small.innerHTML = message
}

//  trigger the input success state style
const showSuccessStyle = input => {
    //  change the input class into success to display the success style
    input.className = '--success'

    //  remove the error message
    //  indexing the small tag after the input where to display the error message
    const small = input.nextElementSibling

    //  display the error message under the input
    small.style.display = 'none'

    //  remove the error icon
    errorIconArr.forEach(errorIcon => {
        errorIcon.previousElementSibling.style.display === 'block' ? errorIcon.style.display = 'block' :
            errorIcon.style.display = 'none'
    })
}

//  display the error icon if there is an error on the form submission
const showErrorIcon = () => {
    errorIconArr.forEach(errorIcon => {
        errorIcon.previousElementSibling.style.display === 'block' ? errorIcon.style.display = 'block' :
            errorIcon.style.display = 'none'
    })
}

//  regex for email validation
const isEmailValid = email => {
    //  email regex
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //  run a test to see if the email passed in matches the regex
    if (email.value.trim() === '') {
        showErrorStyleAndMessage(email, 'Email cannot be empty')
        showErrorIcon()
    } else if (re.test(email.value.trim())) {
        showSuccessStyle(email)
    } else {
        showErrorStyleAndMessage(email, 'Looks like this is not an email')
        showErrorIcon()
    }
}

//  get the name of each input from the id
//  transform the id (xxx-xxx) into a string (xxx xxx)
const getFieldName = input => {
    //  replace the - character with a ' ' into the string
    //  return the new string format (xxx xxx)
    input = input.id.replace('-', ' ')

    //  transform every first character to upper case
    //  take the first letter
    const firstLetterInput = input[0]

    //  take the letter after the space
    const secondLetter = input[input.indexOf(' ') + 1]

    //  subtract the first letter to the first word
    const firstWordLeft = input.substr(1, input.indexOf(' '))

    //  substring the second letter to the second word
    const secondWord = input.substring(input.indexOf('n') + 1)

    //  return the new string
    if (secondLetter === 'e') {
        return 'Email'
    } else if (secondLetter === 'p') {
        return 'Password'
    } else {
        return firstLetterInput.toUpperCase() + firstWordLeft + secondLetter.toUpperCase() + secondWord
    }
}

//  check if the length of the values in the inputs is correct
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showErrorStyleAndMessage(input, `${getFieldName(input)} must be at least ${min} characters`)
        showErrorIcon()
    } else if (input.value.length > max) {
        showErrorStyleAndMessage(input, `${getFieldName(input)} must be less than ${max} characters`)
        showErrorIcon()
    } else {
        showSuccessStyle(input)
    }
}

//  check if the form is empty
//  if form empty then trigger error state for inputs and display error messages
const isFormEmpty = inputArr => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showErrorStyleAndMessage(input, `${getFieldName(input)} cannot be empty`)
            showErrorIcon()
        } else {
            showSuccessStyle(input)
        }
    })
}

//  check if a field is empty on focus out
const isFieldEmpty = input => {
    if (input.value.trim() === '') {
        showErrorStyleAndMessage(input, `${getFieldName(input)} cannot be empty`)
    } else if (input.value.trim() !== '') {
        if (input.id === 'first-name') {
            checkLength(input, 4, 30)
        } else if (input.id === 'last-name') {
            checkLength(input, 4, 30)
        } else if (input.id === 'email') {
            isEmailValid(input)
        } else {
            checkLength(password, 6, 66)
        }
    } else {
        showSuccessStyle(input)
    }
}

// trigger the isFieldEmpty function on focus out
// and check if the input if empty
//  if input is empty trigger the error style and display error icon
inputArr.forEach(input => {
    input.addEventListener('focusout', () => {
        isFieldEmpty(input)
    })
})

//  form submission
form.addEventListener('submit', e => {
    e.preventDefault()

    //  check if the form is not empty
    isFormEmpty(inputArr)
    checkLength(firstName, 4, 30)
    checkLength(lastName, 4, 30)
    checkLength(password, 6, 66)
    isEmailValid(email)
})
