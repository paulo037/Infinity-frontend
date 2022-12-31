<template>
    <div>
        <h2 class="primary--text ml-10 d-inline-block" align="start">
            {{ label }}
        </h2>
        <div>
            <v-sheet color="secondary">
                <v-slide-group
                    show-arrows="desktop"
                    v-if="!$fetchState.pending"
                >
                    <v-slide-item
                        v-for="(product, index) in products"
                        :key="index"
                    >
                        <Product
                            :name="product.name"
                            :rating="parseFloat(product.rating)"
                            :price="parseFloat(product.price)"
                            :sold="parseInt(product.sold)"
                            :image="product.image"
                            :id="product.id"
                        />
                    </v-slide-item>
                </v-slide-group>
                <v-slide-group show-arrows="desktop" v-if="$fetchState.pending">
                    <v-slide-item v-for="n in 10" :key="n">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-card
                                    tag="span"
                                    class="d-inline-block my-5 mx-2 pa-3"
                                    height="450px"
                                    outlined
                                    :elevation="hover ? 2 : 0"
                                >
                                    <v-skeleton-loader
                                        width="260px"
                                        type=" image, list-item-three-line, list-item"
                                    ></v-skeleton-loader>
                                </v-card>
                            </template>
                        </v-hover>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </div>
    </div>
</template>

<script>
import Product from "./Product.vue";
export default {
    components: {
        Product,
    },
    data() {
        return {
            products: [],
            loading: true,
        };
    },

    props: {
        name: String,
        label: String,
    },

    async fetch() {
        this.products = await this.$axios
            .$get(`product/category/${this.name}`)
           .catch((e) => this.$toasted({ text: e.response.data ?  e.response.data : "Ocorreu um erro inesperado!"}));

        this.loading = false;
    },
};
</script>

<style>
.v-slide-group__content {
    display: flex;
    justify-content: center !important;
}
</style>