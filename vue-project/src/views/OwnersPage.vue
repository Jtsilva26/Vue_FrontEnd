<template>
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-4 mt-28 text-center">Manage Owners</h1>
        <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/3 p-2 my-44">
                <CreateOwner :fetchData="fetchData" />
            </div>
            <div class="w-full md:w-8/12 p-2 my-44">
                <OwnersList :owners="owners" :fetchData="fetchData" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateOwner from '../components/CreateOwners.vue';
import OwnersList from '../components/OwnersList.vue';
import app from '../RealmApp';
import { useAuth } from '../AuthContext';
import { useRouter } from 'vue-router';


const owners = ref([]); // Reactive variable to hold owners
const authStore = useAuth();
const router = useRouter();

const fetchData = async () => {
    try {
        const result = await app.currentUser.callFunction("getOwners");
        if (result) {
            owners.value = result;
        }
    } catch (error) {
        console.error("Error fetching owners:", error);
    }
};

onMounted(() => {
    if(authStore.user.value == null){
        router.push('/');
    }
    else{
        fetchData();
    }
});
</script>
