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
    routes: Array<{
        path: string;
        label: string;
        icon: any; // Replace 'any' with the appropriate type if you know it
    }>;
}


export type TransactionLoaderData = {
    transactionQuery: { data: TransactionInterface };
};

export type Route = {
    path: string;
    label: string;
    icon: React.ReactNode;
};

// export type NavBarProps = {
//     routes: Route[];
// };
