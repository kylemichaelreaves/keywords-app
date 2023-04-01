import React from 'react';
import { render } from '@testing-library/react';
import AddressesList from "../../components/AddressGeocoder/AddressesList";

describe('AddressesList component', () => {
    const mockData = [
        {
            display_name: 'Address 1',
            address: {
                street: 'Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
            },
            boundingbox: ['40.1234', '40.5678', '-74.1234', '-74.5678'],
            lat: '40.3456',
            lon: '-74.3456',
        },
        {
            display_name: 'Address 2',
            address: {
                street: 'Broadway',
                city: 'New York',
                state: 'NY',
                zip: '10002',
            },
            boundingbox: ['40.1111', '40.2222', '-74.1111', '-74.2222'],
            lat: '40.3333',
            lon: '-74.3333',
        },
    ];

    it('renders a list of addresses', () => {
        const { getAllByRole } = render(<AddressesList data={mockData} />);
        const listItems = getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });

    it("AddressesList component renders the address information correctly", () => {
        render(<AddressesList data={mockData} />);
        const listItems = document.querySelectorAll("li");

        expect(listItems.length).toBe(mockData.length);
    });

});
