import {isAddressFormValid} from "../../components/AddressGeocoder/isAddressFormValid";
import {fieldsConfig} from "../../components/AddressGeocoder/AddressGeocoder";

describe('isAddressFormValid', () => {
    test('returns true when all required fields are filled and isFetching is false', () => {
        const addressFields = {
            streetAddress: '123 Main St',
            unitOrAptNum: '',
            municipality: 'Anytown',
            state: 'CA',
            zipcode: '',
        };

        expect(isAddressFormValid(fieldsConfig, addressFields, false)).toBe(true);
    });

    test('returns false when a required field is missing and isFetching is false', () => {
        const addressFields = {
            streetAddress: '123 Main St',
            unitOrAptNum: '',
            municipality: '',
            state: 'CA',
            zipcode: '',
        };

        expect(isAddressFormValid(fieldsConfig, addressFields, false)).toBe(false);
    });

    test('returns false when all required fields are filled and isFetching is true', () => {
        const addressFields = {
            streetAddress: '123 Main St',
            unitOrAptNum: '',
            municipality: 'Anytown',
            state: 'CA',
            zipcode: '',
        };

        expect(isAddressFormValid(fieldsConfig, addressFields, true)).toBe(false);
    });
});
