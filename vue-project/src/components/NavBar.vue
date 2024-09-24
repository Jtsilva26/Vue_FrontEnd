<template>
    <nav class="navbar">
        <div class="navbar-container">
            <router-link to="/" class="navbar-logo" @click="closeMobileMenu">
                PHEONIX CAPITAL GROUP <i class="navbar-logo" />
            </router-link>

            <div class="menu-icon" @click="handleClick">
                <i :class="click ? 'fas fa-times' : 'fas fa-bars'" />
            </div>

        </div>
    </nav>
</template>