<template>
    <div class="create-owner-container max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 class="text-2xl text-gray-800 mb-6">Create Owner</h2>
        <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
        <div v-if="statusMessage" class="text-green-500 mb-4">{{ statusMessage }}</div>
        
        <div>
            <label class="block mb-2 font-semibold">Name:</label>
            <input
                class="input w-full p-2 border border-gray-300 rounded focus:border-blue-500"
                type="text"
                placeholder="Owner Name"
                v-model="ownerName"
            />
        </div>
        
        <div>
            <label class="block mb-2 font-semibold">Entity Type:</label>
            <select 
                class="select w-full p-2 border border-gray-300 rounded focus:border-blue-500" 
                v-model="entityType"
            >
                <option value="">Select Entity Type</option>
                <option value="Company">Company</option>
                <option value="Individual">Individual</option>
                <option value="Investor">Investor</option>
                <option value="Trust">Trust</option>
            </select>
        </div>
        
        <div>
            <label class="block mb-2 font-semibold">Owner Type:</label>
            <select 
                class="select w-full p-2 border border-gray-300 rounded focus:border-blue-500" 
                v-model="ownerType"
            >
                <option value="">Select Owner Type</option>
                <option value="Competitor">Competitor</option>
                <option value="Seller">Seller</option>
                <option value="Investor">Investor</option>
                <option value="Professional">Professional</option>
            </select>
        </div>
        
        <div>
            <label class="block mb-2 font-semibold">Address:</label>
            <input
                class="input w-full p-2 border border-gray-300 rounded focus:border-blue-500"
                type="text"
                placeholder="Address"
                v-model="address"
            />
        </div>
        
        <button 
            class="button mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            @click="handleSubmit"
        >
            Create
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import app from '../realmApp'; // Ensure the path is correct

const ownerName = ref('');
const entityType = ref('');
const ownerType = ref('');
const address = ref('');
const statusMessage = ref('');
const error = ref('');

const handleSubmit = async () => {
    if (!ownerName.value || !entityType.value || !ownerType.value || !address.value) {
        error.value = "Please fill out all required fields.";
        statusMessage.value = '';
        return; // Stop execution if validation fails
    }

    try {
        const result = await app.currentUser.callFunction("Duplicate", {
            ownerName: ownerName.value,
            entityType: entityType.value,
            ownerType: ownerType.value,
            address: address.value,
            totalLandHoldings: 0,
            landHoldings: []
        });

        if (result.status === "failed") {
            error.value = result.message;
            statusMessage.value = '';
        } else {
            statusMessage.value = result.message;
            error.value = ''; // Clear error message
            resetForm(); // Reset form fields
        }
    } catch (err) {
        error.value = "An error occurred while creating the owner. Please try again.";
        statusMessage.value = '';
    }
};

const resetForm = () => {
    ownerName.value = '';
    entityType.value = '';
    ownerType.value = '';
    address.value = '';
};
</script>
