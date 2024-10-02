<template>
    <div class="p-6 bg-sky-950 rounded-lg shadow-md">
        <h2 class="text-2xl text-white mb-6 text-center">Land Holdings</h2>
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border px-4 py-2">Owner Name</th>
                    <th class="border px-4 py-2">Legal Entity</th>
                    <th class="border px-4 py-2">Net Mineral Acres</th>
                    <th class="border px-4 py-2">Mineral Owner Royalty (%)</th>
                    <th class="border px-4 py-2">Section</th>
                    <th class="border px-4 py-2">Township</th>
                    <th class="border px-4 py-2">Range</th>
                    <th class="border px-4 py-2">Link</th>
                    <th class="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="holding in landHoldingsStore.landHoldings" :key="holding._id" class="hover:bg-gray-100">
                    <td class="border px-4 py-2">{{ landHoldingsStore.owners[holding.ownerId] }}</td>
                    <td class="border px-4 py-2">{{ holding.legalEntity }}</td>
                    <td class="border px-4 py-2">{{ holding.netMineralAcres }}</td>
                    <td class="border px-4 py-2">{{ holding.mineralOwnerRoyalty }}</td>
                    <td class="border px-4 py-2">{{ holding.section }}</td>
                    <td class="border px-4 py-2">{{ holding.township }}</td>
                    <td class="border px-4 py-2">{{ holding.range }}</td>
                    <td class="border px-4 py-2">
                        <span v-if="holding.fileUrl && holding.fileUrl.includes('/')">
                            <a :href="`https://file-upload-worker.slvjordan2626.workers.dev/${holding.fileUrl.split('/').pop()}`" target="_blank" class="text-blue-600 hover:underline">Download File</a>
                        </span>
                        <span v-else>No File</span>
                    </td>
                    <td class="border px-4 py-2">
                        <button @click="landHoldingsStore.handleDelete(holding._id)"
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
import { onMounted } from 'vue';
import { useLandHoldingsStore } from '../stores/useLandHoldings';

const landHoldingsStore = useLandHoldingsStore();

landHoldingsStore.fetchData();

onMounted(() => {
    landHoldingsStore.fetchOwners();
})
</script>
