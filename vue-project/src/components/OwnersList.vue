<template>
    <div class="p-6 bg-sky-950 rounded-lg shadow-md">
        <h2 class="text-2xl text-white mb-6 text-center">Owners List</h2>
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="py-2 px-4 border">Owner Name</th>
                    <th class="py-2 px-4 border">Entity Type</th>
                    <th class="py-2 px-4 border">Owner Type</th>
                    <th class="py-2 px-4 border">Total Land Holdings</th>
                    <th class="py-2 px-4 border">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="owner in owners" :key="owner._id" class="hover:bg-gray-100">
                    <td class="py-2 px-4 border">{{ owner.ownerName }}</td>
                    <td class="py-2 px-4 border">{{ owner.entityType || 'N/A' }}</td>
                    <td class="py-2 px-4 border">{{ owner.ownerType || 'N/A' }}</td>
                    <td class="py-2 px-4 border">{{ ownerHoldingsCount[owner._id] || 0 }}</td>
                    <td class="border px-4 py-2">
                        <button @click="handleDelete(owner._id)"
                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import app from '../realmApp';

const props = defineProps({
    owners: {
        type: Array,
    },
    fetchData: Function,
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

// Handle owner deletion
const handleDelete = async (ownerId) => {
    //console.log("Deleting owner with ID: ", (selectedOwnerId.value).toHexString());
    if (confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
        try {
            // Calls the "Delete" function in MongoDB Realm server
            const result = await app.currentUser.callFunction("Delete", { ownerId });
            if (result.status === "success") {
                alert(result.message);
                props.fetchData();

            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }
};
</script>
