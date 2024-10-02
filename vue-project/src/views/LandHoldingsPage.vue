<template>
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-4 mt-28 text-center">Manage Land Holdings</h1>
        <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/3 p-2 my-44">
                <CreateLandHolding/>
            </div>
            <div class="w-full md:w-8/12 p-2 my-44">
                <LandHoldingList/>
            </div>
            <div>
                <UploadLandHoldings/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import CreateLandHolding from '../components/CreateLandHolding.vue';
import LandHoldingList from '../components/LandHoldingList.vue';
import UploadLandHoldings from '@/components/UploadLandHoldings.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useLandHoldingsStore } from '../stores/useLandHoldings';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const landHoldingsStore = useLandHoldingsStore();
const router = useRouter();

landHoldingsStore.fetchData();

landHoldingsStore.selectedLandHolding();

onMounted(() => {
    if(authStore.state.user == null){
        router.push('/');
    }
    else{
        landHoldingsStore.fetchData();

    }
});

</script>
