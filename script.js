function showError(field, name) {
    const fieldId = field.id;
    const errorSpan = document.querySelector(`label[for="${fieldId}"] span`);
    errorSpan.classList.add('error');
    
    if (field.validity.valueMissing) {
        errorSpan.innerText = `Please enter your ${name}`;
    } else if (field.validity.typeMismatch) {
        errorSpan.innerText = `Please enter a valid ${name}`;
    } else if (field.validity.tooShort) {
        errorSpan.innerText = `Please enter a ${name} with at least ${field.minLength} characters`;
    } else if (field.validity.patternMismatch && fieldId === 'password') {
        errorSpan.innerText = `Please enter a ${name} with at least one uppercase letter, one lowercase letter, one number and one special character`;
    } else {
        errorSpan.innerText = '';
        errorSpan.classList.remove('error');
    }
}

function removeError(field) {
    const errorSpan = document.querySelector(`label[for="${field}"] span.error`);
    errorSpan.innerText = '';
    errorSpan.classList.remove('error');
}

function validateForm() {
    const form = document.querySelector('form');
    const email = document.querySelector('#email');
    const country = document.querySelector('#country');
    const zipCode = document.querySelector('#zipCode');
    const password = document.querySelector('#password');

    email.addEventListener('input', () => {
        if (email.checkValidity()) {
            removeError('email');
        } else {
            showError(email, 'email');
        }
    });

    country.addEventListener('input', () => {
        if (country.checkValidity()) {
            removeError('country');
        } else {
            showError(country, 'country');
        }
    });

    zipCode.addEventListener('input', () => {
        if (zipCode.checkValidity()) {
            removeError('zipCode');
        } else {
            showError(zipCode, 'zip code');
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
            alert('Form submitted');
        } else {
            showError(email, 'email');
            showError(country, 'country');
            showError(zipCode, 'zip code');
            showError(password, 'password');
        }
    })
}

validateForm();