import axios from 'axios';
import { showAlert } from './alert';


export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        })


        if (res.data.status === 'success') {
            console.log("logged in successfully");
            location.assign('/');
            
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }
}



export const logout = async () => {
    console.log("logout");
    try {
        const res = await axios({
            method: 'get',
            url: '/api/v1/users/logout',
        })

        if (res.data.status === 'success') {
            // redirect to the login page
            location.assign('/connexion');
        }

    }catch (err) {
        showAlert(err.response.data.message);
    }
}