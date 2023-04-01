import * as React from 'react';
import {AddressesListProps} from "../../types";
import {List, ListItem, ListItemText, Paper} from "@material-ui/core";
import {FormControl} from "@mui/material";

export default function AddressesList({data}: AddressesListProps) {
    return (
        <Paper elevation={3}>
            <List>
                {data.map((address, index) => (
                    <FormControl key={index}>
                        <ListItem key={index}>
                            <ListItemText
                                primary={address.display_name}
                                secondary={
                                    <>
                                        {Object.values(address.address).map((value) => value).join(', ')}
                                        <br/>
                                        {`${address.boundingbox}`}
                                        <br/>
                                        {`${address.lat}, ${address.lon}`}
                                    </>
                                }
                            />
                        </ListItem>
                    </FormControl>
                ))}
            </List>
        </Paper>

    );
}
