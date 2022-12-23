import axios from "axios";
import { showAlert } from "./alert";

export const createClient = async (fname, lname, phone, email, address, city, postalCode) => {
    try {
        const res = await axios({
            method: "post",
            url: '/api/v1/clients',
            data: {
                vehicleList: [],
                fname,
                lname,
                phone,
                email,
                address,
                city,
                postalCode
            }
        });

        if (res.data.status === "success") {
            showAlert("success", "Client créé avec succès !");
            // window.setTimeout(() => {
            //     location.assign('/connexion');
            // }, 1500);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}

export const addCarToClient = async (idClient, vehicleList) => {
    try {

        const res = await axios({
            method: "post",
            url: `/api/v1/users/clients/${idClient}`,
            data: {
                vehicleList
            }
        });

        if (res.data.status === "success") {
            showAlert("success", "Véhicule ajouté avec succès !");
            // window.setTimeout(() => {
            //     location.assign('/connexion');
            // }, 1500);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }

}