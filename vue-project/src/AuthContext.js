// src/AuthContext.js

import { computed, inject, onMounted, provide, reactive } from 'vue';
import app from './realmApp';
import { signIn, signOut, signUp as registerUser } from './auth'; // Importing signUp as registerUser for clarity



//Key for injection
const AuthContextKey = Symbol('AuthContext');

//AuthProvider component that wraps around the app to provide authentication context
export function useAuthProvider() {
    const state = reactive({
        user: null,
    });

    onMounted(() => {
        const currentUser = app.currentUser;
        if (currentUser) {
            state.user = currentUser;
        }
    });

    //Function to handle user sign-in
    const handleSignIn = async (email, password) => {
        const user = await signIn(email, password); //Attempt to sign in with provided credentials
        state.user = user;
    };

    //Function to handle user sign-out
    const handleSignOut = async () => {
        await signOut(); //Calls signOut function to log out the user
        state.user = null;
    };

    //Function to handle user registration
    const signUp = async (email, password) => {
        return await registerUser(email, password); //Register a new user and return the user object
    };

    provide(AuthContextKey, {
        user: computed(() => state.user),
        handleSignIn,
        handleSignOut,
        signUp,
    });
};

export function useAuth() {
    const auth = inject(AuthContextKey);
    if (!auth) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return auth;
}