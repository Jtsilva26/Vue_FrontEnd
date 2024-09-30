<template>
  <div class="owner-page">
    
    <div>
        <label for="owner-select">Select Owner:</label>
        <select v-model="selectedOwner" id="owner-select">
            <option v-for="owner in owners" :key="owner._id">{owner.name}</option>
        </select>
    </div>

    <input type="file" @change="handleFileUpload"/>

    <button @click="uploadFile">
        Upload File to Owner
    </button>
    <div v-if="fileUrl">
        <p>
            File Uploads:
            <a href="fileUrl" target="_blank">{{ fileUrl }}
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
        owners.value = await collection.find({}).toArray();
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

        const response = await('https://owner-uploads.workers.dev', {
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
