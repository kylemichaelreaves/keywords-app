import {AddressFields} from "../../types";
import axios from "axios";
import {isValidURL} from "../helpers/isValidURL";

export async function fetchAddresses(address: AddressFields, fetchURL?: string) {
    if (!fetchURL) {
        if (!import.meta.env.VITE_APIGATEWAY_URL) {
            throw Error('VITE_APIGATEWAY_URL is not defined');
        } else {
            fetchURL = import.meta.env.VITE_APIGATEWAY_URL;
        }
    }

    const queryStringParams = new URLSearchParams(Object.entries(address));

    if (!isValidURL(fetchURL)) {
        throw Error('url is not valid');
    }

    return await axios.get(`${fetchURL}/address-geocoder`, {params: queryStringParams})
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err);
            throw new Error(err);
        });
}
