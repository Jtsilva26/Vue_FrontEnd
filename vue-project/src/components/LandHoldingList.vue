<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Land Holdings</h2>
        <table class="min-w-full border-collapse border border-gray-200">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 p-2">Owner ID</th>
                    <th class="border border-gray-300 p-2">Legal Entity</th>
                    <th class="border border-gray-300 p-2">Net Mineral Acres</th>
                    <th class="border border-gray-300 p-2">Mineral Owner Royalty (%)</th>
                    <th class="border border-gray-300 p-2">Section</th>
                    <th class="border border-gray-300 p-2">Township</th>
                    <th class="border border-gray-300 p-2">Range</th>
                    <th class="border border-gray-300 p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="holding in landHoldings" :key="holding._id">
                    <td class="border border-gray-300 p-2">{{ owners[holding.ownerId] || "Unknown Owner" }}</td>
                    <td class="border border-gray-300 p-2">{{ holding.legalEntity }}</td>
                    <td class="border border-gray-300 p-2">{{ holding.netMineralAcres }}</td>
                    <td class="border border-gray-300 p-2">{{ holding.mineralOwnerRoyalty }}</td>
                    <td class="border border-gray-300 p-2">{{ holding.section }}</td>
                    <td class="border border-gray-300 p-2">{{ holding.township }}</td>
                    <td class="border border-gray-300 p-2">{{ holding.range }}</td>
                    <td class="border border-gray-300 p-2">
                        <button class="bg-red-500 text-white px-4 py-2 rounded" @click="handleDelete(holding._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import app from '../realmApp'; // Adjust the import based on your structure

const owners = ref({});
const landHoldings = ref([]); // This should be passed as a prop or fetched
const ownersCollection = app.currentUser.mongoClient("mongodb-atlas").db("Owners_DB").collection("Owners");
const landHoldingsCollection = app.currentUser.mongoClient("mongodb-atlas").db("Owners_DB").collection("LandHoldings");

// Fetch Land Holdings
const fetchLandHoldings = async () => {
    const data = await landHoldingsCollection.find({}).toArray();
    landHoldings.value = data;
};

// Fetch Owners
const fetchOwners = async () => {
    const ownersData = await ownersCollection.find({}).toArray();
    
    const ownersMap = {};
    ownersData.forEach(owner => {
        ownersMap[owner._id] = owner.ownerName;
    });
    
    owners.value = ownersMap;
};

// Handle Deletion
const handleDelete = async (landHoldingId) => {
    const holdingToDelete = landHoldings.value.find(holding => holding._id === landHoldingId);
    if (holdingToDelete) {
        const ownerId = holdingToDelete.ownerId;

        // Delete the land holding
        await landHoldingsCollection.deleteOne({ _id: landHoldingId });

        // Refresh data
        await fetchLandHoldings();
        await fetchOwners();
    }
};

// Fetch data when component is mounted
onMounted(async () => {
    await fetchLandHoldings();
    await fetchOwners();
});
</script>

