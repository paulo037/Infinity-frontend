<template>
    <div class="text-center">
        <v-dialog persistent>
            <iframe height="812px" id="iFrame" :src="link">
                <div>sair</div>
            </iframe>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
        src: String,
    },

    watch: {
        dialog() {
            // window.open = function (url, name, features, replace) {
            //     this.$el.querySelector("#k").src = url;
            // };

            this.$el.querySelector("#k").src =
                "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=661619804-80850242-2f20-4c57-9ff7-941503af326d";
            console.log(this.$el.querySelector("#k"));
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