import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
const StyledUserCard = styled.div`
  padding: 16px;
  margin: 8px 0;

  .crt-user-image-container{
    height: 64px;
    overflow: hidden;

    img{
        width: 64px;
    }
  }

  .crt-user-card-links{
      text-align: right;
      button{
          margin-left: 8px;
      }
  }
`;

function UserCard({user, onEdit, onDelete}) {
    return (
        <StyledUserCard className="crt-border">
            <Grid container spacing={2}>
                <Grid item container xs={2} spacing={1} direction="column">
                    <Grid item>
                        <span className="crt-user-image-container">
                            <img src={user.image} alt="userImage"/>
                        </span>
                    </Grid> 
                    <Grid item>
                            <Typography variant="subtitle2" color="primary">{user.role}</Typography>
                    </Grid> 
                </Grid>
                <Grid item>
                    <Typography color="primary" variant="h5" align="left">{user.name}</Typography>
                    <Typography variant="subtitle1" align="left" >{user.email}</Typography>
                </Grid>
            </Grid>
            <div className="crt-user-card-links">
                <Button variant="outlined" color="secondary" onClick={() => onEdit(user)} >Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(user)} >Delete</Button>
            </div>
        </StyledUserCard>
    );
}

export default UserCard