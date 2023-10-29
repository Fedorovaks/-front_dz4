const btn = document.querySelector(".btn");
const form = document.querySelector(".registration");
const email = document.querySelector("#email");
const lastName = document.querySelector("#name");
const pass = document.querySelector("#pass");
const passConfirm = document.querySelector("#confirm-pass");
const successSent = document.querySelector(".success__text");
const title = document.querySelector("h1");
const checkbox = document.querySelector("#checkbox");

const hidePassword = () => {
    const password = document.getElementById("pass");
    const passwordConfirm = document.getElementById("confirm-pass");
    if (password.type === 'text') {
        password.type = 'password';
    }
    if (passwordConfirm.type === 'text') {
        passwordConfirm.type = 'password';
    }
};

hidePassword();

const togglePassword = document.querySelector('.form-control__pass-show');
const togglePasswordConfirm = document.querySelector('.form-control__pass-confirm-show');
const hidenPass = document.querySelector('.hiden__pass');
const hidenPassConfirm = document.querySelector('.hiden__pass-confirm');

const showOrHidePassword = (e) => {
    e.preventDefault();
    const password = document.getElementById('pass');

    if (password.type === 'password') {
        password.type = 'text';
        hidenPass.classList.remove("fa-eye");
        hidenPass.classList.toggle("fa-low-vision");
    } else {
        password.type = 'password';
        hidenPass.classList.remove("fa-low-vision");
        hidenPass.classList.toggle("fa-eye");
    }

};

togglePassword.addEventListener('click', showOrHidePassword);

const showOrHidePasswordConfirm = (e) => {
    e.preventDefault();
    const passwordConfirm = document.getElementById("confirm-pass");
    if (passwordConfirm.type === 'password') {
        passwordConfirm.type = 'text';
        hidenPassConfirm.classList.remove("fa-eye");
        hidenPassConfirm.classList.toggle("fa-low-vision");
    } else {
        passwordConfirm.type = 'password';
        hidenPassConfirm.classList.remove("fa-low-vision");
        hidenPassConfirm.classList.toggle("fa-eye");
    }
};

togglePasswordConfirm.addEventListener('click', showOrHidePasswordConfirm);

btn.addEventListener("click", btnSubmit);

// Выполняем действия при клике ..
function btnSubmit(e) {
    e.preventDefault();

    validate();

    const submitValid = document.querySelectorAll(".form-control");
    var count = 0;
    // переберём выбранные элементы
    submitValid.forEach((el) => {
        if (el.classList.contains("success")) {
            count = count + 1;
        }
    });

    if (count == 5) {
        localStorage.setItem('E-mail', email.value);
        localStorage.setItem('Name', lastName.value);
        localStorage.setItem('Password', pass.value);
        localStorage.setItem('Password confirm', passConfirm.value);

        form.style.display = 'none';
        title.style.display = 'none';
        successSent.classList.toggle("visible");
    }
}

const setError = (element, message) => {
    const inputForm = element.parentElement;
    const error = inputForm.querySelector(".error");

    error.innerText = message;
    inputForm.classList.add("error");
    inputForm.classList.remove("success")
}

const setSuccess = element => {
    const inputForm = element.parentElement;
    const error = inputForm.querySelector(".error");

    error.innerText = '';
    inputForm.classList.add("success");
    inputForm.classList.remove("error");
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const isValidPassNum = pass => {
    const re = /(?=.*[0-9])/g;
    return re.test(String(pass).toLowerCase());
}
const isValidPassSymbol = pass => {
    const re = /(?=.*[!@#$%^&*])/g;
    return re.test(String(pass).toLowerCase());
}

const validate = () => {
    const emailValue = email.value.trim();
    const usernameValue = lastName.value.trim();
    const passValue = pass.value.trim();
    const passConfirmValue = passConfirm.value.trim();

    if (emailValue === '') {
        setError(email, 'Введите E-mail');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Е-mail должен быть xxx@xxx.xx');
    } else if (emailValue.length > 100) {
        setError(email, 'Максимально допустимый размер e-mail 100 символов');
    } else {
        setSuccess(email);
    }

    if (usernameValue === '') {
        setError(lastName, 'Введите ФИО');
    } else if (usernameValue.length > 150) {
        setError(lastName, 'Поле не может содержать более 150 символов')
    } else {
        setSuccess(lastName);
    }

    if (passValue === '') {
        setError(pass, 'Введите пароль');
    } else if (passValue.length < 8) {
        setError(pass, 'Пароль не может содержать менее 8 символов')
    } else if (passValue.length > 30) {
        setError(pass, 'Пароль не может содержать более 30 символов')
    } else if ((!isValidPassNum(passValue)) && (!isValidPassSymbol(passValue))) {
        setError(pass, 'Пароль должен содержать спец. символ или цифру')
    } else {
        setSuccess(pass);
    }

    if (passConfirmValue === '') {
        setError(passConfirm, 'Подтвердите пароль');
    } else if (passConfirmValue !== passValue) {
        setError(passConfirm, "Пароль не совпадает с ранее введенным");
    } else {
        setSuccess(passConfirm);
    }

    if (checkbox.checked) {
        setSuccess(checkbox);
    } else {
        setError(checkbox, "Вы обязаны подтвердить, что хотите зарегистрироваться");
    }

};

