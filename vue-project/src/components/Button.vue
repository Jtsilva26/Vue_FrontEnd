<template>
    <router-link to="/sign-in" class="inline-block">
        <button :class="[buttonStyle === 'btn--primary' ? 'bg-white text-gray-900 border border-white hover:bg-gray-100 hover:text-black'
            : 'bg-transparent text-white border border-white hover:bg-white hover:text-black', buttonSize === 'btn--large' ? 'btn--large' ? 'text-xl py-3 px-6' : 'text-lg py-2 px-4',
            'font-semibold rounded transition-all duration-300']" @click="onClick" :type="type">
            <slot></slot>
        </button>
    </router-link>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default, 'button',
        },
        onClick: {
            type: Function,
            default: null,
        },
        buttonStyle: {
            type: String,
            default: 'btn--medium',
        },
    },
};
</script>