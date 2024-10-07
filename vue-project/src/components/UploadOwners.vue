<template>
  <div class="p-6">
    <!-- Owner selection -->
    <div class="mb-4">
      <label for="owner-select" class="block text-lg mb-2 text-white">Select Owner:</label>
      <select v-model="ownerStore.selectedOwner" @change="ownerStore.fetchOwnersFiles" id="owner-select" class="w-full p-2 border rounded">
        <option v-for="owner in ownerStore.owners" :key="owner._id" :value="owner">{{ owner.ownerName }}</option>
      </select>
    </div>

    <!-- File upload -->
    <input type="file" @change="ownerStore.handleFileUpload" class="mb-4 p-2 border rounded w-full text-white"/>

    <button @click="ownerStore.uploadFile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Upload File to Owner
    </button>

    <!-- Show file upload URL -->
    <div v-if="ownerStore.fileUrl" class="mt-4">
      <p class="text-green-500">
        File Uploaded:
        <a :href="ownerStore.fileUrl" target="_blank" class="underline text-blue-600">{{ ownerStore.fileUrl.split('/').pop() }}</a>
      </p>
    </div>

    <!-- Table for listing all files of the selected owner -->
    <div v-if="ownerStore.ownerFiles.length" class="mt-4">
      <h3 class="text-lg font-semibold mb-2 text-white">Files for {{ ownerStore.selectedOwner.ownerName }}:</h3>
      <table class="min-w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 border text-white">File URL</th>
            <th class="px-4 py-2 border text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in ownerStore.ownerFiles" :key="file">
            <td class="px-4 py-2 border text-white">{{ file.split('/').pop() }}</td>
            <td class="px-4 py-2 border text-white">
              <a :href="`https://file-upload-worker.slvjordan2626.workers.dev/${file.split('/').pop()}`" target="_blank" class="text-blue-600 underline">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useOwnerStore } from '../stores/useOwnerStore';

const ownerStore = useOwnerStore();


onMounted (() => {
  ownerStore.fetchOwners();
});

</script>
