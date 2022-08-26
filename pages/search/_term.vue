<template>
    <div class="d-flex justify-center" style="height: 100%">
        <div
            align="center"
            v-if="!($fetchState.pending || loading) && products.length == 0"
        >
            <v-card
                align="center"
                max-width="500px"
                class="secondary mx-8 pa-8 justify-center"
                elevation="5"
            >
                <span class="primary--text text-h6">
                    Nenhum resultado para "{{ term }}"
                </span>
                <div>
                    <br />
                    <v-icon class="mdi-48px primary--text"
                        >mdi-emoticon-cry</v-icon
                    >
                </div>
                <br />
                <nuxt-link to="/">Ir à página pricipal.</nuxt-link>
            </v-card>
        </div>

        <v-row class="d-flex justify-center" v-else>
            <v-col
                cols="10"
                md="3"
                class="d-flex align-start flex-column"
                v-if="!this.$route.query.category"
            >
                <h3 class="primary--text text-center align-self-center py-2">
                    Filtrar por categoria
                </h3>
                <div class="align-self-center">
                    <v-select
                        :items="categories"
                        item-text="category"
                        item-value="id"
                        placeholder="Categoria"
                        dense
                        outlined
                        v-model="select"
                        style="width: 250px"
                    >
                    </v-select>
                </div>
            </v-col>
            <v-col cols="10" md="9" class="">
                <list-product-no-slide
                    :term="term"
                    :category="parseInt(category)"
                    :products="productsWithFilter"
                    :loading="$fetchState.pending || loading"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ListProductNoSlide from "@/components/product/ListProductNoSlide.vue";

export default {
    components: {
        ListProductNoSlide,
    },
    data() {
        return {
            categories: [],
            select: null,
            products: [],
            loading: false,
        };
    },

    async fetch() {
        await this.searchTerm();
    },

    computed: {
        category() {
            return this.$route.query.category;
        },
        term() {
            return this.$route.query.term;
        },

        productsWithFilter() {
            if (this.select == null) {
                return this.products;
            }

            let products = [];

            this.products.forEach((p) => {
                p.categories.forEach((c) => {
                    if (c.id == this.select) {
                        products.push(p);
                    }
                });
            });

            return products;
        },
    },

    methods: {
        async searchTerm() {
            this.products = [];
            if (this.term) {
                this.loading = true;
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

                this.categories = categories;
                this.loading = false;

                return;
            }

            if (this.category) {
                this.loading = true;

                this.products = await this.$axios.$get(
                    `product/category/${this.category}`
                );
                this.loading = false;
            }
        },
    },
    watch: {
        $route() {
            this.searchTerm();
        },
    },
};
</script>

<style>
</style>