import { Button, Grid, Typography } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import { apiService, ROLES } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReviewCard from 'app/components/review.card';
import ReviewCardEditable from 'app/components/review.card.editable';
import ConfirmDialog from 'app/components/confirm.dialog';

const StyledRestaurantDetailContainer = styled.div`
  button{
      margin: 16px 0;
  }
`;

function RestaurantDetailContainer() {
    const {id} = useParams()
    const [page, setPage] = useState(0)
    const [fetchFlag, setFetchFlag] = useState(0)
    const {state, dispatch} = useContext(CriticStore)
    const {restaurantWithDetails, reviewsHaveMoreResults, appUser} = state
    const isOwner = appUser?.role === ROLES.OWNER
    const isAdmin = appUser?.role === ROLES.ADMIN

    useEffect( () => {
        apiService.getRestaurant(id)
                  .then( (restaurantWithDetails) => dispatch(CriticDispatchers.setRestaurant(restaurantWithDetails)))
    }, [id, fetchFlag, dispatch])

     // Add review logic
     const [addingReview, setAddingReview] = useState(0)
     const addReview = () => setAddingReview(true)
     const cancelReview = () => setAddingReview(false)
     const performAddReview = (newReview) => {
         setAddingReview(false)
         newReview.user = appUser.id
         apiService.createReview(restaurant.id, newReview)
                   .then( () => setFetchFlag(fetchFlag + 1))
     }
 
     // Post reply logic
     const postReply = (restaurantId, reviewId, reply) => {
         reply.user = appUser.id;
         apiService.postReply(restaurantId, reviewId, reply)
                   .then( () => setFetchFlag(fetchFlag + 1))
     }
 
     // Edit review logic
     const [editingReview, setEditingReview] = useState(null)
     const editReview = (review) => setEditingReview(review)
     const cancelEditingReview = () => setEditingReview(null)
     const performEditReview = (review) => {
         apiService.editReview(id, review.id, review)
                   .then( () => {
                         setEditingReview(null)
                         setFetchFlag(fetchFlag + 1)
                   })
         setEditingReview(null)
     }
 
     // Delete review logic
     const [deletingReview, setDeletingReview] = useState(null)
     const deleteReview = (review) => setDeletingReview(review)
     const cancelDeletingReview = () => setDeletingReview(null)
     const performDeleteReview = () => {
         apiService.deleteReview(id, deletingReview.id)
                   .then( () => {
                         setDeletingReview(null)
                         setFetchFlag(fetchFlag + 1)
                   })
     }

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
            {addingReview 
                ? <ReviewCardEditable onCancel={cancelReview} onAdd={performAddReview}/>
                : <Button variant="outlined" color="secondary" onClick={addReview}>ADD A REVIEW</Button>
            }
            {deletingReview && 
                <ConfirmDialog title="Delete Review" message="Are you sure you want to delete this review?" 
                               onCancel={cancelDeletingReview} onConfirm={() => performDeleteReview()} />
            }
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
                editingReview !== null && editingReview.id === review.id
                ?   <ReviewCardEditable key={review.id} review={review} editing={true} onCancel={cancelEditingReview} onEdit={performEditReview}/>
                :   <ReviewCard key={review.id} review={review} canReply={isOwner} canEdit={isAdmin} canDelete={isAdmin}
                                onReply={(reply) => postReply(restaurant.id, review.id, reply) } 
                                onEdit={editReview}
                                onDelete={deleteReview}
                    />
            ))}
            {reviewsHaveMoreResults &&
                <Button variant="outlined" color="secondary" onClick={loadMore}>LOAD MORE</Button>
            }
        </StyledRestaurantDetailContainer>
    );
}

export default RestaurantDetailContainer;