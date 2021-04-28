import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import styled  from 'styled-components'
import logo from '../../images/logo.png'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PeopleIcon from '@material-ui/icons/People';
import { CRITIC_PALETTE } from 'app/themes/theme';
import AppUser from './app.user';

const StyledAppHeader = styled.div`
    width: 100%;
    height: 64px;
    text-align: left;
    display: flex;

    .crt-logo{
        height: 48px;
        margin-top: 8px;
    }

    ul {
        display: inline-block;
        flex-grow: 1;
        text-align: right;

        li {
            font-size: 20px;
            display: inline-block;            
            margin-left: 32px;
            line-height: 30px;

            button {
                font-size: 16px;
                color: ${CRITIC_PALETTE.light};
            }
        }
    }

    .crt-user{
        width: 240px;
        position: relative;
        text-align: right;
        padding-right: 8px;

        h4 {
            font-size: 14px;
        }
        h5 {
            font-size: 12px;
        }

    }
`

function AppHeader({ user, showLogo, onLogoClick, onLogoff}) {

    const internalClick = () => {
        console.log("SE HIZO CLICK INTERNAMENTE EN APP HEADER")
        onLogoClick()
    }

    return (
        <StyledAppHeader>
            <AppBar position="relative">
                <Toolbar>
                    { showLogo && 
                        <img className='crt-logo' src={logo} alt="logo" onClick={internalClick}></img>
                    }
                    <ul>
                      <li>
                          <IconButton>
                              <RestaurantIcon/>
                              <span>Restaurants</span>
                          </IconButton>
                          <IconButton>
                              <PeopleIcon />
                              <span>Users</span>
                          </IconButton>
                      </li>
                    </ul>
                    { user &&
                        <> 
                            <div className="crt-user">
                                <Typography variant="h4">{user.name}</Typography>
                                <Typography variant="h5">{user.email}</Typography>
                            </div>
                            <AppUser user={user} onLogoff={onLogoff} />
                        </>
                    }
                </Toolbar>
            </AppBar>
            
        </StyledAppHeader>
    );
}
  
export default AppHeader;
  