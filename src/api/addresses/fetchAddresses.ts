import {AddressFields} from "../../types";
import axios from "axios";
import {isValidURL} from "../helpers";

export async function fetchAddresses(address: AddressFields, fetchURL?: string) {
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
