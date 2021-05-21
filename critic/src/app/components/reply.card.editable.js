import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import RequiredText from './required.text';

const StyledReplyCardEditable = styled.div`
  .crt-review-reply-editable{
    .crt-review-reply-comment {
      display: block;
    }
  }
  .crt-review-card-buttons{
    text-align: right;
    margin-top: 16px;

    button{
      margin-left: 16px;
    }
  }
`;

function ReplyCardEditable({onReply}) {
    const { handleSubmit, formState: { errors }, control } = useForm();
    const reply = {
      comment: ""
    }
    const postReply = ({comment}) => onReply({...reply, comment})
    
    return (
        <StyledReplyCardEditable>
            <form onSubmit={handleSubmit(postReply)}>
                <RequiredText name="comment" errors={errors} control={control} defaultValue={reply.comment} 
                              label="Please add a reply" validationMessage="The reply is required" maxLength={4000} />
                <div className="crt-review-card-buttons" >
                    <Button variant="outlined" color="secondary" type="submit">Reply</Button>
                </div>
            </form>
        </StyledReplyCardEditable>
    );
}

export default ReplyCardEditable;