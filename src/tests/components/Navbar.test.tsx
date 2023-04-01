import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    MemoryRouter,
    MemoryRouterProps,
    RouteProps,
    useNavigate,
    useLocation, Routes
} from 'react-router-dom';
import Navbar from "../../components/Navbar";
import {NavBarProps} from "../../types";
import {routes as defaultRoutes} from '../../App';
import {vi} from "vitest";

const mockUseNavigate = vi.fn().mockImplementation(() => useNavigate());

const mockRoutes: NavBarProps['routes'] = [
    {path: '/', label: 'Home', icon: null},
    {path: '/about', label: 'About', icon: null},
    {path: '/contact', label: 'Contact', icon: null},
];

const renderWithRouter = (ui: React.ReactElement, {route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
        user: userEvent.setup(),
        ...render(ui, {wrapper: MemoryRouter}),
    }
}

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};


vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        Route: actual.Route as React.ComponentType<RouteProps>,
        MemoryRouter: actual.MemoryRouter as React.ComponentType<MemoryRouterProps>,
        useNavigate: vi.fn(() => actual.useNavigate()),
    };
});

describe('Navbar', () => {
    const routes: NavBarProps['routes'] = defaultRoutes

    // beforeEach(() => {
    //     mockUseNavigate.mockReset()
    // })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('renders a Tabs component', () => {
        renderWithRouter(<Navbar routes={mockRoutes}/>);
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders the correct number of Tab components', () => {
        renderWithRouter(<Navbar routes={mockRoutes}/>);
        expect(screen.getAllByRole('tab')).toHaveLength(mockRoutes.length);
    });

    test('renders tabs and navigates correctly', async () => {
        renderWithRouter(
            <>
                <Navbar routes={mockRoutes}/>
                <LocationDisplay/>
            </>,
        );

        // Check if tabs are rendered
        mockRoutes.forEach((route) => {
            const elements = screen.getAllByText((content, node) => content.startsWith(route.label));
            expect(elements.length).toBeGreaterThan(0);
        });

        // Click on the 'About' tab and check if navigation occurs
        const aboutTab = screen.getByText((content, node) => content.startsWith('About'));
        await userEvent.click(aboutTab);

        // Wait for navigation to complete and check the content
        const aboutContent = await screen.findByText('About');
        expect(aboutContent).toBeInTheDocument();
    });

    test('sets the correct active tab', async () => {
        renderWithRouter(
            <>
                <Navbar routes={mockRoutes}/>
                <LocationDisplay/>
            </>
            );

        const aboutTab = screen.getByText((content, node) => content.startsWith('About'));
        await userEvent.click(aboutTab);


        // Click on the 'About' tab
        const locationDisplay = screen.getByTestId('location-display');
        expect(locationDisplay).toHaveTextContent('/about');
    });
});
