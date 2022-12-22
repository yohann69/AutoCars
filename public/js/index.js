import '@babel/polyfill'
import { login } from './login.js';

// DOM ELEMENTS
const loginForm = document.querySelector('form');


// VALUES


// DELEGATION


if(loginForm){
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        login(email, password);
    })
}