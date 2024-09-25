<template>
    <div class="relative w-full h-screen flex flex-col justify-center items-center">
        <div class="relative Z-10 text-center">
            <h1 class="text-white text-[100px] -mt-24 sm:text-[70px] md:text=[50px]">
                JOIN OUR TEAM
            </h1>
            <p class="mt-2 text-white text-2x1 font-sans sm:text-x1">
                "Together, we'll find solutions"
            </p>
            <div class="video-btns mt-8">
                <button
                    class="bg-transparent border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black transition duration-300">
                    GET STARTED
                </button>
            </div>
        </div>
        <video src="../../public/videos/mountain.mp4" autoplay loop muted
            class="absolute top-0 left-0 w-full h-full object-cover z-0"></video>
    </div>
</template>

<script>
export default {
    name: "VideoSection",
};
</script>
