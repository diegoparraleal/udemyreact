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

    getUsers(name){
        const params = {
            name: name || null,
        }
       return  axios.get(`${SERVER_URL}/users`, { params})
                    .then( response => response.data )
    },

    editUser(user) {
        return axios.put(`${SERVER_URL}/users/${user.id}`, user);
    },

    deleteUser(userId) {
        return axios.delete(`${SERVER_URL}/users/${userId}`);
    },

    getRestaurants(filter){
        return axios.get(`${SERVER_URL}/restaurants`, {params: filter})
                    .then( response => response.data )
    },

    getRestaurant(id){
        return axios.get(`${SERVER_URL}/restaurants/${id}`)
                    .then( response => response.data )
    },

    addRestaurant(restaurant) {
        return axios.post(`${SERVER_URL}/restaurants`, restaurant);
    },

    editRestaurant(restaurant) {
        return axios.put(`${SERVER_URL}/restaurants/${restaurant.id}`, restaurant);
    },

    deleteRestaurant(restaurantId) {
        return axios.delete(`${SERVER_URL}/restaurants/${restaurantId}`);
    },

    getReviews(restaurantId, page){
        return axios.get(`${SERVER_URL}/restaurants/${restaurantId}/reviews`, {params : {page} })
                    .then( response => response.data )
    },

    getPendingReviews(ownerId){
        const params = {
            ownerId: ownerId || null,
        }
        return axios.get(`${SERVER_URL}/reviews/pending`, {params})
                    .then( response => response.data )
    },

    createReview(restaurantId, review){
        return axios.post(`${SERVER_URL}/restaurants/${restaurantId}/reviews`, review)
    },

    deleteReview(restaurantId, reviewId){
        return axios.delete(`${SERVER_URL}/restaurants/${restaurantId}/reviews/${reviewId}`)
    },

    editReview(restaurantId, reviewId, review){
        return axios.put(`${SERVER_URL}/restaurants/${restaurantId}/reviews/${reviewId}`, review)
    },

    postReply(restaurantId, reviewId, reply){
        return  axios.post(`${SERVER_URL}/restaurants/${restaurantId}/reviews/${reviewId}/reply`, reply)
    },

}