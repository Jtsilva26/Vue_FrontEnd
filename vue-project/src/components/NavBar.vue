<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo" @click="closeMobileMenu">
        PHOENIX CAPITAL GROUP <i class="navbar-logo" />
      </router-link>

      <div class="menu-icon" @click="handleClick">
        <i :class="click ? 'fas fa-times' : 'fas fa-bars'" />
      </div>

      <ul :class="click ? 'nav-menu active' : 'nav-menu'">
        <li class="nav-item">
          <router-link to="/" class="nav-links" @click="closeMobileMenu">
            Home
          </router-link>
        </li>
        <li class="nav-item" v-if="user">
          <router-link to="/services" class="nav-links" @click="closeMobileMenu">
            Services
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <span class="nav-links disabled" @click="closeMobileMenu">
            Services (Sign in to access)
          </span>
        </li>
      </ul>

      <div v-if="button">
        <Button
          v-if="user"
          :buttonStyle="'btn--outline'"
          @click="handleSignOut"
        >
          SIGN OUT
        </Button>
        <router-link v-else to="/signin">
          <Button :buttonStyle="'btn--outline'">SIGN IN</Button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Button from './Button.vue'; // Import your Button component
import { useAuth } from '../useAuth'; // Import the authentication logic

export default {
  components: {
    Button,
  },
  setup() {
    const { user, handleSignOut } = useAuth();
    const click = ref(false);
    const button = ref(true);

    const handleClick = () => {
      click.value = !click.value;
    };

    const closeMobileMenu = () => {
      click.value = false;
    };

    const showButton = () => {
      button.value = window.innerWidth > 960;
    };

    onMounted(() => {
      showButton();
      window.addEventListener('resize', showButton);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', showButton);
    });

    return {
      user,
      handleSignOut,
      click,
      button,
      handleClick,
      closeMobileMenu,
    };
  },
};
</script>
