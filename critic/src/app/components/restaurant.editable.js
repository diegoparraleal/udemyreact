import styled from 'styled-components';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import RequiredText from './required.text';
import RequiredGoogleAutocomplete from './required.google.autocomplete';
import RequiredNumber from './requried.number';

const StyledRestaurantEditableDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
        max-width: 700px;
  }
`;

const newRestaurant = {
    name: "",
    description: "",
    city: "",
    address: "",
    price: 0,
    image: ""
}

function RestaurantEditable({restaurant = newRestaurant, title, confirmButton, onCancel, onConfirm}) {
    const {handleSubmit, formState: { errors }, control} = useForm()
    const confirm = ({name, description, city, address, price, image}) => onConfirm({...restaurant, name, description, city, address, price, image})
    const imageUrlRegex = /^(https?:\/\/?.*)|(data:image\/jpeg.*)/i;

    return (
        <StyledRestaurantEditableDialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title" className="crt-dialog">
            <form onSubmit={handleSubmit(confirm)}>
                <DialogTitle>
                    <Typography color="primary" className="crt-title">{title}</Typography>
                </DialogTitle>
                <DialogContent className="crt-dialog-content">
                    <RequiredText control={control} errors={errors} name="name" label="Name" defaultValue={restaurant.name} maxLength={200} validationMessage="Name is required" />
                    <RequiredText control={control} errors={errors} name="description" label="Description" defaultValue={restaurant.description} maxLength={4000} 
                                  validationMessage="Description is required"/>
                    <RequiredGoogleAutocomplete control={control} errors={errors} name="city" label="City" defaultValue={restaurant.city} maxLength={100}
                                                options={{types: ['(cities)']}} validationMessage="City is required"/>
                    <RequiredGoogleAutocomplete control={control} errors={errors} name="address" label="Address" defaultValue={restaurant.address} maxLength={4000} 
                                                options={{}} validationMessage="Address is required" />
                    <RequiredNumber control={control} errors={errors} name="price" label="Average Price" defaultValue={restaurant.price} adornment="$" 
                                    validationMessage="Price is required"/>
                    <RequiredText control={control} errors={errors} name="image" label="Image url" defaultValue={restaurant.image} maxLength={4000} 
                                  pattern={imageUrlRegex} patternMessage="Please enter a valid url address" validationMessage="Url is required"/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" color="secondary">
                        {confirmButton}
                    </Button>
                </DialogActions>
            </form>
        </StyledRestaurantEditableDialog>
    );
}

export default RestaurantEditable;