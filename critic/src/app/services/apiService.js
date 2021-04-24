import axios from 'axios';
import { SERVER_URL } from '../../env';

export const apiService = {

    getUserByEmail(email){
        return axios.get(`${SERVER_URL}/users/byEmail/${email}`)
                    .then( response => response.data )
    },
}