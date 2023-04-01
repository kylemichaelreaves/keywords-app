import {AddressFields} from "../../types";
import axios from "axios";
import {isValidURL} from "../helpers";

export async function fetchAddresses(address: AddressFields, fetchURL?: string) {
    if (!fetchURL) {
        // check if import.meta.env.VITE_APIGATEWAY_URL is defined
        if (!import.meta.env.VITE_APIGATEWAY_URL) {
            // if not, throw an error,
            throw Error('VITE_APIGATEWAY_URL is not defined');
            // otherwise, assign it to fetchURL
        } else {
            fetchURL = import.meta.env.VITE_APIGATEWAY_URL;
        }
    }

    const queryStringParams = new URLSearchParams(Object.entries(address));
    if (!isValidURL(fetchURL)) {
        throw Error('url is not valid');
    }
    return address === undefined
        ? Promise.reject(new Error('address is undefined'))
        : await axios.get(`${fetchURL}/address-geocoder`, {params: queryStringParams})
            .then(res => res.data)
            .catch(err => {
                console.log('err:', err);
                throw new Error(err);
            });
}
