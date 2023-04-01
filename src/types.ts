export interface AddressFields {
    streetAddress: string;
    unitOrAptNum?: string;
    municipality: string;
    state: string;
    zipcode?: string;
}

export interface AddressResponse {
    osm_type: string;
    osm_id: number;
    licence: string;
    boundingbox: string[];
    address: {
        country: string;
        country_code: string;
        town?: string;
        road: string;
        "ISO3166-2-lvl4": string;
        county: string;
        neighbourhood?: string;
        village?: string;
        postcode: string;
        house_number: string;
        state: string
    };
    importance: number;
    lon: string;
    display_name: string;
    type: string;
    class: string;
    place_id: number;
    lat: string
}

export interface FieldConfig {
    streetAddress: { label: string, required: boolean },
    unitOrAptNum: { label: string, required: boolean },
    municipality: { label: string, required: boolean },
    state: { label: string, required: boolean },
    zipcode: { label: string, required: boolean }
}

export interface AddressesListProps {
    data: {
        boundingbox: string[];
        lat: string;
        lon: string;
        address: {
            house_number?: string;
            road?: string;
            town?: string;
            county?: string;
            state?: string;
            postcode?: string;
            country?: string;
            country_code?: string;
        };
        display_name: string;
    }[];
}

export interface TransactionInterface {
    transactionId: string;
    date: string;
    memo?: string;
    amountCredit?: string;
    amountDebit: string;

}

export interface NavBarProps {
    routes: {
        path: string;
        label: string;
        icon: any;
    }[];
}

export type TransactionLoaderData = {
    transactionQuery: { data: TransactionInterface };
};