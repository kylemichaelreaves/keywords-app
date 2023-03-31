import React from 'react';
import {AddressesListProps} from "../../types";
import {List, ListItem, ListItemText, Paper} from "@material-ui/core";

export default function AddressesList({data}: AddressesListProps) {
    return (
        <Paper elevation={3}>
            <List>
                {data.map((address, index) => (
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
                ))}
            </List>
        </Paper>

    );
}







