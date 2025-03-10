import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut as signOutAction,
} from '../redux/slices/authSlice';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';

export default function Auth() {
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.auth);

    const signIn = async () => {
        dispatch(signInStart());
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                });
            }

            dispatch(signInSuccess(user));
            toast.success('Login Successfull!');
        } catch (error) {
            dispatch(signInFailure(error.message));
            toast.error('Login Failed ...');
            console.error('Sign-in error:', error.message);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            dispatch(signOutAction());
            toast.success('Logout Successfull!');
        } catch (error) {
            console.error('Sign-out error:', error.message);
        }
    };

    return (
        <div className="text-center">
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
