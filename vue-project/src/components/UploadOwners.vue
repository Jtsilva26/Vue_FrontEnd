<template>
  <div class="p-6">
    <div class="mb-4">
        <label for="owner-select" class="block text-lg mb-2">Select Owner:</label>
        <select v-model="selectedOwner" id="owner-select" class="w-full p-2 border rounded">
            <option v-for="owner in owners" :key="owner._id" :value="owner">{{ owner.ownerName }}</option>
        </select>
    </div>

    <input type="file" @change="handleFileUpload" class="mb-4 p-2 border rounded w-full"/>

    <button @click="uploadFile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Upload File to Owner
    </button>
    <div v-if="fileUrl" class="mt-4">
        <p class="text-green-500">
            File Uploads:
            <a href="fileUrl" target="_blank" class="underline text-blue-600">{{ fileUrl }}
            </a>
        </p>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import app from "../RealmApp"

const owners = ref([]);
const selectedOwner = ref(null);
const file = ref(null);
const fileUrl = ref('');

onMounted(async () => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");
    
    try{
        owners.value = await collection.find({});
    }catch(error){
        console.error('Error fetching owners:', error);
    }
});

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

const uploadFile = async () => {
    if(!selectedOwner.value){
        alert('Please select an owner.');
        return;
    }
    if(!file.value){
        alert('Please upload a file.');
        return;
    }

    try{
        const formData = new FormData();
        formData.append('file', file.value);

        const response = await('https://file-upload-worker.slvjordan2626.workers.dev', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if(response.ok){
            fileUrl.value = data.fileUrl;

            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("Owners");

            const updateResult = await collection.updateOne(
                { _id: selectedOwner.value._id },
                { $set: { fileUrl: fileUrl.value }}
            );

            if(updateResult.modifiedCount > 0){
                alert('File uploaded and owner updated successfully!');
            }else{
                throw new Error('Failed to update owner');
            }
        }else{
            throw new Error(data.message || 'Failed to upload file');
        }
    }catch(error){
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
    }
};

</script>
