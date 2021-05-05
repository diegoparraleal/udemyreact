import { Button, Grid, TextField } from '@material-ui/core';
import { CriticStore } from 'app/store/store';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Rating } from '@material-ui/lab';
import { useForm, Controller } from "react-hook-form";

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
`;

const defaultReview = {
    comment: "",
    date: new Date(),
    rating: 0
}

function ReviewCardEditable({review = defaultReview, onCancel, onAdd}) {
    const { handleSubmit, formState: { errors }, control } = useForm();
    const {state, dispatch} = useContext(CriticStore)
    const {googleUser} = state

    const onSubmit = (data) => {
        console.log(data)
        onAdd(data)
    }

    return (
        <StyledReviewCardEditable>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item container spacing={2}>
                        <Grid item>
                            <img src={googleUser.imageUrl} alt="googleUser" />
                        </Grid>
                        <Grid item>
                            <Controller name="date" control={control} defaultValue={review.date}
                                        rules={{ required: true }}
                                        render={({ field }) => (<KeyboardDatePicker format="yyyy/MM/dd" value={field.value} onChange={field.onChange} />)}
                            />
                            { errors?.date?.type === "required" && (<span>Date is required</span>)}
                        </Grid>
                        <Grid item className="crt-review-editable-rating">
                            <Controller name="rating" control={control} defaultValue={review.rating}
                                        rules={{ min: 0.5 }}
                                        render={({ field }) => (<Rating name="rating" size="large" precision={0.5} {...field} />)}
                            />
                            { errors?.rating?.type === "min" && (<span>Rating is required</span>)}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Controller name="comment" control={control} defaultValue={review.comment}
                                    rules={{ required: true }}
                                    render={({ field }) => (<TextField {...field} fullWidth multiline label="Please tell us your experience" /> )}
                        />
                        { errors?.comment?.type === "required" && (<span>Comment is required</span>)}
                    
                    </Grid>
                    <Grid item className="crt-review-editable-buttons">
                        <Button color="secondary" variant="outlined" onClick={onCancel}>CANCEL</Button>
                        <Button color="secondary" variant="contained" type="submit">ADD</Button>
                    </Grid>
                </Grid>
            </form>
        </StyledReviewCardEditable>
    );
}

export default ReviewCardEditable;
