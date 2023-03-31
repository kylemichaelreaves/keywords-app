import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useNavigate} from 'react-router-dom';
import Navbar from "../../components/Navbar";
import {NavBarProps} from "../../types";
import {routes as defaultRoutes} from '../../App';
import {vi} from "vitest";

describe('Navbar', () => {
    const routes: NavBarProps['routes'] = defaultRoutes

    beforeEach(() => {
        vi.mock('react-router-dom', async () => {
            return {
                ...vi.importActual('react-router-dom'),
                useNavigate: vi.fn()
            }
        });
    });

    afterEach(() => {
        vi.clearAllMocks()
    })

    // it('renders a Box component', () => {
    //     render(<Navbar routes={routes}/>);
    //     expect(screen.getByRole('muibox')).toBeInTheDocument();
    // });

    it('renders a Tabs component', () => {
        render(<Navbar routes={routes}/>);
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders the correct number of Tab components', () => {
        render(<Navbar routes={routes}/>);
        expect(screen.getAllByRole('tab')).toHaveLength(routes.length);
    });

    // test('Navbar > calls useNavigate when a tab is clicked', () => {
    //     const navigate = vi.fn(useNavigate());
    //     render(<Navbar routes={routes}/>);
    //     userEvent.click(screen.getAllByRole('tab')[0]);
    //     expect(navigate).toHaveBeenCalledWith('spy');
    // });
});
