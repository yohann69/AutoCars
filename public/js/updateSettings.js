import axios from "axios"
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe'
        const res = axios({
            method: 'PATCH',
            url,
            data
        })
        // console.log(res.data.status)
        if (res.data.status === 'success') {
            showAlert('Informations mises à jour avec succès!')
            window.setTimeout(() => {
                location.assign('/monCompte')
            }, 1500)
        }
    } catch (err) {
        showAlert(err.response.data.message)
    }
}