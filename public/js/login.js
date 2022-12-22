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
            if(res.data.role === 'admin') {
                location.assign('/accueilAdmin');
            }
            if(res.data.role === 'chief') {
                location.assign('/accueilChef');
            }
            if(res.data.role === 'employee') {
                location.assign('/accueilEmploye');
            }
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