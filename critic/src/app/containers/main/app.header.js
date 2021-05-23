import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import styled  from 'styled-components'
import logo from '../../images/logo.png'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PeopleIcon from '@material-ui/icons/People';
import { CRITIC_PALETTE } from 'app/themes/theme';
import AppUser from './app.user';
import { CriticStore } from 'app/store/store';
import { useHistory } from 'react-router-dom';

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

function AppHeader({ showLogo, onLogoClick}) {
    const {state} = useContext(CriticStore)
    const {appUser, googleUser} = state
    const history = useHistory()

    const showRestaurants = appUser?.role === "owner" || appUser?.role === "admin"
    const showPendingReviews = appUser?.role === "owner"
    const showUsers = appUser?.role === "admin"

    const internalClick = () => {
        console.log("SE HIZO CLICK INTERNAMENTE EN APP HEADER")
        onLogoClick()
    }

    const goToRestaurants = () => history.push("/restaurants")
    const goToReviews = () => history.push("/reviews")
    const goToUsers = () => history.push("/users")
    
    return (
        <StyledAppHeader>
            <AppBar position="relative">
                <Toolbar>
                    { showLogo && 
                        <img className='crt-logo' src={logo} alt="logo" onClick={internalClick}></img>
                    }
                    <ul>
                      <li>
                          {showRestaurants &&
                            <IconButton onClick={goToRestaurants}>
                                <RestaurantIcon/>
                                <span>Restaurants</span>
                            </IconButton>
                          }
                          {showPendingReviews &&
                            <IconButton onClick={goToReviews}>
                                <RateReviewIcon/>
                                <span>Pending Reviews</span>
                            </IconButton>
                          }
                          {showUsers &&
                            <IconButton onClick={goToUsers}>
                                <PeopleIcon />
                                <span>Users</span>
                            </IconButton>
                          }
                      </li>
                    </ul>
                    { googleUser &&
                        <> 
                            <div className="crt-user">
                                <Typography variant="h4">{googleUser.name}</Typography>
                                <Typography variant="h5">{googleUser.email}</Typography>
                            </div>
                            <AppUser />
                        </>
                    }
                </Toolbar>
            </AppBar>
            
        </StyledAppHeader>
    );
}
  
export default AppHeader;
  