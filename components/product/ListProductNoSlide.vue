<template>
    <v-container class="pa-0">
        <v-row>
            <h2 class="primary--text ml-2 d-inline-block" align="start">
                {{ products.length }}
                <span v-if="term">
                    Resultado(s) para : "{{
                        term.length > 20 ? term.substring(0, 20) + "..." : term
                    }}"
                </span>

                <span v-else>
                    Resultado (s) para categoria: "{{
                        products.length > 0 ? products[0].category : ""
                    }}"
                </span>
            </h2>
        </v-row>
        <v-row class="ma-0" justify="center" justify-md="start">
            <v-col
                class="ma-0 pa-0 d-flex flex-grow-0"
                v-for="(product, index) in productsByCatgory"
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
            </v-col>

            <v-col class="ma-0 pa-0 d-flex flex-grow-0" v-for="n in 3" :key="n">
                <SkeletonProduct v-if="$fetchState.pending" />
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-pagination
                v-if="products.length > 0"
                v-model="page"
                :length="qtdpage"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
            ></v-pagination>
        </v-row>
    </v-container>
</template>

<script>
import Product from "./Product.vue";
import SkeletonProduct from "~/components/product/SkeletonProduct.vue";
import { mapMutations } from "vuex";
export default {
    components: {
        Product,
        SkeletonProduct,
    },
    data() {
        return {
            products: [],
            select: this.$store.state.search.select,
            page: 1,
            qtdpage: 1,
            productPerPage: 21,
        };
    },

    props: {
        term: String,
        category: Number,
    },

    async fetch() {
        this.searchTerm();
    },
    methods: {
        ...mapMutations({
            setCategories: "search/setCategories",
            setCategory: "search/setCategory",
        }),

        async searchTerm() {
            this.setCategory(null);
            if (this.term) {
                this.products = await this.$axios.$get(
                    `product/search/${this.term}`
                );
                let categories = [];

                this.products.forEach(async (p) => {
                    p.categories.forEach((c) => {
                        if (categories.indexOf(c) == -1) {
                            categories.push(c);
                        }
                    });
                });
                this.setCategories(categories);
            } else if (this.category) {
                this.products = await this.$axios.$get(
                    `product/category/${this.category}`
                );
            }
        },
    },

    computed: {
        productsByCatgory() {
            if (this.$store.state.search.select == null) {
                this.qtdpage = Math.ceil(
                    this.products.length / this.productPerPage
                );
                const start = (this.page - 1) * this.productPerPage;

                return this.products.slice(start, start + this.productPerPage);
            }
            let products = [];
            this.products.forEach((p) => {
                p.categories.forEach((c) => {
                    console.log(c);
                    if (c.id == this.$store.state.search.select) {
                        products.push(p);
                    }
                });
            });
            this.qtdpage = Math.ceil(products.length / this.productPerPage);
            const start = (this.page - 1) * this.productPerPage;
            return products.slice(start, start + this.productPerPage);
        },
    },
    watch: {
        term() {
            this.searchTerm();
        },
    },
};
</script>

<style>
</style>