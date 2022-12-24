import axios from 'axios';
import { showAlert } from './alert';

export const registerUser = async (fname, lname, role, /*username,*/ email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/signup',
            data: {
                fname,
                lname,
                role,
                // username,
                email,
                password,
                passwordConfirm
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Inscription réussie !');
            // window.setTimeout(() => {
            //     location.assign('/connexion');
            // }, 1500);
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
}