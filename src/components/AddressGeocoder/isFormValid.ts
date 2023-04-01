import {AddressFields, FieldConfig} from "../../types";

export function isFormValid(fieldsConfig: FieldConfig, addressFields: AddressFields, isFetching: boolean) {
    return (
        Object.keys(fieldsConfig).every(
            (fieldKey) =>
                !fieldsConfig[fieldKey as keyof typeof fieldsConfig].required ||
                Boolean(addressFields[fieldKey as keyof AddressFields])
        ) && !isFetching
    );
}
