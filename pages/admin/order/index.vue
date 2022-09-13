<template>
    <div>
        <v-data-table
            :items="orders"
            :headers="headers"
            :items-per-page="limit"
            hide-default-footer
            class="mt-5"
        >
            <template #[`item.status`]="{ item }">
                {{ status[item.status + 1] }} {{ item.status }}
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
            </template>

            <template #[`item.price`]="{ item }">
                {{ formatMoney(item.price) }}
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
                {
                    text: " Id Usuario",
                    align: "start",
                    value: "user_id",
                },
                { text: "Preço", value: "price", sortable: true },
                { text: "Data", value: "date" },
                { text: "Cidade", value: "city" },
                { text: "Status", value: "status" },
                {
                    text: "Ações",
                    value: "actions",
                    sortable: false,
                    align: "right",
                },
            ],
            status: [
                "Pagamento recusado",
                "Pagamento pendente",
                "Pagamento confirmado",
                "Pedido enviado",
                "Pedido entregue",
            ],
            orders: [],
        };
    },
    async fetch() {
        this.orders = await this.$axios.$get("order");
    },

    methods: {
        formatMoney(value) {
            return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
        },
    },
};
</script>

<style>
</style>