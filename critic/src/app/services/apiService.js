import axios from 'axios';
import { SERVER_URL } from '../../env';

export const ROLES = {
    NONE: "none",
    USER: "user",
    OWNER: "owner",
    ADMIN: "admin"
}

export const apiService = {

    getAppUserByEmail(email){
        return axios.get(`${SERVER_URL}/users/byEmail/${email}`)
                    .then( response => response.data )
    },

    createAppUser(appUser){
        return axios.post(`${SERVER_URL}/users/`, appUser)
    },

    getRestaurants(filter){
        return axios.get(`${SERVER_URL}/restaurants`, {params: filter})
                    .then( response => response.data )
    },
}