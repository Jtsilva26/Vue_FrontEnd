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
                <tr v-for="owner in ownerStore.owners" :key="owner._id" class="hover:bg-gray-100">
                    <td class="py-2 px-4 border">{{ owner.ownerName }}</td>
                    <td class="py-2 px-4 border">{{ owner.entityType || 'N/A' }}</td>
                    <td class="py-2 px-4 border">{{ owner.ownerType || 'N/A' }}</td>
                    <td class="py-2 px-4 border">{{ ownerStore.ownerHoldingsCount[owner._id] || 0 }}</td>
                    <td class="border px-4 py-2">
                        <button @click="ownerStore.handleDelete(owner._id)"
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
import { onMounted, watch } from 'vue';
import { useOwnerStore } from '../stores/useOwnerStore';

const ownerStore = useOwnerStore();

ownerStore.fetchOwners();
ownerStore.fetchHoldingsCounts();

// onMounted(() =>{
//     ownerStore.fetchOwners();
//     ownerStore.fetchData();
// });

</script>
