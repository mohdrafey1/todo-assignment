import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut as signOutAction,
} from '../redux/slices/authSlice';

export default function Auth() {
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.auth);

    const signIn = async () => {
        dispatch(signInStart());
        try {
            const result = await signInWithPopup(auth, googleProvider);
            dispatch(signInSuccess(result.user));
        } catch (error) {
            dispatch(signInFailure(error.message));
            console.error('Sign-in error:', error.message);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            dispatch(signOutAction());
        } catch (error) {
            console.error('Sign-out error:', error.message);
        }
    };

    return (
        <div className=" text-center">
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : currentUser ? (
                <div className="md:flex gap-2 items-center">
                    <p>Welcome, {currentUser.displayName}</p>
                    <button
                        onClick={signOutUser}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        onClick={signIn}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Sign in with Google
                    </button>
                </>
            )}
        </div>
    );
}
