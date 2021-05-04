import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import { GOOGLE_CLIENT_ID } from 'env';
import React, { useContext } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import styled  from 'styled-components'

const StyledAppUser = styled.div`
  
`

function AppUser() {
    const {state, dispatch} = useContext(CriticStore)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {googleUser} = state
    let history = useHistory();
    
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

    const onLogoutSuccess = (res) => {
        console.log(res);
        dispatch(CriticDispatchers.logout())
        history.push("/")
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signOut } = useGoogleLogout({
        onFailure,
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess
    })

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
  