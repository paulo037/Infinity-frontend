<template>
    <v-row justify="space-around">
        <v-col cols="10" md="4">
            <NuxtLink to="/admin/order" style="text-decoration: none">
                <v-icon large class="primary--text">mdi-arrow-left-bold</v-icon>
            </NuxtLink>
        </v-col>
        <v-col cols="10" sm="6" md="4" class="text-right">
            <v-btn
                height="40px"
                width="150px"
                :disabled="save_disabled"
                class="accent white--text font-weight-bold hidden-sm-and-down"
                @click="save"
                >Salvar</v-btn
                >
                <div class="d-flex justify-center">
                    <div style="width: 250px">
                        <v-btn
                        block
                        height="50px"
                        :disabled="save_disabled"
                        class="d-md-none accent white--text font-weight-bold"
                        @click="save"
                        >Salvar</v-btn
                    >
                </div>
            </div>
        </v-col>
        <v-col cols="10">
            <div align="center" v-if="$fetchState.pending">
                <v-skeleton-loader
                    class="mx-auto"
                    type="image"
                ></v-skeleton-loader>
            </div>
            <div v-else>
                <v-row class="d-flex justify-space-between align-end">
                    <v-col md="8" cols="12" class="text-h6 text-end px-0 pt-10">
                        <v-select
                            :items="status"
                            item-text="text"
                            label="Status"
                            class="d-inline-block pa-0 ma-0"
                            style="max-width: 250px"
                            dense
                            :color="`${status[order.status + 1].color}`"
                            outlined
                            v-model="status_model"
                        ></v-select>
                    </v-col>
                    <v-col md="4" cols="12" class="text-h6 px-0 text-right">
                        {{ getBrazilianDate(order.created_at) }}
                    </v-col>
                </v-row>
                <v-card outlined class="pa-5">
                    <div class="text-h5 pb-2 font-weight-bold">Cliente</div>
                    <div class="text-body-1">
                        Nome: {{ order.user.first_name }}
                        {{ order.user.last_name }}
                    </div>
                    <div class="text-body-1">
                        CPF:
                        {{
                            order.user.cpf.replace(
                                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                                "$1.$2.$3-$4"
                            )
                        }}
                    </div>
                    <div></div>
                </v-card>

                <v-card outlined class="pa-5 my-5">
                    <v-row>
                        <v-col
                            cols="12"
                            class="text-h5 pb-2 font-weight-bold pa-0"
                            >Endereço</v-col
                        >

                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            CEP:
                            {{ order.cep.replace(/(\d{5})(\d{3})/, "$1-$2") }}
                        </v-col>
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1"
                            >Estado: {{ order.state }}</v-col
                        >
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1"
                            >Cidade: {{ order.city }}</v-col
                        >
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1"
                            >Rua: {{ order.street }}</v-col
                        >
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1"
                            >Número: {{ order.number }}</v-col
                        >
                        <v-col
                            md="6"
                            cols="12"
                            class="text-body-1 pa-0 py-1"
                            v-if="order.complement != null"
                        >
                            Complemento: {{ order.complement }}
                        </v-col>
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1"
                            >Celular:
                            {{
                                order.telephone.replace(
                                    /(\d{2})(\d{9})/,
                                    "($1) $2"
                                )
                            }}</v-col
                        >
                    </v-row>
                </v-card>

                <v-card outlined class="pa-5 my-5" align="center">
                    <div class="text-h5 pb-2 font-weight-bold text-left">
                        Produtos
                    </div>
                    <ShowProductListVue
                        :products="order.products"
                        :head="false"
                    />
                </v-card>
                <div class="mb-10"></div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import ShowProductListVue from "~/components/product/ShowProductList.vue";

export default {
    components: {
        ShowProductListVue,
    },
    data() {
        return {
            order: {
                products: [],
                user: {},
            },
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
            status_model: null,
            save_disabled: true,
        };
    },

    async fetch() {
        const id = this.$route.params.id;

        this.order = await this.$axios.$get(`order/${id}`).catch((e) =>
            this.$toasted({
                text: e.response.data
                    ? e.response.data
                    : "Ocorreu um erro inesperado!",
            })
        );

        this.status_model = this.status[this.order.status + 1].text;
    },

    methods: {
        getBrazilianDate(str_date) {
            const date = new Date(str_date);
            return `${
                date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`
            } de ${this.meses[date.getMonth()]} de ${date.getFullYear()}`;
        },

        async save() {
            await this.$axios
                .$put(`order/${this.order.id}`, {
                    status: this.order.status
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                )
                .then(() => {
                    this.$toasted({
                        text: "Salvo com suceeso",
                        color:"success"
                    });
                    this.save_disabled = true;
                });
        },
    },

    watch: {
        status_model() {
            const status_index =
                this.status.indexOf(
                    this.status.find((s) => s.text == this.status_model)
                ) - 1;

            if (this.order.status != status_index) {
                this.order.status = status_index;
                this.save_disabled = false;
            }
        },
    },
};
</script>

<style>
</style>