import { Button, Grid, TextField } from '@material-ui/core';
import { CriticStore } from 'app/store/store';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Rating } from '@material-ui/lab';

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

function ReviewCardEditable({review = defaultReview, onCancel}) {
    const [comment, setComment] = useState("")
    const {state, dispatch} = useContext(CriticStore)
    const {googleUser} = state

    const onAdd = () => {
        console.log(comment)
    }

    return (
        <StyledReviewCardEditable>
            <Grid container direction="column" spacing={2}>
                <Grid item container spacing={2}>
                    <Grid item>
                        <img src={googleUser.imageUrl} alt="googleUser" />
                    </Grid>
                    <Grid item>
                        <KeyboardDatePicker format="yyyy/MM/dd" />
                    </Grid>
                    <Grid item className="crt-review-editable-rating">
                        <Rating name="rating" size="large" precision={0.5} />
                    </Grid>
                </Grid>
                <Grid item>
                   <TextField value={comment} onChange={(event) => setComment(event.target.value)} fullWidth multiline label="Please tell us your experience" /> 
                </Grid>
                <Grid item className="crt-review-editable-buttons">
                    <Button color="secondary" variant="outlined" onClick={onCancel}>CANCEL</Button>
                    <Button color="secondary" variant="contained" onClick={onAdd}>ADD</Button>
                </Grid>
            </Grid>
        </StyledReviewCardEditable>
    );
}

export default ReviewCardEditable;