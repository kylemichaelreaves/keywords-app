import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Paper} from "@material-ui/core";

interface SelectOption {
    value: string | number;
    label: string;
}

interface CustomSelectProps {
    id: string
    selectName: string;
    label: string;
    selectValue: string;
    menuOptions: SelectOption[];
    handleChange: (event: SelectChangeEvent) => void;
    fullWidth?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       id,
                                                       selectName,
                                                       label,
                                                       selectValue,
                                                       menuOptions,
                                                       fullWidth,
                                                       handleChange,
                                                   }) => {
    return (
        <Box>
            <FormControl sx={{m: 2, minWidth: 150}} fullWidth={false}>
                <InputLabel id={`${id}-label`}>{label}</InputLabel>
                <Select
                    id={id}
                    name={selectName}
                    labelId={`${id}-label`}
                    value={selectValue}
                    label={label}
                    onChange={handleChange}
                    autoWidth
                >
                    {menuOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CustomSelect;
