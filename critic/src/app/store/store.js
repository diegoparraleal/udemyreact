import React from "react";

const { useContext, createContext, useReducer } = require("react")

/* CONSTS */
const RESTAURANTS_PER_PAGE = 5
const REVIEWS_PER_PAGE = 5

/* INITIAL STATE */
const initialState = {
    googleUser: null,
    appUser: null,
    restaurants: [],
    restaurantsHaveMoreResults: false,
    restaurantWithDetails: null,
    reviewsHaveMoreResults: false,
}

/* STORE CONTEXT*/
const CriticStore = createContext(initialState)
const {Provider} = CriticStore;

/* ACTIONS */
const ACTIONS = {
    LOGIN: "login",
    LOGOUT: "logout",
    SET_APPUSER: "setappuser" ,
    SET_RESTAURANTS: "setrestaurants",
    APPEND_RESTAURANTS: "appendrestaurants",
    SET_RESTAURANT: "setrestaurant",
    APPEND_REVIEWS: "appendreviews",
}

/* DISPATCHERS */ 
const CriticDispatchers = {
    login: (googleUser) => ({type: ACTIONS.LOGIN, payload: googleUser}),
    logout: () => ({type: ACTIONS.LOGOUT}),
    setAppUser: (appUser)  => ({type: ACTIONS.SET_APPUSER, payload: appUser}),
    setRestaurants: (restaurants)  => ({type: ACTIONS.SET_RESTAURANTS, payload: restaurants}),
    appendRestaurants: (restaurants)  => ({type: ACTIONS.APPEND_RESTAURANTS, payload: restaurants}),
    setRestaurant: (restaurantWithDetails)  => ({type: ACTIONS.SET_RESTAURANT, payload: restaurantWithDetails}),
    appendReviews: (reviews)  => ({type: ACTIONS.APPEND_REVIEWS, payload: reviews}),
}

/* REDUCERS */
function CriticReducers(state, action) {
    switch(action.type){
        case ACTIONS.LOGIN: return {...state, googleUser: action.payload}
        case ACTIONS.LOGOUT: return {...state, googleUser: null, appUser: null}
        case ACTIONS.SET_APPUSER: return {...state, appUser: action.payload}
        case ACTIONS.SET_RESTAURANTS: return {...state, restaurants: action.payload, restaurantsHaveMoreResults: action.payload.length >= RESTAURANTS_PER_PAGE}
        case ACTIONS.APPEND_RESTAURANTS: return {...state, restaurants: [...state.restaurants, ...action.payload], restaurantsHaveMoreResults: action.payload.length >= RESTAURANTS_PER_PAGE}
        case ACTIONS.SET_RESTAURANT: return {...state, restaurantWithDetails: action.payload, reviewsHaveMoreResults: action.payload.reviews.length >= REVIEWS_PER_PAGE}
        case ACTIONS.APPEND_REVIEWS: return {...state, 
                                                restaurantWithDetails: {...state.restaurantWithDetails, 
                                                                           reviews: [...state.restaurantWithDetails.reviews, ...action.payload]
                                                                        },
                                                reviewsHaveMoreResults: action.payload.length >= REVIEWS_PER_PAGE
                                            }
        default: throw Error("Unknown action")
    }
}

function CriticStoreProvider({children}){
    const [state, dispatch] = useReducer(CriticReducers, initialState);

    return (<Provider value={{state, dispatch}}>{children}</Provider>)
}

export {CriticStore, CriticStoreProvider, CriticDispatchers}