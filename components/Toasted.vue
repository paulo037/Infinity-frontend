<template>
    <v-snackbar
        v-model="show"
        class="my-16"
        :timeout="timeout"
        :color="color || 'error'"
        top
    >
        <span class="d-flex align-center justify-center">
            <span>
                {{ text }}
            </span>
        </span>
        <span style="position: absolute; top: -1px; right: 0px">
            <v-icon small @click="show=false">mdi-close</v-icon>
        </span>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },

    props: {
        text: String,
        snackbar: Boolean,
        color: String,
    },

    fetch() {
        this.show = this.snackbar;
    },

    computed: {
        timeout() {
            let time = typeof this.text == 'string'? this.text.split(" ").length * 250 : 2000;
            time = time < 2000 ? 2000 : time;
            time = time > 10000 ? 10000 : time;
            return time;
        },
    },

    watch: {
        snackbar() {
            if (this.snackbar) {
                this.show = true;
            }
        },

        show() {
            if (!this.show) {
                this.$store.commit("setSnackBar", false);
            }
        },
    },
};
</script>

<style>
</style>