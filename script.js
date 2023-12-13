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
        if (!/[A-Z]/.test(field.value)) {
            errorSpan.innerText = `Please enter a ${name} with at least one uppercase letter`;
        } else if (!/[a-z]/.test(field.value)) {
            errorSpan.innerText = `Please enter a ${name} with at least one lowercase letter`;
        } else if (!/[0-9]/.test(field.value)) {
            errorSpan.innerText = `Please enter a ${name} with at least one number`;
        } else if (/[\s]/.test(field.value)) {
            errorSpan.innerText = `Please enter a ${name} without spaces`;
        }
    } else {
        errorSpan.innerText = '';
        errorSpan.classList.remove('error');
    }
}

function removeError(fieldId) {
    const errorSpan = document.querySelector(`label[for="${fieldId}"] span.error`);
    errorSpan.innerText = '';
    errorSpan.classList.remove('error');
}

function validateForm() {
    const form = document.querySelector('form');
    const email = document.querySelector('#email');
    const country = document.querySelector('#country');
    const zipCode = document.querySelector('#zipCode');
    const password = document.querySelector('#password');

    function handleInputChange(element, name) {
       element.addEventListener('input', () => {
            if (element.checkValidity()) {
                removeError(name);
            } else {
                showError(element, name);
            }
        });
    }

    handleInputChange(email, 'email');
    handleInputChange(country, 'country');
    handleInputChange(zipCode, 'zip code');
    handleInputChange(password, 'password');

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