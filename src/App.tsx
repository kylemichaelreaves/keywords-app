import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import KeywordsForm from "./components/Keywords/KeywordsForm";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {createTheme, ThemeProvider} from "@mui/material/styles";


const queryClient = new QueryClient()
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#e74c3c',
        },
    },
});


function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <h1>Keywords App</h1>
                    <p className="read-the-docs">
                        Enter a keyword in the input…
                    </p>
                    <KeywordsForm/>
                </div>
                <ReactQueryDevtools initialIsOpen/>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
