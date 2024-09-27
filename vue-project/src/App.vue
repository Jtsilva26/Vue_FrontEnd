<template>
  <nav class="bg-gray-900 fixed top-0 left-0 w-full z-50 h-20">
    <div class="flex justify-between items-center h-full w-full max-w-screen-xl mx-auto px-4">
      <RouterLink to="/" class="text-white text-2xl font-bold flex items-center" @click="closeMobileMenu">
        PHOENIX CAPITAL GROUP <i class="ml-2"></i>
      </RouterLink>

      <div class="block md:hidden" @click="handleClick">
        <i :class="click ? 'fas fa-times text-white' : 'fas fa-bars text-white'"></i>
      </div>

      <ul
        :class="click ? 'flex flex-col items-center absolute top-20 left-0 w-full h-screen bg-gray-900 transition-all duration-500 ease-in-out' : 'hidden md:flex md:items-center'">
        <li class="h-20">
          <RouterLink to="/" class="text-white py-5 px-8" @click="closeMobileMenu">Home</RouterLink>
        </li>
        <li class="h-20">
          <RouterLink v-if="user" to="/services" class="text-white py-5 px-8" @click="closeMobileMenu">Services
          </RouterLink>
          <span v-else class="text-gray-500 py-5 px-8 cursor-not-allowed">Services (Sign in to access)</span>
        </li>
      </ul>

      <div v-if="buttonVisible" class="hidden md:block">
        <button v-if="user" @click="handleSignOut"
          class="border border-white text-white py-2 px-6 hover:bg-white hover:text-black transition duration-300">SIGN
          OUT</button>
        <RouterLink v-else to="/signin">
          <button
            class="border border-white text-white py-2 px-6 hover:bg-white hover:text-black transition duration-300">SIGN
            IN</button>
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuth } from './AuthContext'; // Assuming AuthContext handles authentication

// State for mobile menu and button visibility
const click = ref(false);
const buttonVisible = ref(true);

// Auth state
const { user, handleSignOut } = useAuth();

// Toggle mobile menu visibility
const handleClick = () => {
  click.value = !click.value;
};

// Close mobile menu when a link is clicked
const closeMobileMenu = () => {
  click.value = false;
};

// Show or hide button based on screen size
const showButton = () => {
  if (window.innerWidth <= 960) {
    buttonVisible.value = false;
  } else {
    buttonVisible.value = true;
  }
};

// Add event listeners to handle window resize
onMounted(() => {
  showButton();
  window.addEventListener('resize', showButton);
});

</script>
