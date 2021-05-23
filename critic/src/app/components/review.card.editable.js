import { Button, Grid } from '@material-ui/core';
import { CriticStore } from 'app/store/store';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import RequiredDate from './required.date';
import RequiredRating from './required.rating';
import RequiredText from './required.text';

const StyledReviewCardEditable = styled.div`
  .crt-review-editable-rating{
      text-align: right;
      flex-grow: 1;
  }
  .crt-review-editable-buttons{
      text-align: right;

      button{
          margin-left: 16px;
      }
  }
  .crt-review-image-container{
    height: 64px;
    overflow: hidden;

    img{
        width: 64px !important;
    }
  }
`;

const defaultReview = {
    comment: "",
    date: new Date(),
    rating: 0
}

function ReviewCardEditable({review = defaultReview, editing = false, 
                             onCancel = () => {}, onAdd = (_) => {}, onEdit = (_) => {}}) {
    const { handleSubmit, formState: { errors }, control } = useForm();
    const {state} = useContext(CriticStore)
    const {googleUser} = state

    const onSubmit = (data) => {
        console.log(data)
        if (!editing) onAdd(data)
        else {
            let newReply = review.reply != null ? {...review.reply, comment: data.replyComment} : null
            let newReview = {date: data.date, rating: data.rating, comment: data.comment, reply: newReply}
            onEdit({...review, ...newReview})
        }
    }

    return (
        <StyledReviewCardEditable>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item container spacing={2}>
                        <Grid item className="crt-review-image-container">
                            <img src={editing ? review.userImage : googleUser.imageUrl} alt="googleUser" />
                        </Grid>
                        <Grid item>
                            <RequiredDate name="date" errors={errors} control={control} defaultValue={review.date} validationMessage="Date is required" />
                        </Grid>
                        <Grid item className="crt-review-editable-rating">
                            <RequiredRating name="rating" errors={errors} control={control} defaultValue={review.rating} validationMessage="Rating is required" />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <RequiredText name="comment" errors={errors} control={control} defaultValue={review.comment} validationMessage="Comment is required" maxLength={4000} />
                    </Grid>
                    {review.reply && 
                        <Grid item container spacing={2}>  
                            <Grid item className="crt-review-image-container" xs={2}>
                                <img src={review.reply.userImage} alt="replyUser" />
                            </Grid>
                            <Grid item xs={10}>
                                <RequiredText name="replyComment" errors={errors} control={control} defaultValue={review.reply.comment} 
                                              validationMessage="Reply is required" maxLength={4000}/>
                            </Grid>
                        </Grid>
                    }
                    <Grid item className="crt-review-editable-buttons">
                        <Button color="secondary" variant="outlined" onClick={onCancel}>CANCEL</Button>
                        {editing && <Button color="secondary" variant="contained" type="submit">EDIT</Button>}
                        {!editing && <Button color="secondary" variant="contained" type="submit">ADD</Button>}
                    </Grid>
                </Grid>
            </form>
        </StyledReviewCardEditable>
    );
}

export default ReviewCardEditable;
