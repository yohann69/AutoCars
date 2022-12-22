import '@babel/polyfill'
import { login, logout } from './login.js';
import { registerUser } from './registerUser.js';
import { updateSettings } from './updateSettings.js';


// DOM ELEMENTS
const loginForm = document.querySelector('form');
const logOutBtn = document.querySelector('.nav-right');
const userDataForm = document.querySelector('.myAccount');
const registerForm = document.querySelector('.createuser');


// VALUES


// DELEGATION


if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        login(email, password);
    })
}


if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}



if (userDataForm) {
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = {};
        form.fname = document.querySelector('#fname').value;
        form.lname = document.querySelector('#lname').value;
        form.email = document.querySelector('#email').value;
        console.log(form);
        updateSettings(form.fname, form.lname, form.email);
    })
}


if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const fname = document.querySelector('.fname').value;
        const lname = document.querySelector('.lname').value;
        const username = document.querySelector('.username').value;
        let role = document.querySelector('input[name="role"]:checked').value;
        if (role === "Administrateur") role = "admin";
        if (role === "Chef d'atelier") role = "chief";
        if (role === "Employé") role = "employee";
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const passwordConfirm = document.querySelector('.passwordConfirm').value;

        registerUser(fname, lname, role, username, email, password, passwordConfirm);
    })
}

