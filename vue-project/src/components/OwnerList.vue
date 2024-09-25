<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Owners List</h2>
        <table class="owners-table w-full border-collapse mb-4">
            <thead>
                <tr>
                    <th class="border p-2 bg-gray-200">Owner Name</th>
                    <th class="border p-2 bg-gray-200">Entity Type</th>
                    <th class="border p-2 bg-gray-200">Owner Type</th>
                    <th class="border p-2 bg-gray-200">Total Land Holdings</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="owner in owners" :key="owner._id">
                    <td class="border p-2">{{ owner.ownerName }}</td>
                    <td class="border p-2">{{ owner.entityType || "N/A" }}</td>
                    <td class="border p-2">{{ owner.ownerType || "N/A" }}</td>
                    <td class="border p-2">{{ ownerHoldingsCount[owner._id] || 0 }}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="mb-4">
            <label class="font-semibold">Select Owner to Delete:</label>
            <select 
                class="border rounded p-2 w-full" 
                @change="onOwnerSelect" 
                v-model="selectedOwnerId"
            >
                <option value="">Select Owner</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                    {{ owner.ownerName }}
                </option>
            </select>
        </div>
        
        <button 
            class="button-delete w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            @click="handleDelete" 
            :disabled="!selectedOwnerId"
        >
            Delete Owner
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
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
const ownerHoldingsCount = ref({}); // Reactive object to hold the counts

// Fetch the holdings counts when the owners array changes
watch(() => props.owners, async (newOwners) => {
    if (newOwners.length > 0) {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("Owners_DB").collection("LandHoldings");

        const allHoldings = await collection.find();
        const counts = {};

        allHoldings.forEach(holding => {
            const ownerId = holding.ownerId;
            counts[ownerId] = (counts[ownerId] || 0) + 1;
        });

        ownerHoldingsCount.value = counts; // Update the reactive count object
    }
});

const onOwnerSelect = (event) => {
    selectedOwnerId.value = event.target.value;
};

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

<style scoped>
.owners-table th,
.owners-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.owners-table th {
    background-color: #f2f2f2;
}

.owners-table tr:hover {
    background-color: #f1f1f1;
}

.button-delete {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.button-delete:hover {
    background-color: #c0392b;
}
</style>
