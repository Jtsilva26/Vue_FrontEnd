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
                <tr v-for="holding in landHoldings" :key="holding._id" class="hover:bg-gray-100">
                    <td class="border px-4 py-2">{{ owners[holding.ownerId] }}</td>
                    <td class="border px-4 py-2">{{ holding.legalEntity }}</td>
                    <td class="border px-4 py-2">{{ holding.netMineralAcres }}</td>
                    <td class="border px-4 py-2">{{ holding.mineralOwnerRoyalty }}</td>
                    <td class="border px-4 py-2">{{ holding.section }}</td>
                    <td class="border px-4 py-2">{{ holding.township }}</td>
                    <td class="border px-4 py-2">{{ holding.range }}</td>
                    <td class="border px-4 py-2 underline">{{ holding.fileUrl }}</td>
                    <td class="border px-4 py-2">
                        <button @click="handleDelete(holding._id)"
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
import { ref, onMounted } from 'vue';
import app from '../RealmApp';

const props = defineProps({
    user: Object,
    landHoldings: Array,
    setLandHoldings: Function,
    fetchData: Function
});

const owners = ref({});

const fetchOwners = async () => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");
    const ownersData = await collection.find({});
    const ownersMap = {};


    ownersData.forEach(owner => {
        ownersMap[owner._id] = owner.ownerName;
        //console.log(ownersMap)
    });
    owners.value = ownersMap;

};

const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this land holding?")) {
        try {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");
            await collection.deleteOne({ _id: id });
            props.setLandHoldings(props.landHoldings.filter(item => item._id != id));
            props.fetchData();
        } catch (error) {
            console.error("Error deleting land holding:", error);
        }
    }
};

onMounted(() => {
    fetchOwners();
})
</script>
