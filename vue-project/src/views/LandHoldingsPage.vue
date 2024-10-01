<template>
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-4 mt-28 text-center">Manage Land Holdings</h1>
        <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/3 p-2 my-44">
                <CreateLandHolding :fetchData="fetchData" />
            </div>
            <div class="w-full md:w-8/12 p-2 my-44">
                <LandHoldingList :authStore.state.user="authStore.state.user" :landHoldings="landHoldings" :setLandHoldings="setLandHoldings"
                    :fetchData="fetchData" />
            </div>
            <div>
                <UploadLandHoldings></UploadLandHoldings>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateLandHolding from '../components/CreateLandHolding.vue';
import LandHoldingList from '../components/LandHoldingList.vue';
import UploadLandHoldings from '@/components/UploadLandHoldings.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';
import app from '../RealmApp';

const landHoldings = ref([]);
const authStore = useAuthStore();
const router = useRouter();

const fetchData = async () => {
    if (!authStore.state.user) return;
    try {
        const mongo = app.currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('Owners_DB').collection('LandHoldings');
        const data = await collection.find({});
        landHoldings.value = data;
    } catch (error) {
        console.error("Error fetching land holdings:", authStore.state.error);
    }
};

onMounted(() => {
    if(authStore.state.user == null){
        router.push('/');
    }
    else{
        fetchData();
    }
});

const setLandHoldings = (newHoldings) => {
    landHoldings.value = newHoldings;
};
</script>
