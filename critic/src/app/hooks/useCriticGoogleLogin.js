import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import { GOOGLE_CLIENT_ID } from 'env';
import { useContext } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

export default function useCriticGoogleLogin({
        onUserFound = () => {},
        onUserNotFound = () => {},
        onLogout = () => {}
    }){

    const {dispatch} = useContext(CriticStore)
    
    /* LOGIN */
    const onSuccess = (res) => {
        console.log(res);
        dispatch(CriticDispatchers.login(res.profileObj))
        checkIfUserExists(res.profileObj.email)
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId: GOOGLE_CLIENT_ID,
        onFailure,
        isSignedIn: true
    })

    const checkIfUserExists = (email) => {
        apiService.getAppUserByEmail(email)
                  .then((appUser) => {
                      dispatch(CriticDispatchers.setAppUser(appUser))
                      onUserFound();
                  })
                  .catch(() => onUserNotFound())
    }

    /* LOGOUT */

    const onLogoutSuccess = (res) => {
        console.log(res);
        dispatch(CriticDispatchers.logout())
        onLogout()
    }

    const { signOut } = useGoogleLogout({
        onFailure,
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess
    })

    return {signIn, signOut}
}