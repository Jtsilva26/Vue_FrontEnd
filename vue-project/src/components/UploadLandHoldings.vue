<template>
  <div class="p-6">
    <div class="mb-4">
      <label for="landholding-select" class="block text-lg mb-2">Select Land Holding:</label>
      <select v-model="selectedLandHolding" id="landholding-select" class="w-full p-2 border rounded">
        <option v-for="landholding in landHoldings" :key="landholding._id" :value="landholding">{{ landholding.name }}</option>
      </select>
    </div>

    <input type="file" @change="handleFileUpload" class="mb-4 p-2 border rounded w-full"/>

    <button @click="uploadFile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Upload File to Land Holding
    </button>

    <div v-if="fileUrl" class="mt-4">
      <p class="text-green-500">
        File Uploads:
        <a :href="fileUrl" target="_blank" class="underline text-blue-600">{{ fileUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import app from "../RealmApp";
import { BSON } from 'realm-web';

const landHoldings = ref([]);
const selectedLandHolding = ref(null);
const file = ref(null);
const fileUrl = ref('');

// Fetch Land Holdings when component mounts
onMounted(async () => {
  const mongo = app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("Owners_DB").collection("LandHoldings");

  try {
    landHoldings.value = await collection.find({});
  } catch (error) {
    console.error('Error fetching land holdings:', error);
  }
});

// Handle file selection
const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

// Upload file to Cloudflare and MongoDB
const uploadFile = async () => {
  if (!selectedLandHolding.value) {
    alert('Please select a land holding.');
    return;
  }
  if (!file.value) {
    alert('Please upload a file.');
    return;
  }

  try {
    // Prepare the file for upload
    const formData = new FormData();
    formData.append('file', file.value);

    // Send file to Cloudflare Worker
    const response = await fetch('https://file-upload-worker.slvjordan2626.workers.dev', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      fileUrl.value = data.fileUrl;

      // Get MongoDB client
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");
      const filesCollection = mongo.db("Owners_DB").collection("Files");

      try {
        // Update the Land Holding with the fileUrl
        const updateResult = await landHoldingsCollection.updateOne(
          { _id: new BSON.ObjectId(selectedLandHolding.value._id) },
          { $set: { fileUrl: fileUrl.value } }
        );

        if (updateResult.modifiedCount === 0) {
          throw new Error("Land Holding not found");
        }

        // Insert the file into the File collection
        const fileDocument = {
          ownerId: new BSON.ObjectId(selectedLandHolding.value.ownerId),
          fileUrl: fileUrl.value,
          uploadDate: new Date(),
        };

        await filesCollection.insertOne(fileDocument);

        alert("Land Holding updated and file uploaded successfully");

      } catch (error) {
        console.error('Error processing MongoDB operations:', error);
        alert('Failed to update Land Holding or insert file');
      }

    } else {
      throw new Error(data.message || 'Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Failed to upload file');
  }
};

</script>
