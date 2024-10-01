import { defineStore } from "pinia";
import { signIn, signOut, signUp as registerUser } from '../Auth';
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // define global state here
    state: { user: null, message: null, error: null},

  }),
  getters: {}, // can use these like computed properties based on your state
  actions: {
    async someFunction() {
      try {
      } catch (err) {
        console.error(err);
      }
    },
    async handleSignIn (email, password) {
        try {
            this.state.user = await signIn(email, password);
            this.state.message = msg;
            this.state.error = null;
        } catch (err) {
            this.state.error = err.message;
            this.state.message = null;
        }

    },

    //Function to handle user sign-out
    async handleSignOut () {
        await signOut(); //Calls signOut function to log out the user
        this.state.user = null;
        this.state.message = "Logged out successfully!";
        this.state.error = null;
    },

    //Function to handle user registration
    async signUp (email, password) {
        try {
            const msg = await registerUser(email, password);
            this.state.message = msg;
            this.state.error = null;
            await handleSignIn(email, password);
        } catch (err) {
            this.state.error = err.message;
            this.state.message = null;
        }
    },
  },
});