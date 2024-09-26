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
                        <button class="bg-red-500 text-white px-4 py-2 rounded" @click="handleDelete(holding.ownerId)">Delete</button>
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
const landHoldings = ref([]); // This should be passed as a prop
const fetchData = () => {}; // Implement fetching logic to get updated landHoldings

const fetchOwners = async () => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");
    const ownersData = await collection.find({}).toArray();
    
    const ownersMap = {};
    ownersData.forEach(owner => {
        ownersMap[owner._id] = owner.ownerName;
    });
    
    owners.value = ownersMap;
};

const handleDelete = async (ownerId) => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");

    await landHoldingsCollection.deleteMany({ ownerId });
    await ownersCollection.deleteOne({ _id: ownerId });
    
    fetchData();
    fetchOwners();
};

onMounted(() => {
    fetchOwners();
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
