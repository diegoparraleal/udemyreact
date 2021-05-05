import { Avatar, Menu, MenuItem } from '@material-ui/core';
import useCriticGoogleLogin from 'app/hooks/useCriticGoogleLogin';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import { GOOGLE_CLIENT_ID } from 'env';
import React, { useContext } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import styled  from 'styled-components'

const StyledAppUser = styled.div`
  
`

function AppUser() {
    let history = useHistory();
    const {signOut} = useCriticGoogleLogin({
        onLogout: () => history.push("/")
    })
    const {state} = useContext(CriticStore)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {googleUser} = state
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        signOut();
    }

    return (
        <StyledAppUser>
            <Avatar src={googleUser.imageUrl} alt="user" onClick={handleClick}></Avatar>
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
  