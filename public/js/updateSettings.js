import axios from "axios"

export const updateSettings = async (fname, lname, email) => {
    try {
        const res = axios({
            method: 'PATCH',
            url: '/api/v1/users/updateMe',
            data: {
                fname,
                lname,
                email
            }
        })
        if (res.data.status === 'success') {
            alert('Informations mises à jour avec succès!')
            window.setTimeout(() => {
                location.assign('/monCompte')
            }, 1500)
        }
    } catch (err) {
        alert(err.response.data.message)
    }
}