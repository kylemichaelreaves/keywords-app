import * as React from 'react';
import {useAddress} from '../../hooks/useAddresses';
import {TextField, makeStyles, Box} from '@material-ui/core';
import {AddressFields} from "../../types";
import AddressesList from "./AddressesList";
import {isAddressFormValid} from "./isAddressFormValid";
import LoadingButton from "@mui/lab/LoadingButton";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {FormControl} from "@mui/material";

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
            background: theme.palette.background.paper,
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

export const fieldsConfig = {
    streetAddress: {label: 'Street Address', required: true},
    unitOrAptNum: {label: 'Unit or Apt Num', required: false},
    municipality: {label: 'Municipality', required: true},
    state: {label: 'State', required: true},
    zipcode: {label: 'Zip Code', required: false},
};

const AddressGeocoder: React.FC = () => {
    const classes = useStyles();
    const [addressFields, setAddressFields] = React.useState<AddressFields>(initialAddressFields);
    const {data, isLoading, isFetching, isError, error, refetch} = useAddress(addressFields);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAddressFields((prev) => ({...prev, [name]: value}));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handleSubmit called!')
        console.log('validForm', validForm)
        refetch({
            throwOnError: true
        });
    };

    const validForm = isAddressFormValid(fieldsConfig, addressFields, isFetching);

    return (
        <>
            {data && <AddressesList data={data.message}/>}
            <Box component="form" className={classes.form} onSubmit={handleSubmit}>
                <FormControl>
                    {Object.keys(fieldsConfig).map((fieldKey) => {
                        const fieldConfig =
                            fieldsConfig[fieldKey as keyof typeof fieldsConfig];
                        return (
                            <TextField
                                id={fieldKey}
                                key={fieldKey}
                                name={fieldKey}
                                placeholder={fieldConfig.label}
                                InputLabelProps={{
                                    htmlFor: fieldKey,
                                    id: `${fieldKey}-label`,
                                }}
                                label={fieldConfig.label}
                                value={addressFields[fieldKey as keyof AddressFields]}
                                onChange={handleChange}
                                required={fieldConfig.required}
                                className={classes.inputField}
                            />
                        );
                    })}
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!validForm}
                        loading={isFetching}
                        startIcon={<LocationOnIcon/>}
                    >
                        Geocode Address
                    </LoadingButton>
                </FormControl>
            </Box>
        </>
    );
};

export default AddressGeocoder;
