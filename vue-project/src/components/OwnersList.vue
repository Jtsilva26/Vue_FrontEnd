<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Owners List</h2>
        <table class="min-w-full bg-white border-collapse border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border py-2 px-4">Owner Name</th>
                    <th class="border py-2 px-4">Entity Type</th>
                    <th class="border py-2 px-4">Owner Type</th>
                    <th class="border py-2 px-4">Total Land Holdings</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="owner in owners" :key="owner._id">
                    <td class="border py-2 px-4">{{ owner.ownerName }}</td>
                    <td class="border py-2 px-4">{{ owner.entityType || "N/A" }}</td>
                    <td class="border py-2 px-4">{{ owner.ownerType || "N/A" }}</td>
                    <td class="border py-2 px-4">{{ ownerHoldingsCount[owner._id] || 0 }}</td>
                </tr>
            </tbody>
        </table>

        <div class="mb-4">
            <label class="font-semibold">Select Owner to Delete:</label>
            <select class="border rounded p-2 w-full" @change="onOwnerSelect" v-model="selectedOwnerId">
                <option value="">Select Owner</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                    {{ owner.ownerName }}
                </option>
            </select>
        </div>

        <button class="mt-4 w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            @click="handleDelete" :disabled="!selectedOwnerId">
            Delete Owner
        </button>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import app from '../realmApp'; // Ensure the path is correct

const props = defineProps({
    owners: {
        type: Array,
        required: true,
    },
    fetchData: {
        type: Function,
        required: true,
    }
});

const selectedOwnerId = ref('');
const ownerHoldingsCount = ref({});

const fetchHoldingCounts = async () => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("LandHoldings");

    const allHoldings = await collection.find();

    const count = {};

    allHoldings.forEach(holding => {
        const ownerId = holding.ownerId;
        counts[ownerId] = (counts[ownerId] || 0) + 1;
    });

    ownerHoldingsCount.value = count;
};

// Fetch the holdings counts when the owners array changes
watch(() => props.owners, async (newOwners) => {
    if (newOwners.length > 0) {
        fetchHoldingCounts();
    }
});

onMounted(() => {
    if (prop.owners.length > 0) {
        fetchHoldingCounts();
    }
})

// Handle owner deletion
const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
        try {
            const result = await app.currentUser.callFunction("Delete", { ownerId: selectedOwnerId.value });
            if (result.status === "success") {
                alert(result.message);
                props.fetchData(); // Refresh data after deletion
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }
};
</script>
