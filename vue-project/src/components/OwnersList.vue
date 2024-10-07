<template>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center rounded-lg">
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-slate-400 rounded-lg">
            <table class="min-w-full divide-y divide-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Owner Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Entity Type</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Owner Type</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Land Holdings</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="owner in ownerStore.owners" :key="owner._id" class="even:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ owner.ownerName }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ owner.entityType }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ owner.ownerType }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ ownerStore.ownerHoldingsCount[owner._id] || 0 }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <button @click="ownerStore.handleDelete(owner._id)"
                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                            Delete
                        </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useOwnerStore } from '../stores/useOwnerStore';
import CreateOwner from '../components/CreateOwners.vue';


const ownerStore = useOwnerStore();

ownerStore.fetchOwners();
ownerStore.fetchHoldingsCounts();

// onMounted(() =>{
//     ownerStore.fetchOwners();
//     ownerStore.fetchData();
// });

</script>
