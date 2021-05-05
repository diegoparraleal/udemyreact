import { Button, Grid, Typography } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReviewCard from 'app/components/review.card';

const StyledRestaurantDetailContainer = styled.div`
  button{
      margin: 16px 0;
  }
`;

function RestaurantDetailContainer() {
    const {id} = useParams()
    const [page, setPage] = useState(0)
    const {state, dispatch} = useContext(CriticStore)
    const {restaurantWithDetails, reviewsHaveMoreResults} = state

    useEffect( () => {
        apiService.getRestaurant(id)
                  .then( (restaurantWithDetails) => dispatch(CriticDispatchers.setRestaurant(restaurantWithDetails)))
    }, [id])

    if (restaurantWithDetails === null) return (<>...</>)
    const {restaurant, bestReview, worstReview, reviews} = restaurantWithDetails

    const loadMore = () => {
        setPage(page + 1)
        apiService.getReviews(restaurant.id, page + 1)
                  .then( reviews => dispatch(CriticDispatchers.appendReviews(reviews)))
    }

    return (
        <StyledRestaurantDetailContainer>
            <RestaurantCard restaurant={restaurant} showReviews={false}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {bestReview && 
                        <>
                            <Typography variant="h4">Best Review <ThumbUpIcon/></Typography>
                            <ReviewCard review={bestReview} />
                        </>
                    }
                </Grid>
                <Grid item xs={6}>
                    {worstReview && 
                        <>
                            <Typography variant="h4">Worst Review <ThumbDownIcon/></Typography>
                            <ReviewCard review={worstReview} />
                        </>
                    }
                </Grid>
            </Grid>
            {reviews && reviews.map(review => (
                 <ReviewCard key={review.id} review={review} />
            ))}
            {reviewsHaveMoreResults &&
                <Button variant="outlined" color="secondary" onClick={loadMore}>LOAD MORE</Button>
            }
        </StyledRestaurantDetailContainer>
    );
}

export default RestaurantDetailContainer;