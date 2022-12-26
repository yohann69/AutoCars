import axios from "axios";
import { showAlert } from "./alert";

export const createOperation = async (name, price, duration) => {
    try {
        const res = await axios({
            method: "post",
            url: '/api/v1/operations',
            data: {
                name,
                price,
                duration
            }
        });

        if (res.data.status === "success") {
            showAlert("success", "Opération créée avec succès !");
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}

export const updateOperation = async (id, name, price, duration) => {
    try {
        const res = await axios({
            method: "patch",
            url: `/api/v1/operations/${id}`,
            data: {
                name,
                price,
                duration
            }
        });

        if (res.data.status === "success") {
            showAlert("success", "Opération mise à jour avec succès !");
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}

export const deleteOperation = async id => {
    try {
        const res = await axios({
            method: "delete",
            url: `/api/v1/operations/${id}`
        });

        if (res.data.status === "success") {
            showAlert("success", "Opération supprimée avec succès !");
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}

