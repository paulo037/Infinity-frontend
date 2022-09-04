<template>
    <div>
        <v-dialog v-model="preference_loading">
            <v-progress-circular
                indeterminate
                color="blue"
                v-if="preference_loading"
                :size="60"
                style="position: fixed; top: 98px; left: 48%; z-index: 50"
            ></v-progress-circular>
        </v-dialog>

        <div align="center" v-if="products.length == 0 && !$fetchState.pending">
            <v-card
                align="center"
                max-width="500px"
                class="secondary mx-8 pa-8 justify-center"
                elevation="5"
            >
                <span class="primary--text text-h6">
                    Nenhum produto adicionado ainda!
                </span>
                <div>
                    <br />

                    <svg
                        class="primary--text"
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill="currentColor"
                            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607l1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4a2 2 0 0 0 0-4h7a2 2 0 1 0 0 4a2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0zM7.354 5.646L8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207L7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5L6.646 6.354a.5.5 0 1 1 .708-.708z"
                        />
                    </svg>
                </div>
                <br />
                <nuxt-link to="/">Ir à página pricipal.</nuxt-link>
            </v-card>
        </div>

        <div align="center" v-else>
            <v-card
                max-width="900px"
                class="secondary mx-8 mb-16"
                elevation="12"
            >
                <v-card class="primary--text secondary py-2">
                    <span class="text-h5"> CARRINHO | </span>
                    <v-icon class="primary--text pb-3">mdi-cart</v-icon>
                </v-card>
                <v-divider class="third"></v-divider>
                <v-skeleton-loader
                    class="mx-auto"
                    max-width="900px"
                    type="image"
                    v-if="$fetchState.pending"
                ></v-skeleton-loader>
                <v-simple-table class="secondary third--text mb-5" v-else>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left third--text px-8">
                                    PRODUTOS
                                </th>

                                <th
                                    class="
                                        text-left
                                        third--text
                                        hidden-xs-only
                                        pa-0
                                    "
                                >
                                    QUANTIDADE
                                </th>
                                <th
                                    class="
                                        text-left
                                        third--text
                                        text-center
                                        hidden-xs-only
                                    "
                                >
                                    PREÇO
                                </th>
                                <th class="pa-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in products"
                                :key="`${item.product_id}_${item.size_id}_${item.color_id}`"
                            >
                                <!-- Para Celular -->
                                <td class="hidden-sm-and-up pa-0">
                                    <v-card
                                        class="
                                            d-flex
                                            align-start
                                            pa-0
                                            ma-2
                                            secondary
                                        "
                                        flat
                                    >
                                        <v-container class="d-flex align-start">
                                            <router-link
                                                :to="`/product/${item.name}`"
                                            >
                                                <v-img
                                                    class="d-inline-block"
                                                    :src="item.image"
                                                    max-width="80px"
                                                    height="80px"
                                                ></v-img>
                                            </router-link>
                                            <div class="text ml-5">
                                                <span>
                                                    {{
                                                        item.name.length > 28
                                                            ? item.name.substring(
                                                                  0,
                                                                  25
                                                              ) + "..."
                                                            : item.name
                                                    }}
                                                </span>

                                                <span class="primary--text">
                                                    <br />
                                                    R$:
                                                    {{
                                                        (item.price * 1)
                                                            .toFixed(2)
                                                            .replace(".", ",")
                                                    }}
                                                </span>

                                                <div>
                                                    <v-icon
                                                        color="sencondary"
                                                        class="
                                                            accent
                                                            rounded-circle
                                                        "
                                                        :disabled="
                                                            item.quantity <= 1
                                                                ? true
                                                                : false
                                                        "
                                                        @click="
                                                            decrement(index)
                                                        "
                                                        small
                                                    >
                                                        mdi-minus
                                                    </v-icon>

                                                    <span
                                                        class="
                                                            font-weight-light
                                                            pa-2
                                                        "
                                                        v-text="item.quantity"
                                                    ></span>
                                                    <v-icon
                                                        color="sencondary"
                                                        class="
                                                            accent
                                                            rounded-circle
                                                        "
                                                        small
                                                        @click="
                                                            increment(index)
                                                        "
                                                        link
                                                    >
                                                        mdi-plus
                                                    </v-icon>
                                                </div>
                                                <span class="primary--text">
                                                    {{ item.color }}
                                                </span>
                                                <span class="third--text"
                                                    >|</span
                                                >

                                                <span class="primary--text">{{
                                                    item.size
                                                }}</span>
                                            </div>
                                        </v-container>

                                        <v-icon
                                            block
                                            small
                                            class="red--text ma-2"
                                            @click="deleteProduct(index)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </v-card>
                                </td>
                                <!-- Para Computadores -->
                                <td class="hidden-xs-only">
                                    <v-card
                                        class="
                                            d-flex
                                            align-top
                                            py-5
                                            ma-2
                                            secondary
                                        "
                                        width="260px"
                                        flat
                                        :to="`/product/${item.name}`"
                                    >
                                        <v-img
                                            class="
                                                d-inline-block
                                                mx-5
                                                rounded-sm
                                            "
                                            :src="item.image"
                                            max-width="80px"
                                            height="80px"
                                        ></v-img>
                                        <div>
                                            <span
                                                class="
                                                    primary--text
                                                    text-body-1
                                                "
                                            >
                                                {{
                                                    item.name.length > 28
                                                        ? item.name.substring(
                                                              0,
                                                              25
                                                          ) + "..."
                                                        : item.name
                                                }}
                                            </span>

                                            <span class="text-subtitle-3">
                                                <br />
                                                {{ item.size }}
                                            </span>

                                            <span class="text-subtitle-3">
                                                <br />
                                                {{ item.color }}
                                            </span>
                                        </div>
                                    </v-card>
                                </td>

                                <td class="hidden-xs-only pa-0">
                                    <v-icon
                                        color="sencondary"
                                        class="accent rounded-circle"
                                        :disabled="
                                            item.quantity <= 1 ? true : false
                                        "
                                        @click="decrement(index)"
                                    >
                                        mdi-minus
                                    </v-icon>

                                    <span
                                        class="font-weight-light pa-2"
                                        v-text="item.quantity"
                                    ></span>
                                    <v-icon
                                        color="sencondary"
                                        class="accent rounded-circle"
                                        @click="increment(index)"
                                    >
                                        mdi-plus
                                    </v-icon>
                                </td>
                                <td
                                    class="
                                        hidden-xs-only
                                        primary--text
                                        text-subtitle-1 text-center
                                    "
                                >
                                    R$:
                                    {{
                                        (item.price * 1)
                                            .toFixed(2)
                                            .replace(".", ",")
                                    }}
                                </td>

                                <td class="pa-0 hidden-xs-only">
                                    <v-container
                                        style="height: 100%; padding: 0px"
                                        class="text-right pa-1"
                                    >
                                        <v-icon
                                            class="red--text ma-2"
                                            @click="deleteProduct(index)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </v-container>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-divider class="third"></v-divider>

                <v-container class="py-5">
                    <v-layout row wrap align-top justify-center>
                        <v-flex md8>
                            <span
                                class="
                                    third--text
                                    text-h5
                                    mb-8
                                    ml-5
                                    text-center
                                "
                                >TOTAL</span
                            >
                        </v-flex>

                        <v-flex md4>
                            <span class="primary--text text-h5 text-right">
                                R$:

                                {{
                                    calculateAmount.toFixed(2).replace(".", ",")
                                }}
                            </span>
                        </v-flex>
                    </v-layout>
                </v-container>

                <v-divider class="third"></v-divider>
                <v-container class="text-center text-h5 primary--text pa-8">
                    <v-btn
                        class="primary secondary--text"
                        width="60%"
                        height="50px"
                        @click="selectAddress"
                        >COMPRAR
                    </v-btn>
                </v-container>
            </v-card>
        </div>

        <ChoseAddress
            :addresses="addresses"
            :model="choseAddressModel"
            v-on:buy="buy"
            v-on:back="choseAddressModel = false"
            v-on:selectedChange="(s) => (selected = s)"
        />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import ChoseAddress from "~/components/product/ChoseAddress.vue";
export default {
    components: {
        ChoseAddress,
    },

    async fetch() {
        if (!this.$auth.loggedIn) {
            this.toasted({
                text: "Entre ou crie uma conta para ver seu carrinho!",
            });
            this.SetBack_url(this.$router.history.current.path);
            return this.$router.push("/login");
        }

        this.products = await this.$axios.$get(`cart/${this.$auth.user.id}`);
    },
    data() {
        return {
            products: [],
            preference_loading: false,
            choseAddressModel: false,
            addresses: [],
            selected: [0],
        };
    },
    methods: {
        async selectAddress() {
            if (!this.$auth.loggedIn) {
                this.toasted({
                    text: "Entre ou crie uma conta para comprar produtos!",
                });
                this.SetBack_url(this.$router.history.current.path);
                return this.$router.push("/login");
            }

            await this.getAddresses();
            this.choseAddressModel = true;
        },

        async getAddresses() {
            await this.$axios
                .get("/address")
                .then((a) => {
                    this.addresses = a.data;
                })
                .catch((e) =>
                    this.toasted({
                        text: e.response.data ? e.response.data : e,
                    })
                );
        },

        async buy() {
            this.choseAddressModel = false;
            var mp = new MercadoPago(process.env.MP_PUBLIC_KEY, {
                locale: "pt-BR",
            });

            await this.createPreference();

            this.checkout = mp.checkout({
                preference: {
                    id: this.preferece_id,
                },
                autoOpen: true,
            });
        },

        async createPreference() {
            this.preference_loading = true;

            let products = [];

            this.products.forEach((p) => {
                products.push({
                    product_id: p.product_id.toString(),
                    quantity: p.quantity,
                    size: p.size,
                    color: p.color,
                });
            });

            const address = this.addresses[this.selected[0]];

            await this.$axios
                .$post("preference", { items: products, address: address })
                .then((response) => {
                    this.preferece_id = response.id;
                    this.preference_loading = false;
                });
        },

        async decrement(index) {
            const cart = {
                user_id: this.$auth.user.id,
                product_id: this.products[index].product_id,
                size_id: this.products[index].size_id,
                color_id: this.products[index].color_id,
                quantity: this.products[index].quantity - 1,
            };

            await this.$axios
                .put("/cart", { cart: cart })
                .then(() => {
                    if (this.products[index].quantity > 1) {
                        this.products[index].quantity--;
                    }
                })
                .catch((e) =>
                    this.toasted({
                        text: e.response.data ? e.response.data : e,
                    })
                );
        },

        async increment(index) {
            const quantity = this.products[index].quantity;
            const cart = {
                user_id: this.$auth.user.id,
                product_id: this.products[index].product_id,
                size_id: this.products[index].size_id,
                color_id: this.products[index].color_id,
                quantity: this.products[index].quantity + 1,
            };

            await this.$axios
                .put("/cart", { cart: cart })
                .then(() => {
                    if (this.products[index].quantity == quantity)
                        this.products[index].quantity++;
                })
                .catch((e) =>
                    this.toasted({
                        text: e.response.data ? e.response.data : e,
                    })
                );
        },
        changeActive(index) {
            this.active = index;
        },
        async deleteProduct(index) {
            const cart = {
                user_id: this.$auth.user.id,
                product_id: this.products[index].product_id,
                size_id: this.products[index].size_id,
                color_id: this.products[index].color_id,
                quantity: this.products[index].quantity,
            };
            const name = this.products[index].name;

            await this.$axios
                .delete("/cart", { data: { cart: cart } })
                .then(() => {
                    this.$store.commit("decrementNumberOfProductsInCart");
                    this.toasted({
                        text: `O produto ${name} foi removido do carrinho`,
                        color: "success",
                    });
                    this.products.splice(index, 1);
                })
                .catch((e) =>
                    this.toasted({
                        text: e.response.data ? e.response.data : e,
                    })
                );
        },

        ...mapMutations(["toasted"]),
    },

    computed: {
        calculateAmount() {
            let amout = 0;
            this.products.map(
                (product) => (amout += product.price * product.quantity)
            );
            return amout;
        },
    },
};
</script>

<style >
tr:hover {
    background-color: transparent !important;
}
</style>