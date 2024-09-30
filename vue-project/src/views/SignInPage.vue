<template>
    <div class="max-w-xs mx-auto my-60  p-5 rounded-lg shadow-lg bg-slate-100">

        <div v-if="authStore.user.value" class="text-center mt-4">
            <h3>Welcome!</h3>
            <button @click="authStore.handleSignOut" class="bg-red-600 text-white rounded py-2 mt-2 w-36">
                Sign Out
            </button>
        </div>

        <div v-else>

            <h2 class="text-center text-2xl font-semibold text-black mb-6">{{ isSignUp ? "Sign Up" : "Sign In" }}
            </h2>
            <p v-if="authStore.message.value" class="text-green-500 text-center mb-4">{{ authStore.message.value }}</p>
            <p v-if="authStore.error.value" class="text-red-500 text-center mb-4">{{ authStore.error.value }}</p>

            <form @submit.prevent="handleSubmit" class="flex flex-col">
                <input type="email" placeholder="Email" v-model="email" required
                    class="mb-4 p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                <input type="password" placeholder="Password" v-model="password" required
                    class="mb-4 p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                <button type="submit"
                    class="bg-blue-600 text-white font-semibold rounded py-2 transition duration-300 hover:bg-blue-700 mb-4 w-full">
                    {{ isSignUp ? "Sign Up" : "Sign In" }}</button>
            </form>

            <p @click="toggleSignUp" class="text-center cursor-pointer text-black hover:underline mt-4">
                {{ isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref} from 'vue';
import { useAuth } from '../AuthContext';
import { useRouter } from 'vue-router';

//const { user, handleSignIn, signUp, handleSignOut, error, message } = useAuth();
const authStore = useAuth();
const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const router = useRouter();

const handleSubmit = async () => {
    try {
        if (isSignUp.value) {
            await authStore.signUp(email.value, password.value);
        } else {
            await authStore.handleSignIn(email.value, password.value);
        }

        router.push('/');

    } catch (err) {
        console.error('Authentication failed', err);
    }
};

const toggleSignUp = () => {
    isSignUp.value = !isSignUp.value;
};

</script>
