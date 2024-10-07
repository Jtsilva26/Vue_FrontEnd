<template>
    <div class="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 bg-repeat">
        <main class="relative isolate">
            <div class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
                <div class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
            </div>
            <div class="px-6 pt-6 lg:px-8">
                <div class="mx-auto max-w-2xl pt-14 text-center sm:pt-24">
                    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Manage Owners</h1>
                </div>
            </div>
            <div class="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <div class="w-full md:w-1/3 p-6 container flow-root float-left">
                            <CreateOwner />
                        </div>
                        <div class="md:w-8/12 container flow-root float-right">
                            <OwnersList />
                        </div>
                        <div class="md:w-1/3 container">
                            <UploadOwners />
                        </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import CreateOwner from '../components/CreateOwners.vue';
import OwnersList from '../components/OwnersList.vue';
import UploadOwners from '@/components/UploadOwners.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useOwnerStore } from '../stores/useOwnerStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const ownerStore = useOwnerStore();
const router = useRouter();

onMounted(() => {
    if(authStore.state.user == null){
        router.push('/');
    }
    else{
        ownerStore.fetchOwners();
    }
});
</script>
