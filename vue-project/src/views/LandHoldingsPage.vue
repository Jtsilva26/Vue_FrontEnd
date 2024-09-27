<template>
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-4 mt-28 text-center">Manage Land Holders</h1>
        <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/3 p-2 my-44">
                <CreateLandHolding :fetchData="fetchData" />
            </div>
            <div class="w-full md:w-8/12 p-2 my-44">
                <LandHoldingList :user="user" :landHoldings="landHoldings" :setLandHoldings="setLandHoldings"
                    :fetchData="fetchData" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateLandHolding from '../components/CreateLandHolding.vue';
import LandHoldingList from '../components/LandHoldingList.vue';
import { useAuth } from '../AuthContext';
import app from '../RealmApp';

const { user } = useAuth();
const landHoldings = ref([]);

const fetchData = async () => {
    if (!user.value) return;
    try {
        const mongo = app.currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('Owners_DB').collection('LandHoldings');
        const data = await collection.find({});
        landHoldings.value = data;
    } catch (error) {
        console.error("Error fetching land holdings:", error);
    }
};

onMounted(() => {
    fetchData();
});

const setLandHoldings = (newHoldings) => {
    landHoldings.value = newHoldings;
};
</script>
