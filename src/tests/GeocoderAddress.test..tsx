import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddressGeocoder from "../components/AddressGeocoder/AddressGeocoder";
import {useAddress} from "../components/AddressGeocoder/useAddresses";

jest.mock("./useAddresses");

const mockUseAddress = useAddress as jest.MockedFunction<typeof useAddress>;

describe("AddressGeocoder", () => {
    beforeEach(() => {
        return mockUseAddress.mockReturnValue({
            dataUpdatedAt: 0,
            errorUpdateCount: 0,
            errorUpdatedAt: 0,
            failureCount: 0,
            failureReason: undefined,
            isFetched: false,
            isFetchedAfterMount: false,
            isInitialLoading: false,
            isLoadingError: false,
            isPaused: false,
            isPlaceholderData: false,
            isPreviousData: false,
            isRefetchError: false,
            isRefetching: false,
            isStale: false,
            isSuccess: false,
            fetchStatus: 'paused',
            remove: jest.fn(),
            status: 'loading',
            data: undefined,
            isLoading: true,
            isFetching: false,
            isError: false,
            error: null,
            refetch: jest.fn()
        });
    });


    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the form with input fields and a submit button", () => {
        render(<AddressGeocoder/>);

        expect(screen.getByLabelText("Street Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Unit or Apt Num")).toBeInTheDocument();
        expect(screen.getByLabelText("Municipality")).toBeInTheDocument();
        expect(screen.getByLabelText("State")).toBeInTheDocument();
        expect(screen.getByLabelText("Zip Code")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Geocode Address"})).toBeInTheDocument();
    });

    test("handles input changes and form submission", async () => {
        const {refetch} = mockUseAddress({
            streetAddress: '123 Main St',
            unitOrAptNum: 'Apt 4B',
            municipality: 'Anytown',
            state: 'CA',
            zipcode: '12345'
        });

        render(<AddressGeocoder/>);

        await userEvent.type(screen.getByLabelText("Street Address"), "123 Main St");
        await userEvent.type(screen.getByLabelText("Unit or Apt Num"), "Apt 4B");
        await userEvent.type(screen.getByLabelText("Municipality"), "Anytown");
        await userEvent.type(screen.getByLabelText("State"), "CA");
        await userEvent.type(screen.getByLabelText("Zip Code"), "12345");

        await userEvent.click(screen.getByRole("button", {name: "Geocode Address"}));

        await waitFor(() => {
            expect(refetch).toHaveBeenCalledTimes(1);
        });
    });

    test("displays a loading spinner when fetching", () => {
        mockUseAddress.mockReturnValue({
            ...mockUseAddress({
                streetAddress: '123 Main St',
                unitOrAptNum: 'Apt 4B',
                municipality: 'Anytown',
                state: 'CA',
                zipcode: '12345'
            }),
            isFetching: true,
        });

        render(<AddressGeocoder/>);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    test("disables the submit button when fetching", () => {
        mockUseAddress.mockReturnValue({
            ...mockUseAddress({
                streetAddress: '123 Main St',
                unitOrAptNum: 'Apt 4B',
                municipality: 'Anytown',
                state: 'CA',
                zipcode: '12345'
            }),
            isFetching: true,
        });

        render(<AddressGeocoder/>);

        expect(screen.getByRole("button", {name: "Geocode Address"})).toBeDisabled();
    });
})
;
