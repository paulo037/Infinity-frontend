<template>
    <div>
        <v-data-table
            :items="orders_with_filter"
            :headers="headers"
            :items-per-page="limit"
            hide-default-footer
            class="mt-5"
            :search="search"
            :loading="loading"
            loading-text="Carregando..."
            dense
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

        <Pagination
            :count="count"
            :limit="limit"
            :limits="limits"
            :page="page"
            :text="'Pedidos por página:'"
            v-on:pageChange="pageChange"
            v-on:limitChange="limitChange"
        />
        <v-divider></v-divider>
    </div>
</template>


 <script>
import Pagination from "~/components/Pagination.vue";
export default {
    components: {
        Pagination,
    },
    data() {
        return {
            timeout: 3000,
            search: "",
            text: "",
            dialog: false,
            id: null,
            page: 1,
            count: 0,
            limit: 10,
            limits: [5, 10, 20, 50, 100],
            loading: false,
            headers: [
                { text: "Data", value: "created_at" },
                { text: "Estado", value: "state" },
                { text: "Cidade", value: "city" },
                { text: "Preço", value: "price" },
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
                { text: "Pagamento Pendente", color: "darken3" },
                { text: "Pagamento Aprovado", color: "success" },
                { text: "Pedido enviado", color: "success" },
                { text: "Entregue", color: "success" },
                { text: "Todos", color: "success" },
            ],
            orders: [],

            search: "",
            orders_with_filter: [],

            status_filter: "Pagamento Aprovado",
        };
    },
    async fetch() {
        await this.getOrders();
    },

    methods: {
        async getOrders() {
            this.loading = true;
            const status =
                this.status.indexOf(
                    this.status.find((s) => s.text == this.status_filter)
                ) - 1;
            const params = new URLSearchParams();
            params.append("limit", this.limit);
            params.append("page", this.page);
            params.append("status", status);

            let { orders, count } = await this.$axios.$get(`orders`, {
                params,
            });

            this.orders = orders;
            this.count = count;
            this.orders_with_filter = this.orders;
            this.loading = false;
        },

        formatMoney(value) {
            return `R$ ${value.toFixed(2).toString().replace(".", ",")}`;
        },

        getBrazilianDate(date_miliseconds) {
            const date = new Date(date_miliseconds);
            return `${
                date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`
            } de ${this.meses[date.getMonth()]} de ${date.getFullYear()}`;
        },

        async limitChange(limit){
            this.limit = limit;
            this.page = 1;
            await this.getOrders();
        },

        async pageChange(page){
            this.page = page;
            await this.getOrders();
        }
    },

    watch: {
        async status_filter() {
            this.page = 1;
            await this.getOrders();
        },
    },
};
</script>
 
<style>
</style>