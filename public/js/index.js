import '@babel/polyfill'
import { login, logout } from './login.js';


// DOM ELEMENTS
const loginForm = document.querySelector('form');
const logOutBtn = document.querySelector('.nav-right');

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