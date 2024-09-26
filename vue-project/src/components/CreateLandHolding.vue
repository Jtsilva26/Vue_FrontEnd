<template>
    <div
        class="create-land-holing-container flex flex-col items-start bg-gray-50 p-5 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 class="text-gray-800 mb-5 text-2xl font-semibold">Create Land Holding</h2>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-if="statusMessage" class="text-green-500">{{ statusMessage }}</div>

        <!-- Owner Selection Box -->
        <div>
            <label class="label font-bold mb-2">Owner:</label>
            <select v-model="selectOwnerId"
                class="select w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
                <option value="">Select Owner</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">{{ owner.ownerName }}</option>
            </select>
        </div>

        <!-- Legal Entity Input -->
        <div>
            <label class="label font-bold mb-2">Legal Entity:</label>
            <input type="text" v-model="legalEntity" placeholder="Legal Entity"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Net Mineral Acres Input -->
        <div>
            <label class="label font-bold mb-2">Net Mineral:</label>
            <input type="number" v-model="netMineralAcres" placeholder="Net Mineral Acres"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Mineral Owner Royalty Input -->
        <div>
            <label class="label font-bold mb-2">Mineral Owner Royalty (%)</label>
            <input type="number" v-model="mineralOwnerRoyalty" placeholder="Mineral Owner Royalty (%)"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Section Input -->
        <div>
            <label class="label font-bold mb-2">Section:</label>
            <input type="text" v-model="section" placeholder="Section (3 characters)"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Township Input -->
        <div>
            <label class="label font-bold mb-2">Township:</label>
            <input type="text" v-model="township" placeholder="Township (4 characters)"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Range Input -->
        <div>
            <label class="label font-bold mb-2">Range:</label>
            <input type="text" v-model="range" placeholder="Range (4 characters)"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Title Source Selection -->
        <div>
            <label class="label font-bold mb-2">Title Source:</label>
            <select v-model="titleSource"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
                <option value="Class A">Class A</option>
                <option value="Class B">Class B</option>
                <option value="Class C">Class C</option>
                <option value="Class D">Class D</option>
            </select>
        </div>

        <button @click="handleSubmit"
            class="button bg-blue-500 text-white p-3 rounded hover:bg-blue-700 transition-colors duration-300">
            Create
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import app from '../RealmApp';

const owners = ref([]);
const selectOwnerId = ref('');
const legalEntity = ref('');
const netMineralAcres = ref(0);
const mineralOwnerRoyalty = ref(0);
const section = ref('');
const township = ref('');
const range = ref('');
const titleSource = ref('');
const error = ref('');
const statusMessage = ref('');

onMounted(async () => {
    try {
        const ownersData = await app.currentUser.callFunction("getOwners");
        owners.value = ownersData;
    } catch (err) {
        error.value = "Error fetching owners.";
    }
});

const handleSubmit = async () => {
    if (!selectOwnerId.value || !legalEntity.value || !netMineralAcres.value || !mineralOwnerRoyalty.value || !section.value || !township.value || !range.value || !titleSource.value) {
        error.value = "Please fill in all required fields.";
        return;
    }
    if (!/^\d{3}$/.test(section.value)) {
        error.value = "Section must be exactly 3 digits.";
        return;
    }
    if (!/^\d{3}[NS]$/.test(township.value)) {
        error.value = "Township must be 4 characters: first 3 digits followed by 'N' or 'S'.";
        return;
    }
    if (!/^\d{3}[EW]$/.test(range.value)) {
        error.value = "Range must be 4 characters: first 3 digits followed by 'E' or 'W'.";
        return;
    }

    try {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("Owners_DB").collection("LandHoldings");
        await collection.insertOne({
            ownerId: selectOwnerId.value,
            legalEntity: legalEntity.value,
            netMineralAcres: netMineralAcres.value,
            mineralOwnerRoyalty: mineralOwnerRoyalty.value,
            sectionName: `${section.value}-${township.value}-${range.value}`,
            name: `${legalEntity.value}-${section.value}`,
            section: section.value,
            township: township.value,
            range: range.value,
            titleSource: titleSource.value,
        });
        statusMessage.value = "Land Holding created successfully!";
        error.value = '';
        resetForm();
    } catch (err) {
        console.error("Error details:", err);
        error.value = "Error creating Land Holding. Please try again.";
        statusMessage.value = '';
    }
};

const resetForm = () => {
    selectOwnerId.value = '';
    legalEntity.value = '';
    netMineralAcres.value = 0;
    mineralOwnerRoyalty.value = 0;
    section.value = '';
    township.value = '';
    range.value = '';
    titleSource.value = '';
};
</script>
