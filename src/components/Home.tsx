import * as React from 'react';
import CustomSelect from "./shared/CustomSelect";
import {SelectChangeEvent} from "@mui/material/Select";
import {Paper} from "@material-ui/core";

export default function Home() {
    const [selectValue, setSelectValue] = React.useState<string>("");

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    }

    return (
        <>
            <Paper>
                <CustomSelect
                    id="test-select"
                    label="Test Select"
                    menuOptions={[
                        {value: "option1", label: "Option 1"},
                        {value: "option2", label: "Option 2"},
                        {value: "option3", label: "Option 3"},
                    ]}
                    selectName="Test Select"
                    selectValue={selectValue}
                    handleChange={handleSelectChange}
                />
            </Paper>
            <h1>
                Home
            </h1>
            <p>In this React application, I endeavour to do the following:</p>
            <ul>
                <li>Use React Router for routing</li>
                <li>Use Material UI for styling</li>
                <li>Use React Query for data fetching from API Gateway / Lambda</li>
                <li>Use Axios for HTTP requests</li>
                <li>Use TypeScript</li>
                <li>Use d3 for visualizing the data</li>
            </ul>
        </>
    )
}