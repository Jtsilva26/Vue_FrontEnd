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
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { user, handleSignIn, signUp, handleSignOut, error, message } = useAuth();
        const email = ref('');
        const password = ref('');
        const isSignUp = ref(false);
        const router = useRouter();

        const handleSubmit = async () => {
            try {
                if (isSignUp.value) {
                    await signUp(email.value, password.value);
                } else {
                    await handleSignIn(email.value, password.value);
                }

                router.push('./HomeView.vue');

                window.location.reload();
            } catch (err) {
                console.error('Authentication failed', err);
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

<style>
.sign-in-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

input:focus {
    border-color: #007BFF;
    outline: none;
}

button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

p {
    text-align: center;
    margin-top: 15px;
}

p:hover {
    text-decoration: underline;
    cursor: pointer;
}

.error-message {
    color: red;
    text-align: center;
}

.success-message {
    color: green;
    text-align: center;
}
</style>