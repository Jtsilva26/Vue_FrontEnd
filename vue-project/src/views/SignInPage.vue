<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <main class="relative isolate">
            
            <div class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
                <div class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
            </div>
            <div class="max-w-xs mx-auto my-60  p-5 rounded-lg shadow-lg bg-slate-100">
                <div v-if="authStore.state.user" class="text-center mt-4">
                    <h3>Welcome!</h3>
                    <button @click="authStore.handleSignOut" class="bg-red-600 text-white rounded py-2 mt-2 w-36">
                        Sign Out
                    </button>
                    <footer class="relative mt-32 sm:mt-40" aria-labelledby="footer-heading"></footer>
                </div>

                <div v-else>
                    <h2 class="text-center text-2xl font-semibold text-black mb-6">{{ isSignUp ? "Sign Up" : "Sign In" }}
                    </h2>
                    <p v-if="authStore.state.message" class="text-green-500 text-center mb-4">{{ authStore.state.message }}</p>
                    <p v-if="authStore.state.error" class="text-red-500 text-center mb-4">{{ authStore.state.error }}</p>
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
        </main>
        <footer class="relative mt-32 sm:mt-40" aria-labelledby="footer-heading"></footer>
    </div>
</template>


<!-- <template>

    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-400">
          Not a member?
          {{ ' ' }}
          <a href="#" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  </template> -->
  

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';

const authStore = useAuthStore();
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
        console.log(authStore.state.user);
        router.push('/');

    } catch (err) {
        console.error('Authentication failed', err);
    }
};

const toggleSignUp = () => {
    isSignUp.value = !isSignUp.value;
};

</script>
