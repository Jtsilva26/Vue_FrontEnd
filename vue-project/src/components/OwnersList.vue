<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Owners List</h2>
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="py-2 px-4 border">Owner Name</th>
                    <th class="py-2 px-4 border">Entity Type</th>
                    <th class="py-2 px-4 border">Owner Type</th>
                    <th class="py-2 px-4 border">Total Land Holdings</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="owner in owners" :key="owner._id">
                    <td class="py-2 px-4 border">{{ owner.ownerName }}</td>
                    <td class="py-2 px-4 border">{{ owner.entityType || 'N/A' }}</td>
                    <td class="py-2 px-4 border">{{ owner.ownerType || 'N/A' }}</td>
                    <td class="py-2 px-4 border">{{ ownerHoldingsCount[owner._id] || 0 }}</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4">
            <label class="mr-2">Select Owner to Delete:</label>
            <select class="border border-gray-300 rounded p-2" v-model="selectedOwnerId">
                <option value="">Select Owner</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">{{ owner.ownerName }}</option>
            </select>
        </div>
        <button 
            class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" 
            @click="handleDelete" 
            :disabled="!selectedOwnerId"
        >
            Delete Owner
        </button>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import app from '../realmApp';

const props = defineProps({
    owners: {
        type: Array,
        required: true,
    },
    fetchData: {
        type: Function,
        required: true,
    },
});

const selectedOwnerId = ref(''); // ID of the selected owner for deletion
const ownerHoldingsCount = ref({}); // Map of Owner IDs to their holding count

const fetchHoldingsCounts = async () => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("LandHoldings");
    
    const allHoldings = await collection.find(); // Fetch all holdings
    const counts = {}; // Initialize empty count object

    // Counts the number of land holdings for each owner
    allHoldings.forEach(holding => {
        const ownerId = holding.ownerId; // Get the owner ID form
        counts[ownerId] = (counts[ownerId] || 0) + 1; // Increments the count for owner
    });

    ownerHoldingsCount.value = counts; // Update state with counts
};

// Fetch holding counts when owners change
watch(() => props.owners, (newOwners) => {
    if (newOwners.length > 0) {
        fetchHoldingsCounts();
    }
});

// Fetch holding counts when component mounts
onMounted(() => {
    if (props.owners.length > 0) {
        fetchHoldingsCounts();
    }
});

// Handle owner deletion
const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
        try {
            // Calls the "Delete" function in MongoDB Realm server
            const result = await app.currentUser.callFunction("Delete", { ownerId: selectedOwnerId.value });
            if (result.status === "success") {
                alert(result.message);
                props.fetchData(); // Refresh data
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }
};
</script>

<style scoped>
/* Add any additional scoped styles here */
</style>
