import React, {useState} from 'react';
import {useAddress} from './useAddresses';
import {TextField, Button, CircularProgress, makeStyles, Box, Paper} from '@material-ui/core';
import {AddressFields} from "../../types";

const useStyles = makeStyles((theme) => ({
    form: {
        background: 'lightgray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: '50%',
        },
    },
    inputField: {
        '& .MuiInputBase-root': {
            background: theme.palette.background.paper, // Replace this with the desired background color
            color: 'black',
        },
    },
    label: {
        color: "black",
    },
}));

const initialAddressFields: AddressFields = {
    streetAddress: '',
    unitOrAptNum: '',
    municipality: '',
    state: '',
    zipcode: '',
};

const fieldsConfig = {
    streetAddress: {label: 'Street Address', required: true},
    unitOrAptNum: {label: 'Unit or Apt Num', required: false},
    municipality: {label: 'Municipality', required: true},
    state: {label: 'State', required: true},
    zipcode: {label: 'Zip Code', required: false},
};

const GeocodingForm: React.FC = () => {
    const classes = useStyles();
    const [addressFields, setAddressFields] = useState<AddressFields>(initialAddressFields);
    const {data, isLoading, isFetching, isError, error, refetch} = useAddress(addressFields);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAddressFields((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        refetch();
    };
    return (
        <>
            {data && (
                data)}
            <Paper variant="outlined" elevation={10}>
                <Box
                    component="form"
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    {Object.keys(fieldsConfig).map((fieldKey) => {
                        const fieldConfig = fieldsConfig[fieldKey as keyof typeof fieldsConfig];
                        return (
                            <TextField
                                key={fieldKey}
                                name={fieldKey}
                                helperText={fieldConfig.label}
                                label={fieldConfig.label}
                                value={addressFields[fieldKey as keyof AddressFields]}
                                onChange={handleChange}
                                required={fieldConfig.required}
                                className={classes.inputField}
                            />
                        );
                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isFetching}
                        startIcon={
                            isFetching ? (
                                <CircularProgress size={16} thickness={5}/>
                            ) : null
                        }
                    >
                        Geocode Address
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default GeocodingForm;
