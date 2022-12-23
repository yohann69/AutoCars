import '@babel/polyfill'
import { login, logout } from './login.js';
import { registerUser } from './registerUser.js';
import { updateSettings } from './updateSettings.js';


// DOM ELEMENTS
const loginForm = document.querySelector('form');
const logOutBtn = document.querySelector('.nav-right');
const userDataForm = document.querySelector('.myAccountData');
const userPassForm = document.querySelector('.myAccountPassword');
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
        const fname = document.querySelector('#fname').value;
        const lname = document.querySelector('#lname').value;
        const email = document.querySelector('#email').value;
        console.log({fname, lname, email})
        updateSettings({fname, lname, email}, 'data');
    })
}


if(userPassForm) {
    userPassForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btnUpdatePassword').textContent = 'Enregistrement...';
        
        const passwordCurrent = document.querySelector('.password-current').value;
        const password = document.querySelector('.password-new').value;
        const passwordConfirm = document.querySelector('.password-confirm').value;
        
        console.log({passwordCurrent, password, passwordConfirm})
        await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');
        
        
        document.querySelector('.btnUpdatePassword').textContent = 'Enregistrer les modifications';
        document.querySelector('.password-current').value = '';
        document.querySelector('.password').value = '';
        document.querySelector('.password-confirm').value = '';
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

