<template>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center rounded-lg">
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-slate-400 rounded-lg">
            <table class="min-w-full divide-y divide-gray-300 rounded-lg pb-4">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Owner Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Land Holding Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Legal Entity</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Net Mineral Acres</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mineral Owner Royalty (%)</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Section Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Section</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Township</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Range</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title Source</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Link</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="holding in landHoldingsStore.landHoldings" :key="holding._id" class="even:bg-gray-50">
                  <template v-if="editMode[holding._id]">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ landHoldingsStore.owners[holding.ownerId] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.name }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedLandHolding.legalEntity" class="border border-gray-300 rounded px-2 py-1 w-full" type="text"/>
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedLandHolding.netMineralAcres" class="border border-gray-300 rounded px-2 py-1 w-full" type="number" maxlength="3"/>
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedLandHolding.mineralOwnerRoyalty" class="border border-gray-300 rounded px-2 py-1 w-full" type="number" min="0" max="100" step="10" maxlength="3"/>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.sectionName }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedLandHolding.section" class="border border-gray-300 rounded px-2 py-1 w-full" type="text" maxlength="3"/>
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedLandHolding.township" class="border border-gray-300 rounded px-2 py-1 w-full" type="text" maxlength="4"/>
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedLandHolding.range" class="border border-gray-300 rounded px-2 py-1 w-full" type="text" maxlength="4"/>
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <select class="select w-full p-2 border border-gray-300 rounded focus:border-blue-500"
                          v-model="editedLandHolding.titleSource">
                          <option value="Class A">Class A</option>
                          <option value="Class B">Class B</option>
                          <option value="Class C">Class C</option>
                          <option value="Class D">Class D</option>
                        </select>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span v-if="holding.fileUrl && holding.fileUrl.includes('/')">
                          <a :href="`https://file-upload-worker.slvjordan2626.workers.dev/${holding.fileUrl.split('/').pop()}`" target="_blank" class="text-blue-600 hover:underline">Download File</a>
                      </span>
                      <span v-else>No File</span>
                    </td>
                    <td class="relative whitespace-nowrap py-2 pl-1 pr-1 text-right text-sm font-medium sm:pr-1">
                      <button v-if="editMode[holding._id]" @click="saveEdit(holding._id)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 mr-2">Save</button>
                      <button v-if="editMode[holding._id]" @click="cancelEdit(holding._id)" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mr-2">Cancel</button>
                    </td>
                  </template>
                  <template v-else>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ landHoldingsStore.owners[holding.ownerId] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.legalEntity }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.netMineralAcres }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.mineralOwnerRoyalty }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.sectionName }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.section }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.township }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.range }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.titleSource }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span v-if="holding.fileUrl && holding.fileUrl.includes('/')">
                          <a :href="`https://file-upload-worker.slvjordan2626.workers.dev/${holding.fileUrl.split('/').pop()}`" target="_blank" class="text-blue-600 hover:underline">Download File</a>
                      </span>
                      <span v-else>No File</span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <button v-if="!editMode[holding._id]" @click="enterEditMode(holding)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">Edit</button>
                      <button @click="landHoldingsStore.handleDelete(holding._id)"
                              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                              Delete
                          </button>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { useLandHoldingsStore } from '../stores/useLandHoldings';
import { useOwnerStore } from '../stores/useOwnerStore';

const landHoldingsStore = useLandHoldingsStore();
const ownerStore = useOwnerStore();
const editMode = ref({});
const editedLandHolding = ref({});

landHoldingsStore.fetchData();
landHoldingsStore.fetchOwners();

const enterEditMode = (holding) => {
  editMode.value[holding._id] = true;
  editedLandHolding.value = {...holding};
};

const cancelEdit = (holdingId) => {
  editMode.value[holdingId] = false;
  editedLandHolding.value = {};
};

const saveEdit = async (holdingId) => {
  await landHoldingsStore.updateLandHolding(holdingId, editedLandHolding.value);

  editMode.value[holdingId] = false;
  landHoldingsStore.fetchOwners();
  landHoldingsStore.fetchData();
};
</script>
