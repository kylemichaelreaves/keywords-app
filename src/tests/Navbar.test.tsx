import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import {NavBarProps} from "../types";
import {routes as defaultRoutes} from '../App';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Navbar', () => {
    const routes: NavBarProps['routes'] = defaultRoutes

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    });

    it('renders a Box component', () => {
        render(<Navbar routes={routes}/>);
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('renders a Tabs component', () => {
        render(<Navbar routes={routes}/>);
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders the correct number of Tab components', () => {
        render(<Navbar routes={routes}/>);
        expect(screen.getAllByRole('tab')).toHaveLength(routes.length);
    });

    it('calls useNavigate when a tab is clicked', () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        render(<Navbar routes={routes}/>);
        userEvent.click(screen.getAllByRole('tab')[1]);
        expect(navigate).toHaveBeenCalledWith('/about');
    });
});
