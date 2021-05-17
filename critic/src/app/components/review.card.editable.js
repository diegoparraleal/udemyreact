import { Button, Grid, TextField } from '@material-ui/core';
import { CriticStore } from 'app/store/store';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Rating } from '@material-ui/lab';
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from './error.message';
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
                            <RequiredDate name="date" errors={errors} control={control} defaultValue={review.date} validationMessage="Date is required" />
                        </Grid>
                        <Grid item className="crt-review-editable-rating">
                            <RequiredRating name="rating" errors={errors} control={control} defaultValue={review.rating} validationMessage="Rating is required" />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <RequiredText name="comment" errors={errors} control={control} defaultValue={review.comment} validationMessage="Comment is required" />
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
