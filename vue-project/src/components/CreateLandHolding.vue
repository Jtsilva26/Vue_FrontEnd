<template>
    <div class="p-6 bg-yellow-200 rounded-lg shadow-md">
        <h2 class="text-gray-800 mb-5 text-2xl font-semibold text-center">Create Land Holding</h2>
        <div v-if="landHoldingsStore.error" class="text-red-500 whitespace-pre-wrap">
            {{ landHoldingsStore.error }}
        </div>
        <div v-if="landHoldingsStore.statusMessage" class="text-green-500">{{ landHoldingsStore.statusMessage }}</div>

        <!-- Owner Selection Box -->
        <div>
            <label class="label font-bold mb-2">Owner:</label>
            <select v-model="landHoldingsStore.selectOwnerId"
                class="select w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
                <option value="">Select Owner</option>
                <option v-for="owner in ownerStore.owners" :key="owner._id" :value="owner._id">{{ owner.ownerName }}</option>
            </select>
        </div>

        <!-- Legal Entity Input -->
        <div>
            <label class="label font-bold mb-2">Legal Entity:</label>
            <input type="text" v-model="landHoldingsStore.legalEntity" placeholder="Legal Entity"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Net Mineral Acres Input -->
        <div>
            <label class="label font-bold mb-2">Net Mineral:</label>
            <input type="number" v-model="landHoldingsStore.netMineralAcres" placeholder="Net Mineral Acres"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Mineral Owner Royalty Input -->
        <div>
            <label class="label font-bold mb-2">Mineral Owner Royalty (%)</label>
            <input type="number" min="0" max="100" step="10" maxlength="3" v-model="landHoldingsStore.mineralOwnerRoyalty" placeholder="Mineral Owner Royalty (%)"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Section Input -->
        <div>
            <label class="label font-bold mb-2">Section:</label>
            <input type="text" v-model="landHoldingsStore.section" placeholder="Section (3 characters)" maxlength="3"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Township Input -->
        <div>
            <label class="label font-bold mb-2">Township:</label>
            <input type="text" v-model="landHoldingsStore.township" placeholder="Township (3 characters + N/S)" maxlength="4"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Range Input -->
        <div>
            <label class="label font-bold mb-2">Range:</label>
            <input type="text" v-model="landHoldingsStore.range" placeholder="Range (3 characters + W/E)" maxlength="4"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Title Source Selection -->
        <div>
            <label class="label font-bold mb-2">Title Source:</label>
            <select v-model="landHoldingsStore.titleSource"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
                <option value="Class A">Class A</option>
                <option value="Class B">Class B</option>
                <option value="Class C">Class C</option>
                <option value="Class D">Class D</option>
            </select>
        </div>

        <button @click="landHoldingsStore.handleSubmit"
            class="button bg-blue-500 text-white p-3 rounded hover:bg-blue-700 transition-colors duration-300">
            Create
        </button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLandHoldingsStore } from '../stores/useLandHoldings';
import { useOwnerStore } from '../stores/useOwnerStore';

const landHoldingsStore = useLandHoldingsStore();
const ownerStore = useOwnerStore();

landHoldingsStore.fetchData();

onMounted(async () => {
    ownerStore.fetchOwners();
});
</script>
