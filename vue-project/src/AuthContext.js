import { reactive, toRefs, onMounted } from 'vue';
import app from './realmApp';
import { signIn, signOut, signUp as registerUser } from './Auth'; // Importing signUp as registerUser for clarity

//AuthProvider component that wraps around the app to provide authentication context
export function useAuth() {
    const state = reactive({
        user: null,
        error: null,
        message: null,
    });

    onMounted(() => {
        const currentUser = app.currentUser;
        if (currentUser) {
            state.user = currentUser;
        }
    });

    //Function to handle user sign-in
    const handleSignIn = async (email, password) => {
        try {
            state.user = await signIn(email, password);
            state.message = msg;
            state.error = null;
        } catch (err) {
            state.error = err.message;
            state.message = null;
        }

    };

    //Function to handle user sign-out
    const handleSignOut = async () => {
        await signOut(); //Calls signOut function to log out the user
        state.user = null;
        state.message = "Logged out successfully!";
        state.error = null;
    };

    //Function to handle user registration
    const signUp = async (email, password) => {
        try {
            const msg = await registerUser(email, password);
            state.message = msg;
            state.error = null;
            await handleSignIn(email, password);
        } catch (err) {
            state.error = err.message;
            state.message = null;
        }
    };


    return {
        ...toRefs(state),
        handleSignIn,
        handleSignOut,
        signUp,
    };
};