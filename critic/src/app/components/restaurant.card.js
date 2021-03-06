import { Button, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const StyledRestaurantCard = styled.div`
  min-height: 240px;
  padding: 16px;
  margin: 16px 0;
  text-align: left; 

  img {
      width: 100%;
  }

  .crt-restaurant-card-buttons{
    text-align: right;
    padding-right: 16px;
    margin: 16px 0;

    button{
        margin-left: 16px;
    }
  }
`;


function RestaurantCard({restaurant, showReviews = true, showEdit = false, showDelete = false, 
                         onReviewClick = (_) => {}, onEditClick = (_) => {}, onDeleteClick = (_) => {} }) {
    return (
        <StyledRestaurantCard className="crt-border">
            <Grid container spacing={4}>
                <Grid item xs={4}><img src={restaurant.image} alt="Restaurant"/></Grid>
                <Grid item xs={8} container direction="column" spacing={2}>
                    <Grid item container>
                        <Grid item xs={9}>
                            <Typography variant="h4">{restaurant.name}</Typography>
                        </Grid>
                        <Grid item xs={3}><Rating name="restaurantRating" readOnly size="large" value={restaurant.rating}></Rating></Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{restaurant.city} - {restaurant.price}</Typography>
                        <Typography variant="body2">{restaurant.address}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{restaurant.description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <div className="crt-restaurant-card-buttons">
                {showEdit && 
                    <Button variant="outlined" onClick={() => onEditClick(restaurant)}>EDIT</Button>
                }
                {showDelete && 
                    <Button variant="outlined" onClick={() => onDeleteClick(restaurant)}>DELETE</Button>
                }
                {showReviews && 
                    <Button variant="outlined" onClick={() => onReviewClick(restaurant.id)}>REVIEWS</Button>
                }
            </div>
        </StyledRestaurantCard>
    );
}

export default RestaurantCard;