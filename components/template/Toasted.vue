<template>
    <v-snackbar
        v-model="show"
        
        class="my-16"
        :timeout="timeout"
        :color="color || 'error'"
        top
    >
        <span class="d-flex align-center justify-center">
            {{ text }}
        </span>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            timeout: 2000,
            show: false
        };
    },

    props: {
        text: String,
        snackbar: Boolean,
        color: String,
    },


    watch: {
        snackbar(){
            this.show = true
        },
    },
};
</script>

<style>
</style>