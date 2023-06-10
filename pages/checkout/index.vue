<template>
    <div align="center">
        <v-card outlined elevation="2" style="max-width: 1000px">
            <v-stepper v-model="step" flat>
                <v-stepper-header style="box-shadow: none !important">
                    <v-stepper-step
                        color="accent"
                        @click="step = step > 1 ? 1 : step"
                        :complete="step > 1"
                        step="1"
                    >
                        Endereço
                    </v-stepper-step>

                    <v-divider :class="step > 1 ? 'accent' : ''"></v-divider>

                    <v-stepper-step
                        color="accent"
                        @click="step = step > 2 ? 2 : step"
                        :complete="step > 2"
                        step="2"
                    >
                        Confirmação do Pedido
                    </v-stepper-step>

                    <v-divider :class="step > 2 ? 'accent' : ''"></v-divider>

                    <v-stepper-step color="accent" step="3">
                        Pagamento
                    </v-stepper-step>
                </v-stepper-header>
                <v-divider></v-divider>

                <v-stepper-items v-if="$fetchState.pending">
                    <v-stepper-content step="1">
                        <v-skeleton-loader
                            class="mx-auto"
                            type="image"
                        ></v-skeleton-loader>
                    </v-stepper-content>
                </v-stepper-items>

                <v-stepper-items v-else>
                    <v-stepper-content step="1">
                        <div align="center">
                            <div class="text-h5 pb-5" v-if="address">
                                Como você quer receber ou retirar sua compra?
                            </div>

                            <div v-else>
                                <div class="text-h5 pb-5">
                                    Você ainda não têm nenhum endereço
                                    cadastrado
                                </div>

                                <v-icon x-large> mdi-google-maps </v-icon>

                                <div
                                    class="my-10"
                                    @click="
                                        $store.commit(
                                            'setBack_url',
                                            $router.history.current.path
                                        )
                                    "
                                >
                                    <router-link
                                        class="accent--text pl-5 text-left text-decoration-none third--text"
                                        to="/profile/address"
                                    >
                                        <span class="accent--text">
                                            Criar um endereço
                                        </span>
                                        <v-icon class="accent--text"
                                            >mdi-arrow-right-bold</v-icon
                                        >
                                    </router-link>
                                </div>
                            </div>

                            <v-card
                                class="mb-10 third--text"
                                style="max-width: 800px"
                                outlined
                                v-if="address"
                            >
                                <v-simple-table class="secondary">
                                    <tbody>
                                        <tr>
                                            <td style="width: 20px">
                                                <v-icon x-large
                                                    >mdi-map-marker-circle</v-icon
                                                >
                                            </td>
                                            <td class="py-5">
                                                <span class="text-h6"
                                                    >{{ address.street }} -
                                                    {{
                                                        address.number
                                                            ? address.number
                                                            : "SN"
                                                    }}
                                                </span>
                                                <br />
                                                <span class="py-5 text-body-2"
                                                    >CEP {{ address.cep }} -
                                                    {{ address.state }} -
                                                    {{ address.city }}
                                                </span>

                                                <br />
                                                <span class="py-5 text-body-2"
                                                    >{{ address.user_name }} -
                                                    {{ address.telephone }}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    style="
                                                        cursor: pointer;
                                                        height: 50px;
                                                    "
                                                    class="primary--text"
                                                    @click="
                                                        choseAddressModel = true
                                                    "
                                                >
                                                    Alterar endereço
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-card>

                            <div class="d-flex justify-end">
                                <v-btn
                                    class="accent white--text font-weight-bold"
                                    :disabled="
                                        address == undefined ? true : false
                                    "
                                    @click="
                                        step = address != undefined ? 2 : step
                                    "
                                >
                                    Continue
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <div align="center">
                            <div class="text-h5 pb-5" v-if="address">
                                Confira os itens do seu pedido
                            </div>
                            <ProductTable :products="products" :head="true" />
                            <div class="d-flex justify-end">
                                <v-btn
                                    class="accent white--text font-weight-bold mt-5"
                                    @click="step = 3"
                                >
                                    Continue
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <div class="text-h5 pb-5" v-if="address">
                            Detalhes da sua compra
                        </div>

                        <div align="center">
                            <v-card
                                max-width="400px"
                                class="mb-10 third--text pa-2"
                                outlined
                            >
                                <v-row>
                                    <v-col>
                                        <v-row> Produtos </v-row>
                                        <v-row>Frete</v-row>
                                        <v-row
                                            v-for="(
                                                item, index
                                            ) in calcDiscount"
                                            :key="index"
                                            cols="12"
                                        >
                                            <div v-if="item > 0">Desconto</div>
                                        </v-row>
                                    </v-col>
                                    <v-col>
                                        <v-row class="justify-end">
                                            {{ getPrice(amount) }}
                                        </v-row>

                                        <v-row class="justify-end"
                                            >+{{ getPrice(shipments) }}</v-row
                                        >
                                        <v-row
                                            v-for="(
                                                item, index
                                            ) in calcDiscount"
                                            :key="index"
                                            class="justify-end"
                                            cols="12"
                                        >
                                            <div v-if="item > 0">
                                                - R$
                                                {{
                                                    item
                                                        .toFixed(2)
                                                        .replace(".", ",")
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
                                            {{
                                                getPrice(
                                                    shipments +
                                                        amount -
                                                        disccountAmount
                                                )
                                            }}
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <p class="pa-5 ma-0 text-body-2">
                                Você pode ver os seus pedidos na aba "Pedidos"
                                no seu perfil.
                            </p>
                            <div class="d-flex justify-center">
                                <v-btn
                                    class="accent white--text font-weight-bold"
                                    @click="buy"
                                    :disabled="$store.state.loading"
                                >
                                    {{ text }}
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>

        <ModalChoseAddress
            :addresses="addresses"
            :model="choseAddressModel"
            :selected="selected"
            v-on:buy="choseAddressModel = false"
            v-on:back="choseAddressModel = false"
            v-on:selectedChange="(s) => (selected = s)"
        />
    </div>
</template>

<script>
import { verify } from "jsonwebtoken";

export default {
    data() {
        return {
            preferece_id: null,
            isMPLoaded: false,
            choseAddressModel: null,

            addresses: [],
            selected: [0], //address selected

            step: 1,
            text: " Concluir Compra",

            products: [],
            promotions: [],
        };
    },

    head() {
        return {
            title: "Mercado Pago",
            script: [
                {
                    hid: "mercado livre",
                    src: "https://sdk.mercadopago.com/js/v2/",
                    defer: true,
                    callback: () => {
                        this.isMPLoaded = true;
                    },
                },
            ],
        };
    },
    async fetch() {
        this.promotions = await this.$axios.$get(`promotions`);
        await this.$axios
            .get("/addresses")
            .then((a) => {
                this.addresses = a.data;
            })
            .catch((e) =>
                this.$toasted({
                    text: e.response.data
                        ? e.response.data
                        : "Ocorreu um erro inesperado!",
                })
            );
    },

    async mounted() {
        const reference = await this.$cookies.get("reference");

        if (this.$route.query.reference == reference) {
            this.products = JSON.parse(JSON.stringify(this.$store.state.items));
            console.log(this.products);
        } else {
            this.$toasted({
                text: "Checkout não encontrado!",
            });

            this.$router.push("/");
        }
    },

    computed: {
        address() {
            return this.addresses[this.selected[0]];
        },

        amount() {
            let amount = 0;
            this.products.forEach((element) => {
                amount += element.price * element.quantity;
            });

            return amount;
        },

        shipments() {
            return ( this.amount -  this.disccountAmount) >= 200 ? 0 : 25;
        },

        category_frequence() {
            const categoryIds = {};

            for (const product of this.products) {
                const { categories } = product;
                for (const categoryId of categories) {
                    if (categoryIds[categoryId]) {
                        categoryIds[categoryId].quantity += product.quantity;
                    } else {
                        categoryIds[categoryId] = {
                            quantity: product.quantity,
                            price: product.price,
                        };
                    }
                }
            }

            return categoryIds;
        },

        calcDiscount() {
            console.log(this.category_frequence);
            let have = JSON.parse(JSON.stringify(this.category_frequence));
            let disccount = {};

            for (const promotion of this.promotions) {
                if (
                    !!have[promotion.buying_category_id] &&
                    have[promotion.buying_category_id].quantity
                ) {
                    let buying_id = promotion.buying_category_id;
                    let buying_quantity = promotion.buying_quantity;
                    let win_id = promotion.win_category_id;
                    let win_quantity = promotion.win_quantity;
                    disccount[win_id] = 0;
                    while (
                        have[buying_id] &&
                        have[buying_id].quantity >= buying_quantity &&
                        have[win_id] &&
                        have[win_id].quantity >= win_quantity
                    ) {
                        have[buying_id].quantity -= promotion.buying_quantity;
                        const add_q = Math.min(
                            have[win_id].quantity,
                            promotion.win_quantity
                        );
                        have[win_id].quantity -= add_q;

                        disccount[win_id] += have[win_id].price * add_q;
                    }
                }
            }

            let arr = [];
            const keysArray = Object.keys(disccount);
            for (const key of keysArray) {
                arr.push(disccount[key]);
            }

            return arr;
        },

        disccountAmount() {
            let amount = 0;
            const keysArray = Object.keys(this.calcDiscount);
            for (const key of keysArray) {
                amount += this.calcDiscount[key];
            }
            return amount;
        },
    },

    methods: {
        getPrice(amount) {
            return ` R$ ${amount.toFixed(2).replace(".", ",")}`;
        },

        name_formated(name) {
            if (name) {
                return name.length > 28 ? name.substring(0, 25) + "..." : name;
            }

            return "";
        },

        async buy() {
            this.text = "Já é quase seu...";
            var mp = new MercadoPago(process.env.MP_PUBLIC_KEY, {
                locale: "pt-BR",
            });

            if (this.preferece_id) {
                mp.checkout({
                    preference: {
                        id: this.preferece_id,
                    },
                    autoOpen: true,
                });
                return;
            }

            const created = await this.createPreference();

            if (created) {
                mp.checkout({
                    preference: {
                        id: this.preferece_id,
                    },
                    autoOpen: true,
                });
            } else {
                this.preferece_id = null;
                this.$router.go(-1);
            }
            this.text = "Concluir Compra";
        },

        async createPreference() {
            let created = false;
            this.$store.commit("setLoading", {
                loading: true,
                loading_color: "blue",
            });
            const products = this.products.map((element) => {
                delete element.name;
                delete element.price;
                delete element.image;

                return element;
            });

            await this.$axios
                .$post("preference", {
                    items: products,
                    address: this.address,
                    type: this.$route.query.type,
                })
                .then((response) => {
                    this.preferece_id = response.id;
                    if (this.$route.query.type == "cart") {
                        this.$store.commit("setNumberOfProductsInCart", 0);
                    }
                    created = true;
                })
                .catch((e) => {
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    });
                });

            this.$store.commit("setLoading", {
                loading: false,
            });
            return created;
        },
    },
};
</script>

<style>
.v-dialog--active {
    height: 100%;
    width: 100%;
    margin: 0px;
    max-height: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>