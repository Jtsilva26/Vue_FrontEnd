<template>
  <div class="max-w-4xl mx-auto my-56 p-6 bg-slate-300 rounded-lg shadow-lg">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4 text-center">About Us</h1>
    <p class="text-gray-700 mb-4">
      Welcome to our company! We are a newly established firm dedicated to revolutionizing land holding investments.
      As an owner, you have the unique opportunity to invest in valuable land holdings, creating a sustainable
      future for yourself and your community.
    </p>
    <p class="text-gray-700 mb-4">
      Joining us means becoming a part of a visionary team focused on providing innovative solutions in the real
      estate sector. We believe that investing in land is not just a financial decision; it’s a commitment to
      nurturing growth and building a legacy.
    </p>
    <p class="text-gray-700 mb-4">
      Our company is built on principles of transparency, integrity, and collaboration. We work closely with our
      owners to ensure that every investment aligns with their goals and aspirations. Together, we can unlock
      the potential of land holdings and create opportunities for all stakeholders involved.
    </p>
    <p class="text-gray-700 mb-4">
      Whether you're an experienced investor or new to the world of land holdings, our team is here to guide you
      every step of the way. Join us today, and let's embark on this exciting journey together!
    </p>
    <p class="text-center mt-6">
      <RouterLink to="/signin"
        class="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg px-4 py-2 transition duration-300">
        Join Us Now
      </RouterLink>
    </p>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
