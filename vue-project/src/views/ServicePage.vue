<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 bg-repeat">
        <main class="relative isolate">
            
            <div class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
                <div class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
            </div>
            <div class="flex justify-around p-5">
                <router-link to="/owners" class="max-w-xs h-full mx-auto my-60  p-5 rounded-lg shadow-lg bg-slate-100">
                    <h2 class="text-xl text-center font-semibold">Owners</h2>
                    <p class="mt-2 text-center">Create and Manage Owners</p>
                </router-link>
                <router-link to="/land-holdings" class="max-w-xs mx-auto my-60  p-5 rounded-lg shadow-lg bg-slate-100">
                    <h2 class="text-xl text-center font-semibold">Land Holdings</h2>
                    <p class="mt-2 text-center">Create and Manage Land Holdings</p>
                </router-link>
            </div>
        </main>
    </div>
</template>

<script setup>

import  { onMounted } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onMounted (() => {
    if(authStore.state.user == null){
        router.push('/');
    }
})



</script>