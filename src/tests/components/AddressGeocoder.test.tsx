import React from 'react';
import {fireEvent, getByText, render, screen, waitFor} from '@testing-library/react';
import {AddressGeocoder} from '../../components/AddressGeocoder/AddressGeocoder';
import {vi} from 'vitest';
import {createQueryProviderWrapper} from '../create-query-client-wrapper';
import {addressesMock} from "../data/addressMock";
import {isFormValid} from "../../components/AddressGeocoder/isFormValid";

const isFormValidSpy = vi.fn().mockImplementation(isFormValid)
const setup = () => {
    const utils = render(<AddressGeocoder/>, {wrapper: createQueryProviderWrapper()})
    const streetAddressInput = screen.getByPlaceholderText('Street Address')
    const municipalityInput = screen.getByPlaceholderText('Municipality')
    const stateInput = screen.getByPlaceholderText('State')
    const button = utils.container.querySelector('button') as HTMLButtonElement
    return {
        streetAddressInput,
        municipalityInput,
        stateInput,
        button,
        ...utils
    }
}

vi.mock('../../hooks/useAddresses', async () => {
    const actual = await vi.importActual("../../hooks/useAddresses");
    return {
        actual,
        useAddress: () => ({
            data: null,
            isLoading: false,
            isError: false,
            error: null,
            isFetching: true,
            refetch: vi.fn().mockResolvedValue({data: {message: addressesMock}}),
        }),
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

test('renders the form with input fields and a submit button', async () => {

    await render(<AddressGeocoder/>, {wrapper: createQueryProviderWrapper()});
    expect(screen.getByPlaceholderText('Street Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Unit or Apt Num')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Municipality')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('State')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Zip Code')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Geocode Address'})).toBeInTheDocument();
});

test("The required inputs exist, but initially: blankly and  required", () => {
    const {streetAddressInput, stateInput, municipalityInput} = setup()
    expect(streetAddressInput).toBeTruthy()
    expect(stateInput).toBeTruthy()
    expect(municipalityInput).toBeTruthy()

    expect(streetAddressInput.textContent).toBe('')
    expect(stateInput.textContent).toBe('')
    expect(stateInput.textContent).toBe('')

    expect(streetAddressInput).toBeRequired()
    expect(municipalityInput).toBeRequired()
    expect(stateInput).toBeRequired()
})


test('button is disabled when isFetching is true', async () => {
    const refetch = vi.fn().mockResolvedValue({data: {message: addressesMock}});

    await vi.mock('../../hooks/useAddresses', () => {
        return {
            refetch,
            data: null,
            isLoading: false,
            isError: false,
            error: null,
            isFetching: true
        };
    });

    render(<AddressGeocoder/>, {wrapper: createQueryProviderWrapper()});
    const geocodeButton = screen.getByRole('button', {name: 'Geocode Address'});
    expect(geocodeButton).toBeDisabled();
});

test('button is disabled when form fields are empty', () => {
    render(<AddressGeocoder/>, {wrapper: createQueryProviderWrapper()});
    const geocodeButton = screen.getByRole('button', {name: 'Geocode Address'});
    expect(geocodeButton).toBeDisabled();
});

test('button is enabled when the required form inputs are not their initial values', async () => {
    isFormValidSpy.mockReturnValue(true);
    const {streetAddressInput, stateInput, municipalityInput} = setup()
    fireEvent.change(streetAddressInput, {target: {value: '123 Main St'}});
    fireEvent.change(municipalityInput, {target: {value: 'Anytown'}});
    fireEvent.change(stateInput, {target: {value: 'CA'}});
    const wrapper = render(<AddressGeocoder/>, {wrapper: createQueryProviderWrapper()});
    const button =  wrapper.container.querySelector('button');
    expect(button).not.toHaveAttribute('disabled=""');
});

test('the button is disabled when accessed through wrapper.container.querySelector...', () => {
    const wrapper = render(<AddressGeocoder/>, {wrapper: createQueryProviderWrapper()});
    const button = wrapper.container.querySelector('button') as HTMLButtonElement;
    fireEvent(getByText(button, 'Geocode Address'), new MouseEvent('click'))
    expect(button).toBeDisabled()
})