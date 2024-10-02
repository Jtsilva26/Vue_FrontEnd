<template>
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-4 mt-28 text-center">Manage Owners</h1>
        <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/3 p-2 my-44">
                <CreateOwner />
            </div>
            <div class="w-full md:w-8/12 p-2 my-44">
                <OwnersList />
            </div>
            <div>
                <UploadOwners />
            </div>
        </div>
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
