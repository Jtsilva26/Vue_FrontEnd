<template>
  <div class="p-6">
    <!-- Owner selection -->
    <div class="mb-4">
      <label for="owner-select" class="block text-lg mb-2">Select Owner:</label>
      <select v-model="selectedOwner" @change="fetchOwnerFiles" id="owner-select" class="w-full p-2 border rounded">
        <option v-for="owner in owners" :key="owner._id" :value="owner">{{ owner.ownerName }}</option>
      </select>
    </div>

    <!-- File upload -->
    <input type="file" @change="handleFileUpload" class="mb-4 p-2 border rounded w-full"/>

    <button @click="uploadFile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Upload File to Owner
    </button>

    <!-- Show file upload URL -->
    <div v-if="fileUrl" class="mt-4">
      <p class="text-green-500">
        File Uploaded:
        <a :href="fileUrl" target="_blank" class="underline text-blue-600">{{ fileUrl.split('/').pop() }}</a>
      </p>
    </div>

    <!-- Table for listing all files of the selected owner -->
    <div v-if="ownerFiles.length" class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Files for {{ selectedOwner.ownerName }}:</h3>
      <table class="min-w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 border">File URL</th>
            <th class="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in ownerFiles" :key="file">
            <td class="px-4 py-2 border">{{ file.split('/').pop() }}</td>
            <td class="px-4 py-2 border">
              <a :href="`https://file-upload-worker.slvjordan2626.workers.dev/${file.split('/').pop()}`" target="_blank" class="text-blue-600 underline">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
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
const ownerFiles = ref([]);

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

const fetchOwnerFiles = () => {
  if (selectedOwner.value && selectedOwner.value.fileUrl) {
    ownerFiles.value = selectedOwner.value.fileUrl;
  } else {
    ownerFiles.value = []; // Clear if no files
  }
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

        // Sending file to cloudflare worker
        const response = await fetch('https://file-upload-worker.slvjordan2626.workers.dev', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            fileUrl.value = data.fileUrl;

            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const ownersCollection = mongo.db("Owners_DB").collection("Owners");

            try {
                // Update the owner's fileUrl array
                const updateResult = await ownersCollection.updateOne(
                    { _id: new BSON.ObjectId(selectedOwner.value._id) },
                    { $addToSet: { fileUrl: fileUrl.value } }
                );

                if (updateResult.modifiedCount === 0) {
                    throw new Error("Owner not found");
                }
                // Refresh the file list for the owner
                await fetchOwnerFiles();

                alert("Owner updated and file uploaded successfully");

            } catch (error) {
                console.error('Error processing MongoDB operations:', error);
                alert('Failed to update owner or insert file');
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
