import { Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const StyledReviewCard = styled.div`
  text-align: left;
  padding: 16px;
  margin: 16px 0;

  .crt-review-image-container{
    height: 64px;
    overflow: hidden;

    .crt-review-image{
        width: 64px;
    }
  }

  .crt-review-date{
      color: #dddddd;
      font-style: italic;  
  }

  .crt-review-rating{
      text-align: right;
      flex-grow: 1;
  }

  p { 
    color: #888888;
  }
`;
function ReviewCard({review}) {

    const formatDate = (date) => {
        if (date === null) return ""
        return new Date(date).toLocaleDateString("en-US")
    }

    return (
        <StyledReviewCard className="crt-border">
            <Grid container direction="column" spacing={2}>
               <Grid item container spacing={2}>
                   <Grid item className="crt-review-image-container">
                        <img className="crt-review-image" src={review.userImage} alt="userImage" />
                   </Grid>
                   <Grid item>
                        <Typography variant="body2" className="crt-review-date">{formatDate(review.date)}</Typography>
                   </Grid>
                   <Grid item className="crt-review-rating">
                        <Rating name="reviewRating" size="large" value={review.rating} />
                   </Grid>
                </Grid> 
               <Grid item container>
                    <Typography variant="body2">{review.comment}</Typography>
               </Grid> 
               {review.reply && 
                    <Grid item container spacing={2}>
                        <Grid item className="crt-review-image-container">
                            <img className="crt-review-image" src={review.reply.userImage} alt="userImage" />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" className="crt-review-date">{formatDate(review.reply.date)}</Typography>
                            <Typography variant="body2">{review.reply.comment}</Typography>
                        </Grid>
                    </Grid> 
               }
               </Grid>
        </StyledReviewCard>
    );
}

export default ReviewCard;