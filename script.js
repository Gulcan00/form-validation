function validatePassword() {
    const password = document.querySelector('#password');
    const errorSpan = document.querySelector('label[for="password"] span');

    errorSpan.innerHTML = null;
    errorSpan.classList.remove('error');
    const uppercaseSpan = document.createElement('span');
    uppercaseSpan.classList.add('password');
    const lowercaseSpan = document.createElement('span');
    uppercaseSpan.classList.add('password');
    const numberSpan = document.createElement('span');
    numberSpan.classList.add('password');
    const spaceSpan = document.createElement('span');
    spaceSpan.classList.add('password');
    const lengthSpan = document.createElement('span');
    lengthSpan.classList.add('password');
    const emptySpan = document.createElement('span');
    emptySpan.classList.add('password');

    if (password.validity.valueMissing) {
        emptySpan.classList.add('error');
        emptySpan.innerText = `Please enter your password`;
    } else {
        emptySpan.classList.remove('password');
    }
    if (password.validity.tooShort) {
        lengthSpan.classList.add('error');
        lengthSpan.innerText = `At least ${password.minLength} characters`;
    } else {
        lengthSpan.classList.remove('password');
    }
    if (!/[A-Z]/.test(password.value)) {
        uppercaseSpan.classList.add('error');
        uppercaseSpan.innerText = 'At least one uppercase letter';
    } else {
        uppercaseSpan.classList.remove('password');
    }
    if (!/[a-z]/.test(password.value)) {
        lowercaseSpan.classList.add('error');
        lowercaseSpan.innerText = 'At least one lowercase letter';
    } else {
        lowercaseSpan.classList.remove('password');
    }
    if (!/[0-9]/.test(password.value)) {
        numberSpan.classList.add('error');
        numberSpan.innerText = 'At least one number';
    } else {
        numberSpan.classList.remove('password');
    }
    if (/[\s]/.test(password.value)) {
        spaceSpan.classList.add('error');
        spaceSpan.innerText = 'No spaces allowed';
    } else {
        spaceSpan.classList.remove('password');
    }

    errorSpan.appendChild(lengthSpan);
    errorSpan.appendChild(emptySpan);
    errorSpan.appendChild(uppercaseSpan);
    errorSpan.appendChild(lowercaseSpan);
    errorSpan.appendChild(numberSpan);
    errorSpan.appendChild(spaceSpan);
}

function validateConfirmPassword() {
    const confirmPassword = document.querySelector('#confirmPassword');
    const errorSpan = document.querySelector('label[for="confirmPassword"] span');
    const password = document.querySelector('#password');

    if (confirmPassword.value !== password.value) {
        errorSpan.classList.add('error');
        errorSpan.innerText = 'Passwords must match';
    } else {
        errorSpan.innerText = '';
        errorSpan.classList.remove('error');
    }
}

function showError(field, name) {
    const fieldId = field.id;
    const errorSpan = document.querySelector(`label[for="${fieldId}"] span`);
    errorSpan.classList.add('error');
    
    if (fieldId === 'password') {
       validatePassword();
    } else if (fieldId === 'confirmPassword') {
        validateConfirmPassword();
    } else if (field.validity.valueMissing) {
        errorSpan.innerText = `Please enter your ${name}`;
    } else if (field.validity.typeMismatch) {
        errorSpan.innerText = `Please enter a valid ${name}`;
    } else if (field.validity.tooShort) {
        errorSpan.innerText = `Please enter a ${name} with at least ${field.minLength} characters`;
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
    const confirmPassword = document.querySelector('#confirmPassword');

    function handleInputChange(element, name) {
       element.addEventListener('input', () => {
            if (element.checkValidity()) {
                removeError(element.id);
            } else {
                showError(element, name);
            }
        });
    }

    handleInputChange(email, 'email');
    handleInputChange(country, 'country');
    handleInputChange(zipCode, 'zip code');
    handleInputChange(password, 'password');
    handleInputChange(confirmPassword, 'confirm password');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
            alert('Great job! High five 🖐');
            form.reset();
        } else {
            showError(email, 'email');
            showError(country, 'country');
            showError(zipCode, 'zip code');
            showError(password, 'password');
            showError(confirmPassword, 'confirm password');
        }
    })
}

validateForm();