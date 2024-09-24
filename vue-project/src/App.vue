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

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="navbar-logo" @click="closeMobileMenu">
        PHOENIX CAPITAL GROUP <i class="navbar-logo-icon"></i>
      </RouterLink>
      
      <div class="menu-icon" @click="handleClick">
        <i :class="click ? 'fas fa-times' : 'fas fa-bars'"></i>
      </div>
      
      <ul :class="click ? 'nav-menu active' : 'nav-menu'">
        <li class="nav-item">
          <RouterLink to="/" class="nav-links" @click="closeMobileMenu">Home</RouterLink>
        </li>

        <!-- Conditional rendering based on user authentication -->
        <li class="nav-item">
          <RouterLink v-if="user" to="/services" class="nav-links" @click="closeMobileMenu">Services</RouterLink>
          <span v-else class="nav-links disabled" @click="closeMobileMenu">Services (Sign in to access)</span>
        </li>
      </ul>

      <!-- Button for Sign In/Out based on authentication status -->
      <div v-if="buttonVisible">
        <button v-if="user" @click="handleSignOut" class="btn btn--outline">SIGN OUT</button>
        <RouterLink v-else to="/signin">
          <button class="btn btn--outline">SIGN IN</button>
        </RouterLink>
      </div>
    </div>
  </nav>
  
  <!-- Router outlet for nested components -->
  <RouterView />
</template>

<style scoped>
.navbar {
  background: #333;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  max-width: 1500px;
}

.navbar-logo {
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
}

.menu-icon {
  display: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  text-align: center;
}

.nav-item {
  height: 80px;
}

.nav-links {
  color: #fff;
  text-decoration: none;
  padding: 1rem 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-links.disabled {
  color: gray;
  cursor: not-allowed;
}

.btn--outline {
  border: 1px solid #fff;
  background: none;
  color: #fff;
  padding: 10px 22px;
  font-size: 16px;
  cursor: pointer;
}

/* Mobile menu styles */
@media screen and (max-width: 960px) {
  .menu-icon {
    display: block;
    cursor: pointer;
    color: #fff;
  }

  .nav-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: -100%;
    width: 100%;
    height: 90vh;
    background: #333;
    transition: all 0.5s ease;
  }

  .nav-menu.active {
    left: 0;
    transition: all 0.5s ease;
  }

  .nav-links {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
  }
}

</style>
