import axios from 'axios';


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
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }
}

