<template>
    <div class="owners-page">
        <h1 class="text-3xl font-bold mb-4">Manage Owners</h1>
        <CreateOwner @data-fetched="fetchData" />
        <OwnersList :owners="owners" :fetchData="fetchData" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateOwner from '../CreateOwner.vue';
import OwnersList from '../OwnersList.vue';
import app from '../../realmApp';

const owners = ref([]); // Reactive variable to hold owners

// Function to fetch owners from MongoDB Realm
const fetchData = async () => {
    try {
        const result = await app.currentUser.callFunction("getOwners");
        if (result) {
            owners.value = result; // Update the owners list
        }
    } catch (error) {
        console.error("Error fetching owners:", error);
    }
};

// Fetch data when the component is mounted
onMounted(() => {
    fetchData();
});
</script>

<style scoped>
/* Any styles specific to OwnersPage can go here */
.owners-page {
    padding: 20px;
}
</style>
