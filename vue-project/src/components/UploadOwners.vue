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
        <a :href="fileUrl" target="_blank" class="underline text-blue-600">{{ fileUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import app from "../RealmApp";
import { BSON } from 'realm-web';

const owners = ref([]);
const selectedOwner = ref(null);
const file = ref(null);
const fileUrl = ref('');

onMounted(async () => {
  const mongo = app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("Owners_DB").collection("Owners");
  
  try {
    owners.value = await collection.find({});
  } catch (error) {
    console.error('Error fetching owners:', error);
  }
});

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedOwner.value) {
    alert('Please select an owner.');
    return;
  }
  if (!file.value) {
    alert('Please upload a file.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', file.value);

    // Remove the Content-Type header
    const response = await fetch('https://file-upload-worker.slvjordan2626.workers.dev', {
      method: 'POST',
      body: formData,
    });

        const textData = await response.text();
        const data = await JSON.parse(textData);
        
        if(response.ok){
            fileUrl.value = data.fileUrl;
            
            const mongodb = context.services.get("mongodb-atlas");
            const ownersCollection = mongodb.db("Owners_DB").collection("Owners");
            const filesCollection = mongodb.db("Owners_DB").collection("File");

      try {
        // Update the owner's fileUrl
        const updateResult = await ownersCollection.updateOne(
          { _id: new BSON.ObjectId(selectedOwner.value._id) },
          { $set: { fileUrl: fileUrl.value } }
        );

        if (updateResult.modifiedCount === 0) {
          throw new Error("Owner not found");
        }

        const fileDocument = {
          ownerId: new BSON.ObjectId(selectedOwner.value._id),
          fileUrl: fileUrl.value,
          uploadDate: new Date(),
        };

        await filesCollection.insertOne(fileDocument);
        alert("Owner updated and file uploaded successfully");

      } catch (error) {
        console.error('Error processing request:', error);
        alert("Internal Server Error");
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

