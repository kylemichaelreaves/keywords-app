import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home component', () => {
    it('renders without crashing', () => {
        render(<Home />);
    });

    it('renders the correct heading and text content', () => {
        render(<Home />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home');
        expect(screen.getByText('In this React application, I endeavour to do the following:')).toBeInTheDocument();
    });

    it('renders a list with the correct items', () => {
        render(<Home />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(6);
        expect(listItems[0]).toHaveTextContent('Use React Router for routing');
        expect(listItems[1]).toHaveTextContent('Use Material UI for styling');
        expect(listItems[2]).toHaveTextContent('Use React Query for data fetching from API Gateway / Lambda');
        expect(listItems[3]).toHaveTextContent('Use Axios for HTTP requests');
        expect(listItems[4]).toHaveTextContent('Use TypeScript');
        expect(listItems[5]).toHaveTextContent('Use d3 for visualizing the data');
    });
});
