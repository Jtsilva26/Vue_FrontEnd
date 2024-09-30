<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../public/images/logo.png" class="h-8" alt="PCG Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Phoenix Capital Group</span>
      </RouterLink>

      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button v-if="authStore.user.value" @click="authStore.handleSignOut" type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          SIGN OUT
        </button>
        <RouterLink v-else to="/signin">
          <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            SIGN IN
          </button>
        </RouterLink>
      </div>

      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        :class="click ? 'flex' : 'hidden'" id="navbar-sticky">
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <RouterLink to="/"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/about"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
              About
            </RouterLink>
          </li>
          <li>
            <RouterLink v-if="authStore.user.value" to="/services"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
              Services
            </RouterLink>
            <span v-else
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 cursor-not-allowed">Services
              (Sign in to access)</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuth } from './AuthContext';

//const { authStore.user.value, authStore.handleSignOut } = useAuth();

const authStore = useAuth();

const click = ref(false);
const buttonVisible = ref(true);

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
