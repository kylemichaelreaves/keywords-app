export interface AddressFields {
    streetAddress: string;
    unitOrAptNum: string;
    municipality: string;
    state: string;
    zipcode: string;
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