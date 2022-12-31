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
            show: false
        };
    },

    props: {
        text: String,
        snackbar: Boolean,
        color: String,
    },

    computed:{
        timeout(){
            let time = this.text.split(" ").length * 300
            time = time < 2000 ? 2000 : time
            time = time > 10000 ? 10000 : time
            return time 
        }
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