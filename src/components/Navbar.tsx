import React from 'react';
import {Tabs, Tab, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {NavBarProps} from "../types";



const Navbar: React.FC<NavBarProps> = ({routes}) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const activeRoute = routes.findIndex((route) => route.path === location.pathname);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        navigate(routes[newValue].path);
    };

    return (
        <Box sx={{border: 2, borderColor: 'divider',  bgcolor: 'lightgrey'}}>
            <Tabs
                value={activeRoute !== -1 ? activeRoute : false}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
            >({
                routes.map((route, index) => {
                    return <Tab
                        key={routes[index].path}
                        label={routes[index].label}
                        icon={routes[index].icon}/>
                })
            })
            </Tabs>
        </Box>
    );
};

export default Navbar;
