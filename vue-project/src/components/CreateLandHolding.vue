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
            <label class="label font-bold mb-2">Legal Entity</label>
            <input type="text" v-model="legalEntity" placeholder="Legal Entity"
                class="input w-full p-2 mb-4 border rounded focus:border-blue-500 focus:outline-none">
        </div>

        <!-- Net Mineral Acres Input -->
        <div></div>

        <!-- Mineral Owner Royalty Input -->
        <div></div>

        <!-- Section Input -->
        <div></div>

        <!-- Township Input -->
        <div></div>

        <!-- Range Input -->
        <div></div>

        <!-- Title Source Selection -->
        <div></div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import app from '../RealmApp';

export default {
    name: 'CreateLandHolding',
    props: ['fetchData'],
    setup(props) {
        const owners = ref('');
        const selectOwnerId = ref('');
        const legalEntity = ref('');
        const netMineralAcres = ref(0);
        const mineralOwnerRoyalty = ref(0);
        const section = ref('');
        const township = ref('');
        const range = ref('');
        const titleSource = ref('');
        const sectionName = ref('');
        const name = ref('');
        const error = ref('');
        const statusMessage = ref('');

        onMounted(async () => {
            try {
                const ownersData = await app.currentUser.callFunction("getOwners");
                owners.value = ownersData;
            } catch (err) {
                error.value = "Error fetching owners";
                owners.value = [];
            }
        });

        const handleSubmit = async () => {
            if (!owners.value.length || !legalEntity.value || !netMineralAcres.value || !mineralOwnerRoyalty.value || !section.value || !township.value || !range.value || !titleSource.value) {
                error.value = "Please fill in all required fields.";
                return;
            }
            if (!/^\d{3}$/.test(section.value)) {
                error.value = "Section must be exactly 3 digits.";
                return;
            }
            if (!/^\d{3}$/.test(township.value)) {
                error.value = "Township must be 4 characters: first 3 digits followed by 'N' or 'S'.";
                return;
            }
            if (!/^\d{3}$/.test(range.value)) {
                error.value = "Range must be 4 characters: first 3 digits followed by 'E' or 'W'.";
                return;
            }

            try {
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
            }

        }
    }
}
</script>