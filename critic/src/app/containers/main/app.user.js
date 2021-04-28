import { Avatar, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import styled  from 'styled-components'

const StyledAppUser = styled.div`
  
`

function AppUser({ user, onLogoff}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        onLogoff();
    }


    return (
        <StyledAppUser>
            <Avatar src={user.imageUrl} alt="user" onClick={handleClick}></Avatar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </StyledAppUser>
    );
}
  
export default AppUser;
  