import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  .crt-error{
      color: red;
      font-size: 12px;
  }
`;

function ErrorMessage({errors, name, type, children}) {
    return (
        <StyledErrorMessage>
            { errors?.[name]?.type === type && (<Typography variant="subtitle2" className="crt-error">{children}</Typography>)}
        </StyledErrorMessage>
    );
}


export default ErrorMessage;