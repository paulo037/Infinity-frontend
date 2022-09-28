<template>
    <div>
        <v-data-table
            :items="products"
            :headers="headers"
            :search="search"
            :items-per-page="limit"
            hide-default-footer
        >
            <template v-slot:top>
                <v-row justify="space-around">
                    <v-col cols="9" sm="5" class="pb-0">
                        <v-text-field
                            v-model="search"
                            dense
                            label="Pesquisar"
                            outlined
                            append-icon="mdi-magnify"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="10" sm="6" md="3" class="pb-10">
                        <v-btn
                            block
                            color="accent"
                            nuxt
                            to="/admin/product/new-product"
                        >
                            Criar novo produto
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </template>
            <template #[`item.actions`]="{ item }">
                <NuxtLink
                    :to="{ name: 'admin-product-id', params: { id: item.id } }"
                    style="text-decoration: none"
                >
                    <v-icon class="mr-2 primary--text" nuxt>
                        mdi-pencil
                    </v-icon>
                </NuxtLink>
                <v-icon @click="dialogFunction(item.id)" class="mr-2 red--text">
                    mdi-delete
                </v-icon>
            </template>

            <template #[`item.price`]="{ item }">
                {{ formatMoney(item.price) }}
            </template>

            <template #[`item.image`]="{ item }">
                <v-img
                    :src="item.image ? item.image : '/noImage.png'"
                    max-width="36px"
                    max-height="36px"
                >
                </v-img>
            </template>
        </v-data-table>
        <v-divider class="mb-10"></v-divider>
        <v-row align="center" justify="center" class="px-5">
            <v-col class="d-flex align-center" cols="12" sm="6" md="5  ">
                <v-pagination
                    v-model="page"
                    :length="Math.ceil(count / limit)"
                    class="mb-5"
                ></v-pagination>
            </v-col>

            <v-col class="d-flex align-right" cols="12" sm="6" md="5">
                <span class="mt-2 pr-2 d-inline-block"
                    >Produtos por página:
                </span>
                <span style="width: 110px" class="d-inline-block">
                    <v-autocomplete
                        solo
                        dense
                        v-model="limit"
                        label="Limite"
                        :items="limits"
                    ></v-autocomplete>
                </span>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-dialog v-model="dialog" max-width="300px">
            <v-card class="pa-2">
                <v-card-title
                    class="text-center"
                    v-html="text"
                    style="white-space: nowrap"
                >
                </v-card-title>

                <v-card-actions class="flex justify-space-between">
                    <v-btn class="red white--text" @click="dialog = false">
                        CANCELAR
                    </v-btn>
                    <v-btn class="green white--text" @click="deleteProduct()">
                        CONFIRMAR
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


 <script>
export default {
    data() {
        return {
            timeout: 3000,
            search: "",
            text: "",
            dialog: false,
            id: null,
            page: 1,
            count: 0,
            limit: 20,
            limits: [5, 10, 20, 50, 100],

            headers: [
                { text: "Imagem", value: "image", sortable: false },
                {
                    text: "Nome",
                    align: "start",
                    value: "name",
                },
                { text: "Preço", value: "price" },
                {
                    text: "Ações",
                    value: "actions",
                    sortable: false,
                    align: "right",
                },
            ],

            products: [],
        };
    },

    async fetch() {
        await this.getProducts();
    },

    methods: {
        async getProducts() {
            const params = new URLSearchParams();
            params.append("limit", this.limit);
            params.append("page", this.page);
            let { products, count } = await this.$axios.$get(`product/`, {
                params,
            });
            this.products = products;
            this.count = parseInt(count.count);
        },
        formatMoney(value) {
            return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
        },

        async deleteProduct() {
            if (!this.id) return;
            this.dialog = false;
            await this.$axios
                .$delete(`product/${this.id}`)
                .catch((e) => {
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Houve um erro ao tentar apagar o produto",
                    });
                    this.id = null;
                })
                .then((e) => {
                    let p = this.products.find(
                        (product) => product.id === this.id
                    );
                    this.products.splice(this.products.indexOf(p), 1);
                    this.id = null;
                });
        },
        dialogFunction(id) {
            this.id = id;
            this.text = `Confirma<wbr> que<wbr> quer<wbr> deletar<wbr> o<wbr> produto ?`;
            this.dialog = true;
        },
    },
    watch: {
        async page() {
            await this.getProducts();
        },
        async limit() {
            await this.getProducts();
            this.page = 1;
        },
    },
};
</script>

<style>
</style>