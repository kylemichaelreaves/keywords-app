import React from 'react';
import {Tabs, Tab, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

interface Props {
    routes: {
        path: string;
        label: string;
        icon: any;
    }[];
}

const Navbar: React.FC<Props> = ({routes}) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const activeRoute = routes.findIndex((route) => route.path === location.pathname);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        navigate(routes[newValue].path);
    };

    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider',  bgcolor: 'background.paper',}}>
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
