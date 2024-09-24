<template>
    <div class="sign-in-container">
        <h2>{{ isSignUp ? "Sign Up" : "Sign In" }}</h2>
        <p v-if="message" class="success-message">{{ message }}</p>
        <p v-if="error" class="error-message">{{ error }}</p>

        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Email" v-model="email" required />
            <input type="password" placeholder="Password" v-model="password" required />
            <button type="submit">{{ isSignUp ? "Sign Up" : "Sign In" }}</button>
        </form>

        <p @click="toggleSignUp" style="cursor: pointer; color: blue;">
            {{ isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }}
        </p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '../AuthContext';

export default {
    setup() {
        const { user, handleSignIn, signUp, handleSignOut, error, message } = useAuth();
        const email = ref('');
        const password = ref('');
        const isSignUp = ref(false);

        const handleSubmit = async () => {
            if (isSignUp.value) {
                await signUp(email.value, password.value);
            } else {
                await handleSignIn(email.value, password.value);
            }
        };

        const toggleSignUp = () => {
            isSignUp.value = !isSignUp.value;
        };
        return {
            email,
            password,
            isSignUp,
            handleSubmit,
            toggleSignUp,
            error,
            message,
        };
    },
};
</script>