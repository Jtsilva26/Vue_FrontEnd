<template>
    <div class="p-6 bg-yellow-200 rounded-lg shadow-md">
        <h2 class="text-2xl text-gray-800 mb-6 text-center">Create Owner</h2>
        <div v-if="ownerStore.error" class="text-red-500 mb-4">{{ ownerStore.error }}</div>
        <div v-if="ownerStore.statusMessage" class="text-green-500 mb-4">{{ ownerStore.statusMessage }}</div>

        <div>
            <label class="block mb-2 font-semibold">Name:</label>
            <input class="input w-full p-2 mb-2 border border-gray-300 rounded focus:border-blue-500" type="text"
                placeholder="Owner Name" v-model="ownerStore.ownerName" />
        </div>

        <div>
            <label class="block mb-2 font-semibold">Entity Type:</label>
            <select class="select w-full p-2 mb-2 border border-gray-300 rounded focus:border-blue-500"
                v-model="ownerStore.entityType">
                <option value="">Select Entity Type</option>
                <option value="Company">Company</option>
                <option value="Individual">Individual</option>
                <option value="Investor">Investor</option>
                <option value="Trust">Trust</option>
            </select>
        </div>

        <div>
            <label class="block mb-2 font-semibold">Owner Type:</label>
            <select class="select w-full p-2 mb-2 border border-gray-300 rounded focus:border-blue-500"
                v-model="ownerStore.ownerType">
                <option value="">Select Owner Type</option>
                <option value="Competitor">Competitor</option>
                <option value="Seller">Seller</option>
                <option value="Investor">Investor</option>
                <option value="Professional">Professional</option>
            </select>
        </div>

        <div>
            <label class="block mb-2 font-semibold">Address:</label>
            <input class="input w-full p-2 border border-gray-300 rounded focus:border-blue-500" type="text"
                placeholder="Address" v-model="ownerStore.address" />
        </div>

        <button class="button mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            @click="ownerStore.createOwner">
            Create
        </button>
    </div>
</template>

<script setup>
import { useOwnerStore } from '../stores/useOwnerStore';

const ownerStore = useOwnerStore();

</script>
