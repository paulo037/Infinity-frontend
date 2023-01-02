<template>
    <div align="center">
        <div align="left" style="max-width: 1000px">
            <v-icon @click="$router.push('/profile')" x-large
                >mdi-arrow-left-bold</v-icon
            >
        </div>
        <div align="center" style="max-width: 800px">
            <h1 class="text-left pb-5 ma-0" style="max-width: 800px">
                Pedidos
            </h1>

            <div align="center" v-if="$fetchState.pending">
                <v-skeleton-loader
                    class="mx-auto"
                    type="image"
                ></v-skeleton-loader>
            </div>

            <v-card
                v-else
                v-for="(order, index) in orders"
                :key="index"
                class="pa-5 mb-10"
                outlined
            >
                <div class="d-flex justify-space-between align-end">
                    <div align="left">
                        <div>
                            {{ getBrazilianDate(order.created_at) }}
                        </div>
                        <div
                            :class="`${
                                status[order.status + 1].color
                            }--text font-weight-bold pb-2 text-left`"
                        >
                            {{ status[order.status + 1].text }}
                        </div>
                    </div>
                    <span>
                        <v-icon
                            v-if="order.status + 1 < 2"
                            class="red--text mb-5"
                            @click="deleteOrder(index)"
                            style="cursor: pointer"
                            >mdi-delete</v-icon
                        >
                        <span v-else-if="order.status >= 2" class="pb-1">
                            <span class="font-itaic pr-2">
                                Código de rastreio:
                            </span>
                            <span class="text-body-2 font-weight-bold">
                                {{ order.tracking_code }}
                            </span>
                        </span>
                    </span>
                </div>
                <div>
                    <ShowProductListVue
                        :products="order.products"
                        :head="false"
                        :show_rating="true"
                    />
                    <div class="d-flex justify-center">
                        <v-btn
                            class="accent white--text font-weight-bold mt-5"
                            @click="checkout(index)"
                            >{{
                                order.status >= 1
                                    ? "Comprar novamente"
                                    : "Concluir Pagamento"
                            }}</v-btn
                        >
                    </div>
                </div>
            </v-card>
        </div>
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
                { text: "Pagamento Pendente", color: "darken3" },
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
            if (this.orders[index].status < 1) {
                await this.$axios.$delete(`/order/${this.orders[index].id}`);
            }
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