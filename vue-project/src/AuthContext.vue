<template>
    <slot></slot> <!-- Renders child components -->
</template>

<script>
import { useAuth } from './AuthConext';

export default {
    setup() {
        useAuth();
    },
};
</script>