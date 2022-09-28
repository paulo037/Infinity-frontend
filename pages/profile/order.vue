<template>
    <div align="center">
        <div align="left" style="max-width: 1000px">
            <v-icon @click="$router.push('/profile')" x-large
                >mdi-arrow-left-bold</v-icon
            >
        </div>

        <h1 class="text-left pb-5 ma-0" style="max-width: 800px">Pedidos</h1>
        <v-card style="max-width: 800px" outlined class="pa-5 px-10">
            <div align="center" v-if="$fetchState.pending">
                <v-skeleton-loader
                    class="mx-auto"
                    type="image"
                ></v-skeleton-loader>
            </div>

            <div v-else v-for="(order, index) in orders" :key="index">
                <div style="max-width: 800px" align="left">
                    {{ getBrazilianDate(order[0].date) }}
                </div>
                <div class="d-flex justify-space-between align-end">
                    <span
                        :class="`${
                            status[order[0].status + 1].color
                        }--text font-weight-bold pb-2`"
                    >
                        {{ status[order[0].status + 1].text }}
                    </span>
                    <span class="pb-5">
                        <v-icon
                            v-if="order[0].status + 1 < 2"
                            class="red--text"
                            @click="deleteOrder(index)"
                            style="cursor: pointer"
                            >mdi-delete</v-icon
                        >
                    </span>
                </div>
                <ShowProductListVue :products="order" :head="false" />
            </div>
        </v-card>
    </div>
</template>

<script>
import stringify from "uuid/dist/stringify";
import ShowProductListVue from "~/components/product/ShowProductList.vue";

export default {
    components: {
        ShowProductListVue,
    },
    data() {
        return {
            orders: [],
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
            ],
        };
    },

    async fetch() {
        this.orders = await this.$axios.$get("order");
        this.orders = this.orders.sort(
            (a, b) =>
                new Date(b[0].date).getTime() - new Date(a[0].date).getTime()
        );
    },

    methods: {
        getBrazilianDate(str_date) {
            const date = new Date(str_date);
            return `${
                date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`
            } de ${this.meses[date.getMonth()]} de ${date.getFullYear()}`;
        },

        async deleteOrder(index) {
            await this.$axios
                .$delete(`/order/${this.orders[index][0].id}`)
                .then(() => {
                    this.$toasted({
                        text: "Pedido excluido!",
                        color: "success",
                    });
                    this.orders.splice(index, 1);
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
        },
    },
};
</script>

<style>
</style>