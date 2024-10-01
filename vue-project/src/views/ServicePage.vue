<template>
    <div class="services-container flex justify-around p-5">
        <router-link to="/owners" class="max-w-xs mx-auto my-60  p-5 rounded-lg shadow-lg bg-slate-100">
            <h2 class="text-xl text-center font-semibold">Owners</h2>
            <p class="mt-2 text-center">Create and Manage Owners</p>
        </router-link>
        <router-link to="/land-holdings" class="max-w-xs mx-auto my-60  p-5 rounded-lg shadow-lg bg-slate-100">
            <h2 class="text-xl text-center font-semibold">Land Holdings</h2>
            <p class="mt-2 text-center">Create and Manage Land Holdings</p>
        </router-link>
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