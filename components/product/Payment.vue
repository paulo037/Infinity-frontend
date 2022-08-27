<template>
    <div class="text-center">
        <v-dialog persistent max-width="60%" v-model="dialog">
            <iframe
                height="500px"
                target="_self"
                src="https://sandbox.mercadopago.com.br/checkout/v1/modal?pref_id=661619804-69a1f2da-86ea-4929-b48b-2cd3ff6c37b2"
            >

           
            </iframe>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
    },

    watch: {
        dialog() {
            // window.open("https://www.codexworld.com/", "_self");
        },
    },

    data() {
        return {
            link: null,
        };
    },
};
</script>

<style>
</style>