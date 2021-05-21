import { Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ReviewCard from 'app/components/review.card';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
const StyledReviewsContainer = styled.div`
  h4{
    margin: 32px 0;
  }
  h5{
      margin-top: 32px;
  }
`;

function ReviewsContainer() {
    const [fetchFlag, setFetchFlag] = useState(0)
    const {state, dispatch} = useContext(CriticStore)
    const {appUser, pendingReviews} = state

    useEffect( ()=> {
        if (appUser === null) return
        apiService.getPendingReviews(appUser.id)
                  .then(pendingReviews => dispatch(CriticDispatchers.setPendingReviews(pendingReviews)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFlag])

    const postReply = (restaurantId, reviewId, reply) => {
        reply.user = appUser.id;
        apiService.postReply(restaurantId, reviewId, reply)
                  .then( () => setFetchFlag(fetchFlag + 1))
    }

    return (
        <StyledReviewsContainer>
            <Typography variant="h4" align="left" color="primary" >Pending reviews</Typography>
            {pendingReviews.length > 0 &&
                <div>
                    {pendingReviews.map( reviewWithRestaurant => (
                        <div key={reviewWithRestaurant.review.id}>
                            <Typography variant="h5" align="left" color="primary">{reviewWithRestaurant.restaurant.name}</Typography>
                            <ReviewCard review={reviewWithRestaurant.review} canReply={true} 
                                        onReply={(reply) => postReply(reviewWithRestaurant.restaurant.id, reviewWithRestaurant.review.id, reply) } />
                        </div>
                    ))}
                </div>
            }
            {pendingReviews.length === 0 && 
                <Typography component="h3" className="crt-pending-reviews-noreviews" color="primary">
                    There are no pending reviews. You are up to date! <ThumbUpAltOutlinedIcon/>
                </Typography>
            }        
        </StyledReviewsContainer>
    );
}


export default ReviewsContainer;