import '@babel/polyfill'
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';


// DOM ELEMENTS
const loginForm = document.querySelector('form');
const logOutBtn = document.querySelector('.nav-right');
const userDataForm = document.querySelector('.myAccount');

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