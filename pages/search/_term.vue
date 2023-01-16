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
                <span class="primary--text text-h6" v-if="category">
                    Nenhum resultado para a categoria "{{ category }}"
                </span>

                <span class="primary--text text-h6" v-else>
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
                class="d-flex align-center pt-16 px-0 flex-column"
                v-if="!this.$route.query.category"
            >
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th
                                    class="
                                        text-left
                                        px-10
                                        primary--text
                                        text-h6
                                    "
                                >
                                    Categorias
                                </th>
                                <th class="text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in categories"
                                :key="index"
                            >
                                <td>{{ item.category }}</td>
                                <td>
                                    <v-checkbox
                                        v-model="selected"
                                        :value="item"
                                    ></v-checkbox>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col cols="10" md="9" class="">
                <ListProductNoSlide
                    :term="term"
                    :category="parseInt(category)"
                    :products="productsWithFilter"
                    :loading="$fetchState.pending || loading"
                    page=""
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>


export default {

    data() {
        return {
            categories: [],
            selected: [],
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
            if (this.selected.length == 0) {
                return this.products;
            }

            let products = [];

            this.products.forEach((p) => {
                let pertence = true;
                this.selected.forEach((c) => {
                    if (
                        !p.categories.find(
                            (category) => c.category == category.category
                        )
                    ) {
                        pertence = false;
                    }
                });

                if (pertence) {
                    products.push(p);
                }
            });

            return products;
        },
    },

    methods: {
        async searchTerm() {
            this.products = [];
            if (this.term) {
                this.loading = true;
                const params = new URLSearchParams();
                params.append("limit", this.limit);
                params.append("page", this.page);

                this.products = await this.$axios
                    .$get(`product/search/${this.term}`)
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    );

                let categories = [];

                this.products.forEach(async (p) => {
                    p.categories.forEach((c) => {
                        if (
                            !categories.find(
                                (category) => c.category == category.category
                            )
                        ) {
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

                this.products = await this.$axios
                    .$get(`product/category/${this.category}`)
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
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