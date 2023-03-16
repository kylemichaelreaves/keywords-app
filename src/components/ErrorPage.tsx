import { useRouteError } from 'react-router-dom';

interface RouteError extends Error {
    statusText?: string;
    error?: string;
}

function isRouteError(obj: unknown): obj is RouteError {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        ('statusText' in obj || 'message' in obj)
    );
}

export default function ErrorPage() {
    const unknownError = useRouteError();
    const error: RouteError = isRouteError(unknownError)
        ? (unknownError as RouteError)
        : (() => {
            const defaultError = new Error();
            defaultError.message = 'An unknown error occurred.';
            return defaultError;
        })();

    console.error(error);

    return (
        <div id="error-page">
            <h1>Error</h1>
            <i>{error.statusText || error.message}</i>
        </div>
    );
}