<template>
    <div class="relative w-screen h-screen flex flex-col justify-center items-center text-center">
        <video src="../../public/videos/mountain1920.mp4" autoplay loop muted
            class="absolute inset-0 w-full h-full object-cover z-[-1]"></video>
        <div class="absolute inset-0 bg-black bg-opacity-20 z-[-1]"></div>
        <h1 class="text-white text-7xl md:text-5xl sm:text-3xl -mt-20 font-bold">
            JOIN OUR TEAM
        </h1>
        <p class="mt-2 text-white text-2xl font-sans sm:text-lg">
            "Together, we'll find solutions"
        </p>
        <div class="mt-8">
            <RouterLink to="/signin">
                <button
                    class="bg-transparent border border-white text-white py-3 px-6 rounded hover:bg-white hover:text-black transition duration-300">
                    GET STARTED</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>

</script>
