<template>
  <div class="p-6">
    <div class="mb-4">
      <label for="landholding-select" class="block text-lg mb-2 text-white">Select Land Holding:</label>
      <select v-model="landHoldingStore.selectedLandHolding" id="landholding-select" class="w-full p-2 border rounded text-white">
        <option v-for="landholding in landHoldingStore.landHoldings" :key="landholding._id" :value="landholding">{{ landholding.name }}</option>
      </select>
    </div>

    <input type="file" @change="landHoldingStore.handleFileUpload" class="mb-4 p-2 border rounded w-full text-white"/>

    <button @click="landHoldingStore.uploadFile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Upload File to Land Holding
    </button>

    <div v-if="landHoldingStore.fileUrl" class="mt-4">
      <p class="text-green-500">
        File Uploads:
        <a :href="landHoldingStore.fileUrl" target="_blank" class="underline text-blue-600">{{ landHoldingStore.fileUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>

import { useLandHoldingsStore } from '../stores/useLandHoldings';

const landHoldingStore = useLandHoldingsStore();

</script>
