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
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Legal Entity</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Net Mineral Acres</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mineral Owner Royalty (%)</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Section</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Township</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Range</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Link</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="holding in landHoldingsStore.landHoldings" :key="holding._id" class="even:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ landHoldingsStore.owners[holding.ownerId] }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.legalEntity }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.netMineralAcres }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.mineralOwnerRoyalty }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.section }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.township }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ holding.range }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="holding.fileUrl && holding.fileUrl.includes('/')">
                        <a :href="holding.fileUrl" target="_blank" class="text-blue-600 hover:underline">Download File</a>
                    </span>
                    <span v-else>No File</span>
                  </td>
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
import { onMounted } from 'vue';
import { useLandHoldingsStore } from '../stores/useLandHoldings';

const landHoldingsStore = useLandHoldingsStore();

landHoldingsStore.fetchData();

onMounted(() => {
    landHoldingsStore.fetchOwners();
    landHoldingsStore.fetchData();


})
</script>
