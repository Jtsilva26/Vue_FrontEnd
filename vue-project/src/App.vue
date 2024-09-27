<template>
<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <RouterLink to="/" class="text-white text-2xl font-bold" @click="closeMobileMenu">
        PHOENIX CAPITAL GROUP
      </RouterLink>

      <!-- Mobile Menu Icon -->
      <div class="md:hidden" @click="handleClick">
        <i :class="click ? 'fas fa-times text-white' : 'fas fa-bars text-white'"></i>
      </div>

      <!-- Menu Items -->
      <ul
        :class="click ? 'flex flex-col items-center absolute top-20 left-0 w-full bg-gray-900 md:flex md:flex-row md:static md:w-auto' : 'hidden md:flex md:flex-row'">
        <li class="md:mx-4 my-2 md:my-0">
          <RouterLink to="/" class="text-white" @click="closeMobileMenu">Home</RouterLink>
        </li>
        <li class="md:mx-4 my-2 md:my-0">
          <RouterLink v-if="user" to="/services" class="text-white" @click="closeMobileMenu">Services</RouterLink>
          <span v-else class="text-gray-500 cursor-not-allowed">Services (Sign in to access)</span>
        </li>
      </ul>

      <!-- Sign In/Out Button -->
      <div v-if="buttonVisible" class="hidden md:block">
        <button v-if="user" @click="handleSignOut" class="border border-white text-white py-2 px-6 hover:bg-white hover:text-gray-900 transition duration-300">
          SIGN OUT
        </button>
        <RouterLink v-else to="/signin">
          <button class="border border-white text-white py-2 px-6 hover:bg-white hover:text-gray-900 transition duration-300">
            SIGN IN
          </button>
        </RouterLink>
      </div>
    </div>
  </nav>

  <!-- Router View -->
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
