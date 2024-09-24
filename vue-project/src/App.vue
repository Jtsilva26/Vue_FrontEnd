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
.navbar-logo img {
  width: 300px;
  height: auto;
}

.navbar {
  background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  flex-wrap: nowrap;

}

.navbar-container {
  display: flex;
  justify-content: center;
  height: 80px;
  max-width: 1500px;
  flex-wrap: nowrap;

}

.navbar-logo {
  position: absolute;
  left: 20px;
  top: 15%;
  left: 1%;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.fa-typo3 {
  margin-left: 0.5rem;
  font-size: 1.8rem;
}

.nav-menu {
  display: flex;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  list-style: none;
  text-align: center;
  width: 60vw;
  justify-content: end;
  margin-right: 2rem;
  flex-wrap: nowrap;

}

.nav-item {
  height: 80px;
}

.nav-links {
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
}

.nav-links.disabled {
  color: gray;
  cursor: not-allowed;
}

.nav-links:hover {
  border-bottom: 4px solid #fff;
  transition: all 0.2s ease-out;
}

.fa-bars {
  color: #fff;
}

.nav-links-mobile {
  display: none;
}

.menu-icon {
  display: none;
}

@media screen and (max-width: 960px) {
  .NavbarItems {
    position: relative;
  }

  .nav-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: -100%;
    opacity: 1;
    transition: all 0.5s ease;
    flex-wrap: nowrap;

  }

  .nav-menu.active {
    background: #242222;
    left: 0;
    height: auto;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 1;
  }

  .nav-links {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
  }

  .nav-links:hover {
    background-color: #fff;
    color: #242424;
    border-radius: 0;
  }

  .navbar-logo {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(25%, 50%);
  }

  .menu-icon {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    flex-wrap: nowrap;

  }

  .fa-times {
    color: #fff;
    font-size: 2rem;
  }

  .nav-links-mobile {
    display: block;
    text-align: center;
    margin: 2rem auto;
    border-radius: 4px;
    width: 80%;
    text-decoration: none;
    font-size: 1.5rem;
    background-color: transparent;
    color: #fff;
    padding: 14px 20px;
    border: 1px solid #fff;
    transition: all 0.3s ease-out;
  }

  .nav-links-mobile:hover {
    background: #fff;
    color: #242424;
    transition: 250ms;
  }
}
</style>
