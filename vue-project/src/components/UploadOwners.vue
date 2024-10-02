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

    <button @click="toggleOrder" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4">
      {{ isAscending ? 'Sort Z-A' : 'Sort A-Z' }}
    </button>

    <div class="mt-6">
      <h2 class="text-xl font-bold mb-2">List of Files:</h2>
      <div v-for="file in fileList" :key="file.fileUrl" class="mb-2 border p-2 rounded">
        <p><strong>File URL:</strong> <a :href="file.fileUrl" target="_blank">{{ file.fileUrl }}</a></p>
        <p><strong>Owner:</strong> {{ file.ownerName }}</p>
        <p><strong>Land Holding:</strong> {{ file.landHoldingName || 'N/A' }}</p>
      </div>
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
const fileList = ref([]);
const isAscending = ref(true);

onMounted(async () => {
  const mongo = app.currentUser.mongoClient("mongodb-atlas");
  const ownersCollection = mongo.db("Owners_DB").collection("Owners");
  const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");
  const filesCollection = mongo.db("Owners_DB").collection("Files");

  try {
    owners.value = await ownersCollection.find({});
    sortOwners();

    const files = await filesCollection.find({});
    const ownerMap = {};
    const landHoldingMap = {};

    owners.value.forEach(owner => {
      ownerMap[owner._id.toString()] = owner.ownerName;
    });

    const landHoldings = await landHoldingsCollection.find({});
    landHoldings.forEach(landHolding => {
      landHoldingMap[landHolding._id.toString()] = landHolding.name;
    });

    fileList.value = files.map(file => ({
      fileUrl: file.fileUrl,
      ownerName: ownerMap[file.ownerId.toString()],
      landHoldingName: landHoldingMap[file.landHoldingId?.toString()] || null,
    }));

  } catch (error) {
    console.error('Error fetching data:', error);
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

    const response = await fetch('https://file-upload-worker.slvjordan2626.workers.dev', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      fileUrl.value = data.fileUrl;

      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const ownersCollection = mongo.db("Owners_DB").collection("Owners");
      const filesCollection = mongo.db("Owners_DB").collection("Files");

      try {
        const updateResult = await ownersCollection.updateOne(
          { _id: new BSON.ObjectId(selectedOwner.value._id) },
          { $addToSet: { fileUrl: fileUrl.value } }
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

        fileList.value.push({
          fileUrl: fileUrl.value,
          ownerName: selectedOwner.value.ownerName,
          landHoldingName: null,
        });

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

const toggleOrder = () => {
  isAscending.value = !isAscending.value;
  sortOwners();
};

const sortOwners = () => {
  owners.value.sort((a, b) => {
    const nameA = a.ownerName.toUpperCase();
    const nameB = b.ownerName.toUpperCase();

    if (isAscending.value) {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });
};
</script>


