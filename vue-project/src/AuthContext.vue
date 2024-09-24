<template>
    <slot></slot> <!-- Renders child components -->
</template>

<script>
import { useAuthProvider } from './AuthConext';

export default {
    setup() {
        useAuthProvider();
    },
};
</script>