import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomSelect from "../../components/shared/CustomSelect";
import {SelectChangeEvent} from "@mui/material/Select";

describe("CustomSelect Component", () => {
    const menuItems = [
        {value: "option1", label: "Option 1"},
        {value: "option2", label: "Option 2"},
        {value: "option3", label: "Option 3"},
    ];

    const selectName = "Test Select";

    test("renders the CustomSelect component", () => {
        const handleMockChange = vi.fn();
        render(<CustomSelect
            id={selectName}
            label={selectName}
            menuOptions={menuItems}
            selectName={selectName}
            selectValue={""}
            handleChange={handleMockChange}
        />);

        const selectElement = screen.getByRole("button");
        expect(selectElement).toBeInTheDocument();
    });

    test("renders the correct menu items", () => {
        const handleMockChange = vi.fn();
        render(<CustomSelect
            id={selectName}
            label={selectName}
            menuOptions={menuItems}
            selectName={selectName}
            selectValue={""}
            handleChange={handleMockChange}
        />);

        const selectElement = screen.getByRole("button");

        fireEvent.mouseDown(selectElement); // Add this line to open the dropdown

        menuItems.forEach((item) => {
            const menuItem = screen.getByText(item.label);
            expect(menuItem).toBeInTheDocument();
        });
    });

    test('handles value change correctly', () => {
        const handleChange = vi.fn()
        const mockHandleChange = vi.fn().mockImplementation(handleChange);
        render(
            <CustomSelect
                id={selectName}
                label={selectName}
                menuOptions={menuItems}
                selectName={selectName}
                selectValue={""}
                handleChange={mockHandleChange}
            />
        );

        const selectElement = screen.getByRole('button');
        fireEvent.mouseDown(selectElement); // Open the dropdown

        const menuItemToSelect = screen.getByText(menuItems[1].label);
        fireEvent.click(menuItemToSelect); // Select the second menu item

        expect(mockHandleChange).toHaveBeenCalled(); // Check if the correct value was passed to the handleChange function
    });

    test("calls handleChange with the correct value when the selected option changes", () => {
        const mockHandleChange = vi.fn((event: SelectChangeEvent) => {
            // Extract value from the event and return it
            return event.target.value;
        });

        render(
            <CustomSelect
                id={selectName}
                label={selectName}
                menuOptions={menuItems}
                selectName={selectName}
                selectValue={""}
                handleChange={mockHandleChange}
            />
        );

        const selectElement = screen.getByRole("button");
        fireEvent.mouseDown(selectElement); // Open the dropdown

        const menuItemToSelect = screen.getByText(menuItems[1].label);
        fireEvent.click(menuItemToSelect); // Select the second menu item

        expect(mockHandleChange).toHaveBeenCalledTimes(1); // Check if the handleChange function was called

        // Check if the correct value was passed to the handleChange function by checking the first call's returned value
        expect(mockHandleChange.mock.results[0].value).toBe(menuItems[1].value);
    });

});
