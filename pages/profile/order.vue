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
                    {{ getBrazilianDate(order.created_at) }}
                </div>
                <div class="d-flex justify-space-between align-end">
                    <span
                        :class="`${
                            status[order.status + 1].color
                        }--text font-weight-bold pb-2`"
                    >
                        {{ status[order.status + 1].text }}
                    </span>
                    <span class="pb-5">
                        <v-icon
                            v-if="order.status + 1 < 2"
                            class="red--text"
                            @click="deleteOrder(index)"
                            style="cursor: pointer"
                            >mdi-delete</v-icon
                        >
                    </span>
                </div>
                <div class="mb-10">
                    <ShowProductListVue
                        :products="order.products"
                        :head="false"
                    />
                    <div class="d-flex justify-end">
                        <v-btn
                            class="accent white--text font-weight-bold mt-5"
                            width="200px"
                            height="50px"
                            @click="checkout(index)"
                            v-if="order.status + 1 < 2"
                            >Concluir Pagamento</v-btn
                        >
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import ShowProductListVue from "~/components/product/ShowProductList.vue";
import { v4 } from "uuid";
import { sign } from "jsonwebtoken";

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
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
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
                .$delete(`/order/${this.orders[index].id}`)
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

        async checkout(index) {
            if (!this.$auth.loggedIn) {
                this.$toasted({
                    text: "Entre ou crie uma conta para comprar produtos!",
                });
                this.$store.commit(
                    "SetBack_url",
                    this.$router.history.current.path
                );
                return this.$router.push("/login");
            }

            const products = this.orders[index].products;
            await this.$axios.$delete(`/order/${this.orders[index].id}`);
            const reference = v4();

            let items = [];

            products.forEach((p) => {
                items.push({
                    product_id: p.product_id,
                    quantity: p.quantity,
                    size: p.size,
                    color: p.color,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                });
            });
            

            localStorage.setItem(
                "reference",
                sign(reference, process.env.JWT_SECRET)
            );

            localStorage.setItem(
                "checkout",
                sign(JSON.stringify(items), process.env.JWT_SECRET)
            );

            await this.$router.push({
                path: "/checkout",
                query: { reference: reference, type: "order" },
            });
        },
    },
};
</script>

<style>
</style>