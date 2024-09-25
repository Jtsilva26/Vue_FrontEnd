<template>
    <div class="sign-in-container max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white">
        <h2 class="text-center text-2xl font-semibold text-gray-800 mb-6">{{ isSignUp ? "Sign Up" : "Sign In" }}</h2>
        <p v-if="message" class="text-green-500 text-center mb-4">{{ message }}</p>
        <p v-if="error" class="text-red-500 text-center mb-4">{{ error }}</p>

        <form @submit.prevent="handleSubmit" class="flex flex-col">
            <input type="email" placeholder="Email" v-model="email" required
                class="mb-4 p-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
            <input type="password" placeholder="Password" v-model="password" required
                class="mb-4 p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
            <button type="submit"
                class="bg-blue-600 text-white font-semibold rounded py-2 transition duration-300 hover:bg-blue-700 mb-4">
                {{ isSignUp ? "Sign Up" : "Sign In" }}</button>
        </form>

        <p @click="toggleSignUp" class="text-center cursor-pointer text-blue-600 hover:underline mt-4">
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