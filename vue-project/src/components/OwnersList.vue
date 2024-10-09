<template>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center rounded-lg">
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-slate-400 rounded-lg">
            <table class="min-w-full divide-y divide-gray-300 rounded-lg pb-4">
              <thead>
                <tr class="h-20">
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Owner Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Entity Type</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Owner Type</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Land Holdings</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="owner in ownerStore.owners" :key="owner._id" class="h-20">
                  <template v-if="editMode[owner._id]">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 max-w-8">
                      <input v-model="editedOwner.ownerName" class="border border-gray-300 rounded px-2 py-1 w-full" type="text"/>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-8">
                      <select class="select w-full p-2 border border-gray-300 rounded focus:border-blue-500"
                          v-model="editedOwner.entityType">
                          <option value="Company">Company</option>
                          <option value="Individual">Individual</option>
                          <option value="Investor">Investor</option>
                          <option value="Trust">Trust</option>
                      </select>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-8">
                      <select class="select w-full p-2 border border-gray-300 rounded focus:border-blue-500"
                          v-model="editedOwner.ownerType">
                          <option value="Competitor">Competitor</option>
                          <option value="Seller">Seller</option>
                          <option value="Investor">Investor</option>
                          <option value="Professional">Professional</option>
                      </select>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-8">
                      <input v-model="editedOwner.address" class="border border-gray-300 rounded px-2 py-1 w-full" type="text"/>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ ownerStore.ownerHoldingsCount[owner._id] || 0 }}</td>
                    <td class="relative whitespace-nowrap py-2 pl-1 pr-1 text-right text-sm font-medium sm:pr-1">
                      <button v-if="editMode[owner._id]" @click="saveEdit(owner._id)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 mr-2">Save</button>
                      <button v-if="editMode[owner._id]" @click="cancelEdit(owner._id)" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mr-2">Cancel</button>
                    </td>
                  </template>
                  <template v-else>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ owner.ownerName }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ owner.entityType }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ owner.ownerType }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ owner.address }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ ownerStore.ownerHoldingsCount[owner._id] || 0 }}</td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <button v-if="!editMode[owner._id]" @click="enterEditMode(owner)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">Edit</button>
                      <button @click="ownerStore.handleDelete(owner._id)"
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
import { useOwnerStore } from '../stores/useOwnerStore';


const ownerStore = useOwnerStore();
const editMode = ref({});
const editedOwner = ref({});

ownerStore.fetchOwners();
ownerStore.fetchHoldingsCounts();

const enterEditMode = (owner) => {
  editMode.value[owner._id] = true;
  editedOwner.value = {};
};

const cancelEdit = (ownerId) => {
  editMode.value[ownerId] = false;
  editedOwner.value = {};
};

const saveEdit = async (ownerId) => {
  await ownerStore.updateOwner(ownerId, editedOwner.value);

  editMode.value[ownerId] = false;
  ownerStore.fetchOwners();
};
</script>
