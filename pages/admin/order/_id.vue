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
                >Salvar alterações</v-btn
            >
            <div class="d-flex justify-center">
                <div style="width: 250px">
                    <v-btn
                        block
                        height="50px"
                        :disabled="save_disabled"
                        class="d-md-none accent white--text font-weight-bold"
                        @click="save"
                        >Salvar alterações</v-btn
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
                <v-card outlined class="pa-5 my-5">
                    <div>
                        <v-icon
                            v-if="!edit"
                            @click="edit = true"
                            color="accent"
                            style="position: absolute; right: 5px; top: 5px"
                            >mdi-pencil</v-icon
                        >
                        <v-icon
                            v-else
                            @click="edit = false"
                            color="green"
                            style="position: absolute; right: 5px; top: 5px"
                            >mdi-check</v-icon
                        >
                    </div>
                    <div class="text-h5 font-weight-bold">Geral</div>
                    <v-divider class="pb-2"></v-divider>
                    <div class="text-body-1">
                        <span class="font-weight-bold"> Data da compra: </span>
                        <span>
                            {{ $brazilianDate(order.created_at) }}
                        </span>
                    </div>
                    <div class="text-body-1">
                        <span class="font-weight-bold">
                            Código de rastreio:
                        </span>
                        <v-text-field
                            class="d-inline-block pa-0 ma-0 no-details"
                            style="max-width: 210px"
                            dense
                            v-model="order.tracking_code"
                            v-if="edit"
                        ></v-text-field>
                        <span v-else>
                            {{
                                order.tracking_code != null
                                    ? order.tracking_code
                                    : "Não adicionado"
                            }}
                        </span>
                    </div>
                    <div class="text-body-1">
                        <span class="font-weight-bold"> Status: </span>

                        <v-select
                            :items="status"
                            item-text="text"
                            class="d-inline-block pa-0 ma-0 no-details"
                            style="max-width: 210px"
                            dense
                            :color="`${status[order.status + 1].color}`"
                            v-model="status_model"
                            v-if="edit"
                        ></v-select>
                        <span v-else>
                            {{ status[order.status + 1].text }}
                        </span>
                    </div>
                </v-card>

                <v-card outlined class="pa-5">
                    <div class="text-h5 font-weight-bold">Cliente</div>
                    <v-divider class="pb-2"></v-divider>
                    <div class="text-body-1">
                        <span class="font-weight-bold"> Nome: </span>
                        {{ order.user.first_name }}
                        {{ order.user.last_name }}
                    </div>
                    <div class="text-body-1">
                        <span class="font-weight-bold"> CPF: </span>

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
                    <div class="text-h5 font-weight-bold">Endereço</div>
                    <v-divider class="pb-2"></v-divider>
                    <v-row>
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            <span class="font-weight-bold"> CEP: </span>
                            {{ order.cep.replace(/(\d{5})(\d{3})/, "$1-$2") }}
                        </v-col>
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            <span class="font-weight-bold"> Estado: </span>
                            {{ order.state }}</v-col
                        >
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            <span class="font-weight-bold"> Cidade: </span>
                            {{ order.city }}</v-col
                        >
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            <span class="font-weight-bold"> Rua: </span>
                            {{ order.street }}</v-col
                        >
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            <span class="font-weight-bold"> Número: </span>

                            {{ order.number }}</v-col
                        >
                        <v-col
                            md="6"
                            cols="12"
                            class="text-body-1 pa-0 py-1"
                            v-if="order.complement != null"
                        >
                            <span class="font-weight-bold"> Complemento: </span>
                            {{ order.complement }}
                        </v-col>
                        <v-col md="6" cols="12" class="text-body-1 pa-0 py-1">
                            <span class="font-weight-bold"> Celular: </span>
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
                    <div class="text-h5 font-weight-bold text-left">
                        Produtos
                    </div>
                    <v-divider class="pb-5"></v-divider>
                    <ProductTable :products="order.products" :head="true" />
                    <v-card
                        max-width="400px"
                        class="my-10 third--text pa-2"
                        outlined
                    >
                        <v-row>
                            <v-col>
                                <v-row> Sub-total </v-row>
                                <v-row>Frete</v-row>
                                <v-row
                                    v-for="(item, index) in order.promotions"
                                    :key="index"
                                    cols="12"
                                >
                                    <div v-if="item.quantity > 0">Desconto</div>
                                </v-row>
                            </v-col>

                            <v-col>
                                <v-row class="justify-end">
                                    {{ getPrice(order.subtotal) }}
                                </v-row>

                                <v-row class="justify-end">
                                    +{{ getPrice(order.shipping_price) }}</v-row
                                >
                                <v-row
                                    v-for="(item, index) in order.promotions"
                                    :key="index"
                                    class="justify-end"
                                    cols="12"
                                >
                                    <div v-if="item.quantity > 0">
                                        -{{
                                            getPrice(item.quantity * item.price)
                                        }}
                                    </div>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>

                        <v-row>
                            <v-col>
                                <v-row> Total</v-row>
                            </v-col>
                            <v-col>
                                <v-row class="justify-end">
                                    {{ getPrice(order.price) }}
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>
                <div class="mb-10"></div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
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
                { text: "Pagamento Pendente", color: "darken3" },
                { text: "Pagamento Aprovado", color: "success" },
                { text: "Pedido enviado", color: "success" },
                { text: "Entregue", color: "success" },
            ],
            status_model: null,
            save_disabled: true,
            edit: false,
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

        this.order.subtotal = this.order.products.reduce(
            (a, b) => a + b.price * b.quantity,
            0
        );
        this.order.price = this.order.price + this.order.shipping_price;

        this.status_model = this.status[this.order.status + 1].text;
    },

    methods: {
        getPrice(amount) {
            return ` R$ ${amount.toFixed(2).replace(".", ",")}`;
        },
        async save() {
            await this.$axios
                .$put(`order/${this.order.id}`, {
                    status: this.order.status,
                    tracking_code: this.order.tracking_code,
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
                        color: "success",
                    });
                    this.save_disabled = true;
                    this.edit = false;
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

        "order.tracking_code"() {
            if (this.edit) {
                this.save_disabled = false;
            }
        },
    },
};
</script>

<style>
.disccount .col {
    padding: 2px;
}
</style>