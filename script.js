function showError(field) {
    const fieldId = field.id;
    const errorSpan = document.querySelector(`label[for="${fieldId}"] span.error`);
    
    if (field.validity.valueMissing) {
        errorSpan.innerText = `Please enter your ${fieldId}`;
    } else if (field.validity.typeMismatch) {
        errorSpan.innerText = `Please enter a valid ${fieldId}`;
    } else if (field.validity.tooShort) {
        errorSpan.innerText = `Please enter a ${fieldId} with at least ${field.minLength} characters`;
    } else {
        errorSpan.innerText = '';
    }
}

function removeError(field) {
    const errorSpan = document.querySelector(`label[for="${field}"] span.error`);
    errorSpan.innerText = '';
}

function validateForm() {
    const form = document.querySelector('form');
    const email = document.querySelector('#email');

    email.addEventListener('input', () => {
        if (email.checkValidity()) {
            removeError('email');
        } else {
            showError(email);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
            alert('Form submitted');
        } else {
            showError(email);
        }
    })
}

validateForm();