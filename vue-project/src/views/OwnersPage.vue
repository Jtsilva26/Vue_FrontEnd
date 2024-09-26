<template>
    <div class="p-20">
        <h1 class="text-3xl font-bold mb-4">Manage Owners</h1>
        <CreateOwner :fetchData="fetchData" />
        <OwnersList :owners="owners" :fetchData="fetchData" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateOwner from '../components/CreateOwners.vue';
import OwnersList from '../components/OwnersList.vue';
import app from '../realmApp';

const owners = ref([]); // Reactive variable to hold owners

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
    fetchData();
});
</script>
