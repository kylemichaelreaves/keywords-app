// TestComponent.tsx
import React from 'react';
import {useAddress} from "../hooks/useAddresses";
import {AddressFields} from "../types";

interface TestComponentProps {
    address: AddressFields;
}

const TestComponent: React.FC<TestComponentProps> = ({ address }) => {
    const { data, isLoading, isError, error, refetch } = useAddress(address);

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return ""
    };

    // TS2339: Property 'message' does not exist on type '{}'.
    if (isError && error) return <div>Error: {error?.message}</div>;

    return (
        <div>
            <button name="Refetch" onClick={() => refetch()}>Refetch</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default TestComponent;
