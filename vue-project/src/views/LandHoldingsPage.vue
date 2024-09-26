<template>
    <div class="p-20">
        <h2 class="text-2xl font-bold mb-4">Land Holders</h2>
        <CreateLandHolding :fetchData="fetchData" />
        <LandHoldingList :user="user" :landHoldings="landHoldings" :setLandHoldings="setLandHoldings"
            :fetchData="fetchData" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CreateLandHolding from '../components/CreateLandHolding.vue';
import LandHoldingList from '../components/LandHoldingList.vue';
import { useAuth } from '../AuthContext';
import app from '../RealmApp';


export default {
    components: {
        CreateLandHolding,
        LandHoldingList
    },
    setup() {
        const { user } = useAuth();
        const landHoldings = ref([]);

        const fetchData = async () => {
            const mongo = app.currentUser.mongoClient('mongogb-atlas');
            const collection = mongo.db('Owners_DB').collection('LandHoldings');
            const data = await collection.find({});
            landHoldings.value = data;
        };

        onMounted(() => {
            fetchData();
        });

        const setLandHoldings = (newHoldings) => {
            landHoldings.value = newHoldings;
        };

        return {
            user,
            landHoldings,
            setLandHoldings,
            fetchData
        };
    }
};
</script>