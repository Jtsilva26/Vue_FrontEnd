<template>
    <div class="services-container flex justify-around items-center p-5">
        <router-link to="/owners"
            class="service-block flex-1 mx-2 p-5 bg-gray-100 text-center border-2 border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 transition duration-300">
            <h2 class="text-xl font-semibold">Owners</h2>
            <p class="mt-2">Create and Manage Owners</p>
        </router-link>
        <router-link to="/land-holdings"
            class="service-block flex-1 mx-2 p-5 bg-gray-100 text-center border-2 border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 transition duration-300">
            <h2 class="text-xl font-semibold">Land Holdings</h2>
            <p class="mt-2">Create and Manage Land Holdings</p>
        </router-link>
    </div>
</template>

<script setup>

</script>