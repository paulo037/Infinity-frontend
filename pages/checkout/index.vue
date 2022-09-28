<template>
    <div>
        <v-card outlined elevation="2">
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

                                <div class="my-10">
                                    <router-link
                                        class="
                                            accent--text
                                            pl-5
                                            text-left text-decoration-none
                                            third--text
                                        "
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
                                                    @click=" choseAddressModel = true "
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
                                    width="200px"
                                    height="50px"
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
                                Confira cada item do seu pedido
                            </div>
                            <ShowProductListVue :products="products" :head="true"/>
                            <div class="d-flex justify-end">
                                <v-btn
                                    class="accent white--text font-weight-bold"
                                    width="200px"
                                    height="50px"
                                    @click="step = 3"
                                >
                                    Continue
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <div align="center">
                            <div class="text-h5 pb-5" v-if="address">
                                Finalizar pedido
                            </div>
                            <v-card
                                max-width="400px"
                                class="mb-10 third--text"
                                outlined
                            >
                                <div
                                    class="secondary third--text text-body-1"
                                    outlined
                                >
                                    <p class="pa-5 ma-0">
                                        O valor total do seu pedido foi de
                                        {{ getPrice(amout) }}. Assim que 
                                        confirmarmos o pagamento realizaremos o
                                        envio.
                                    </p>

                                    <p class="pa-5 ma-0 text-body-2">
                                        Você pode ver os seus pedidos na aba
                                        "Pedidos" no seu perfil.
                                    </p>
                                </div>
                            </v-card>

                            <div class="third--text text-body-2 mb-5" outlined>
                                <p>
                                    Ao clicar em "Pagar" você será direcionado
                                    para uma nova aba, onde irá realizar o
                                    pagamento.
                                </p>
                            </div>

                            <div class="d-flex justify-center">
                                <v-btn
                                    class="accent white--text font-weight-bold"
                                    width="200px"
                                    height="50px"
                                    @click="buy"
                                    :disabled="preference_loading"
                                >
                                    Pagar
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>

        <ChoseAddress
            :addresses="addresses"
            :model="choseAddressModel"
            :selected="selected"
            v-on:buy="choseAddressModel = false"
            v-on:back="choseAddressModel = false"
            v-on:selectedChange="(s) => (selected = s)"
        />

        <v-dialog v-model="preference_loading" persistent>
            <v-progress-circular
                indeterminate
                color="blue"
                v-if="preference_loading"
                :size="60"
                style="position: fixed; top: 98px; z-index: 50"
            ></v-progress-circular>
        </v-dialog>
    </div>
</template>

<script>
import ChoseAddress from "@/components/product/ChoseAddress.vue";
import ShowProductListVue from "~/components/product/ShowProductList.vue";
import verify from "jsonwebtoken/verify";

export default {
    components: {
        ChoseAddress,
        ShowProductListVue
    },

    data() {
        return {
            preferece_id: null,
            preference_loading: false,

            choseAddressModel: null,

            addresses: [],
            selected: [0], //address selected

            step: 1,

            products: [],
        };
    },

    async fetch() {
        await this.$axios
            .get("/addresses")
            .then((a) => {
                console.log(a);
                this.addresses = a.data;
            })
            .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                )
    },

    mounted() {
        const reference = verify(
            localStorage.getItem("reference"),
            process.env.JWT_SECRET
        );

        if (this.$route.query.reference == reference) {
            this.products = verify(
                localStorage.getItem("checkout"),
                process.env.JWT_SECRET
            );
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

        amout() {
            let amout = 0;
            this.products.forEach((element) => {
                amout += element.price * element.quantity;
            });

            return amout;
        },
    },

    methods: {

        getPrice(amout) {
            return ` R$ ${amout.toFixed(2).replace(".", ",")}`;
        },

        name_formated(name) {
            if (name) {
                return name.length > 28 ? name.substring(0, 25) + "..." : name;
            }

            return "";
        },

        async buy() {
            var mp = new MercadoPago(process.env.MP_PUBLIC_KEY, {
                locale: "pt-BR",
            });

            await this.createPreference();

            mp.checkout({
                preference: {
                    id: this.preferece_id,
                },
                autoOpen: true,
            });
        },

        async createPreference() {
            this.preference_loading = true;
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
                    this.preference_loading = false;
                    this.$store.commit("setNumberOfProductsInCart", 0);
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                )
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