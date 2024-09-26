<template>
    <div>
        <h2 class="text 2xl font-bold mb-4">Land Holdings</h2>
        <table class="min-w-full table-auto border-collapse">
            <thead class="bg-gray-200">
                <tr>
                    <th class="border px-4 py-2 text-left">Owner Name</th>
                    <th class="border px-4 py-2 text-left">Legal Entity</th>
                    <th class="border px-4 py-2 text-left">Net Mineral Acres</th>
                    <th class="border px-4 py-2 text-left">Mineral Owner Royalty (%)</th>
                    <th class="border px-4 py-2 text-left">Section</th>
                    <th class="border px-4 py-2 text-left">Township</th>
                    <th class="border px-4 py-2 text-left">Range</th>
                    <th class="border px-4 py-2 text-left">Actions</th>
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
                    <td class="border px-4 py-2">
                        <button @click="handleDelete(holding._id)"
                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                            Delete
                        </button>
                    </td>
                </tr>>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import app from '../RealmApp';

export default {
    props: {
        user: Object,
        landHoldings: Array,
        setLandHoldings: Function,
        fetchData, Function
    },
    setup(props) {
        const owners = ref({});

        onMounted(async () => {
            const mongo = app.currentUser.mongoClient('mongodb-atlas');
            const collection = mongo.db('Owners_DB').collection('Owners');
            const ownersData = await collection.find({});
            const ownersMap = {};

            ownersData.forEach(owner => {
                ownersMap[owner._id] = owner.ownerName;
            });
            owner.value = owner.ownersMap;
        });

        const handleDelete = async (id) => {
            const mongo = app.currentUser.mongoClient('mongodb-atlas');
            const collection = mongo.db('Owners_DB').collection('LandHoldings');
            await collection.deleteOne({ _id: id });
            props.setLandHoldings(props.landHoldings.filter(item => item._id !== id));
            props.fetchData();
        };

        return {
            owners,
            handleDelete
        };
    }
};
</script>