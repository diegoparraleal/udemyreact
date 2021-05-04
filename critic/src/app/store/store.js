import React from "react";

const { useContext, createContext, useReducer } = require("react")

/* INITIAL STATE */
const initialState = {
    googleUser: null,
    appUser: null    
}

/* STORE CONTEXT*/
const CriticStore = createContext(initialState)
const {Provider} = CriticStore;

/* ACTIONS */
const ACTIONS = {
    LOGIN: "login",
    LOGOUT: "logout",
    SET_APPUSER: "setappuser" 
}

/* DISPATCHERS */ 
const CriticDispatchers = {
    login: (googleUser) => ({type: ACTIONS.LOGIN, payload: googleUser}),
    logout: () => ({type: ACTIONS.LOGOUT}),
    setAppUser: (appUser)  => ({type: ACTIONS.SET_APPUSER, payload: appUser}),
}

/* REDUCERS */
function CriticReducers(state, action) {
    switch(action.type){
        case ACTIONS.LOGIN: return {...state, googleUser: action.payload}
        case ACTIONS.LOGOUT: return {...state, googleUser: null, appUser: null}
        case ACTIONS.SET_APPUSER: return {...state, appUser: action.payload}
        default: throw Error("Unknown action")
    }
}

function CriticStoreProvider({children}){
    const [state, dispatch] = useReducer(CriticReducers, initialState);

    return (<Provider value={{state, dispatch}}>{children}</Provider>)
}

export {CriticStore, CriticStoreProvider, CriticDispatchers}