import { getAuth, signInWithPopup } from 'firebase/auth';
import { facebook } from '../../firebaseConfig'
import { loginSincrono } from './loginSincrono';

export const loginFacebook = () => {
    return (dispatch) => {
        const auth = getAuth()
        signInWithPopup(auth, facebook)
            .then((result) => {
                const user = result.user;
                dispatch(loginSincrono(user.uid, user.displayName))
            })
    }
}
