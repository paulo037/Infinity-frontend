<template>
    <div>
        <v-data-table
            :items="orders_with_filter"
            :headers="headers"
            :items-per-page="limit"
            hide-default-footer
            class="mt-5"
            :search="search"
        >
            <template v-slot:top>
                <v-row justify="space-around">
                    <v-col cols="9" sm="5" class="pb-0">
                        <v-autocomplete
                            :items="status"
                            class="ma-0 pa-0"
                            outlined
                            dense
                            item-text="text"
                            v-model="status_filter"
                            label="Filtrar por status"
                        >
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </template>
            <template #[`item.status`]="{ item }">
                <span
                    :class="`${
                        status[item.status + 1].color
                    }--text font-weight-bold pb-2`"
                >
                    {{ status[item.status + 1].text }}
                </span>
            </template>

            <template #[`item.actions`]="{ item }">
                <NuxtLink
                    :to="{ name: 'admin-order-id', params: { id: item.id } }"
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

            <template #[`item.created_at`]="{ item }">
                <div style="max-width: 800px" align="left">
                    {{ getBrazilianDate(item.created_at) }}
                </div>
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
                { text: "Preço", value: "price" },
                { text: "Data", value: "created_at" },
                { text: "Cidade", value: "city" },
                { text: "Status", value: "status" },
                {
                    text: "Ações",
                    value: "actions",
                    sortable: false,
                    align: "right",
                },
            ],
            meses: [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
            ],

            status: [
                { text: "Pagamento Recusado", color: "red" },
                { text: "Pagamento Pendente", color: "yellow" },
                { text: "Pagamento Aprovado", color: "success" },
                { text: "Pedido enviado", color: "success" },
                { text: "Entregue", color: "success" },
                { text: "Todos", color: "success" },
            ],
            orders: [],

            search: "",
            orders_with_filter : [],

            status_filter: null,
        };
    },
    async fetch() {
        this.orders = await this.$axios.$get("orders");
        console.log(this.orders_with_filter)
        this.orders = this.orders.sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );
        this.orders_with_filter = this.orders;
    },

    methods: {
        formatMoney(value) {
            return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
        },

        getBrazilianDate(date_miliseconds) {
            const date = new Date(date_miliseconds);
            return `${
                date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`
            } de ${this.meses[date.getMonth()]} de ${date.getFullYear()}`;
        },
    },

    watch: {
        status_filter() {
            this.orders_with_filter = [];
            if (this.status_filter == null | this.status_filter == "" | this.status_filter == 'Todos') {
                this.orders_with_filter = this.orders;
                return;
            }
            this.orders.forEach((element) => {
                console.log(this.status[element.status + 1].text , this.status_filter)
                if (this.status[element.status + 1].text == this.status_filter) {
                    this.orders_with_filter.push(element);
                }
            });
        },
    },
};
</script>
 
<style>
</style>