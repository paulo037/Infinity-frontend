<template>
    <div>
        <client-only>
            <div align="center" v-if="products.length == 0 && !page_loading">
                <v-card
                    align="center"
                    max-width="500px"
                    class="secondary mx-8 pa-8 justify-center my-16"
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

            <div align="center" v-else-if="!page_loading">
                <v-card
                    max-width="900px"
                    class="secondary mx-8 mb-16 pa-2"
                    elevation="5"
                    outlined
                >
                    <div class="primary--text secondary py-2">
                        <span class="text-h5"> Carrinho | </span>
                        <v-icon class="primary--text pb-2">mdi-cart</v-icon>
                    </div>
                    <v-divider
                        class=""
                        style="
                            border-bottom: thin solid rgba(255, 255, 255, 0.12);
                        "
                    ></v-divider>

                    <v-simple-table class="secondary third--text mb-5 mt-5">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left third--text px-8">
                                        PRODUTO
                                    </th>

                                    <th
                                        class="text-left third--text hidden-xs-only pa-0"
                                    >
                                        QUANTIDADE
                                    </th>
                                    <th
                                        class="text-left third--text text-center hidden-xs-only"
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
                                            class="d-flex align-start pa-0 ma-2 secondary"
                                            flat
                                        >
                                            <v-container
                                                class="d-flex align-start"
                                            >
                                                <router-link
                                                    :to="`/product/${item.name}`"
                                                >
                                                    <nuxt-img
                                                        class="d-inline-block"
                                                        :src="item.image"
                                                        max-width="80px"
                                                        height="80px"
                                                        :provider="
                                                            item.provider ||
                                                            'cloudinary'
                                                        "
                                                    ></nuxt-img>
                                                </router-link>
                                                <div class="text ml-5">
                                                    <span
                                                        class="primary--text font-weight-bold text-body-1"
                                                    >
                                                        {{
                                                            item.name.length >
                                                            28
                                                                ? item.name.substring(
                                                                      0,
                                                                      22
                                                                  ) + "..."
                                                                : item.name
                                                        }}
                                                    </span>

                                                    <span>
                                                        <br />
                                                        R$
                                                        {{
                                                            (item.price * 1)
                                                                .toFixed(2)
                                                                .replace(
                                                                    ".",
                                                                    ","
                                                                )
                                                        }}
                                                    </span>

                                                    <div>
                                                        <v-icon
                                                            color="sencondary"
                                                            class="accent rounded-circle"
                                                            :disabled="
                                                                item.quantity <=
                                                                1
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
                                                            class="font-weight-light pa-2"
                                                            v-text="
                                                                item.quantity
                                                            "
                                                        ></span>
                                                        <v-icon
                                                            color="sencondary"
                                                            class="accent rounded-circle"
                                                            small
                                                            @click="
                                                                increment(index)
                                                            "
                                                            link
                                                        >
                                                            mdi-plus
                                                        </v-icon>
                                                    </div>
                                                    <span>
                                                        Cor: {{ item.color }}
                                                    </span>

                                                    <div>
                                                        Tamanho:
                                                        {{ item.size }}
                                                    </div>
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
                                            class="d-flex align-top py-5 ma-2 secondary"
                                            width="260px"
                                            flat
                                            :to="`/product/${item.name}`"
                                        >
                                            <nuxt-img
                                                class="d-inline-block mx-5 rounded-sm"
                                                :src="item.image"
                                                max-width="80px"
                                                height="80px"
                                                :provider="
                                                    item.provider ||
                                                    'cloudinary'
                                                "
                                            ></nuxt-img>
                                            <div>
                                                <span
                                                    class="primary--text font-weight-bold text-body-1"
                                                >
                                                    {{
                                                        item.name.length > 25
                                                            ? item.name.substring(
                                                                  0,
                                                                  22
                                                              ) + "..."
                                                            : item.name
                                                    }}
                                                </span>
                                                <span class="text-subtitle-3">
                                                    <br />
                                                    Tamanho: {{ item.size }}
                                                </span>

                                                <span class="text-subtitle-3">
                                                    <br />
                                                    Cor: {{ item.color }}
                                                </span>
                                            </div>
                                        </v-card>
                                    </td>

                                    <td class="hidden-xs-only pa-0">
                                        <v-icon
                                            color="sencondary"
                                            class="accent rounded-circle"
                                            :disabled="
                                                item.quantity <= 1
                                                    ? true
                                                    : false
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
                                        class="hidden-xs-only primary--text text-subtitle-1 text-center"
                                    >
                                        R$
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

                    <v-divider
                        class=""
                        style="
                            border-bottom: thin solid rgba(255, 255, 255, 0.12);
                        "
                    ></v-divider>

                    <v-card
                        max-width="400px"
                        class="my-10 third--text pa-2"
                        outlined
                    >
                        <v-row>
                            <v-col>
                                <v-row> Sub-total </v-row>
                                <v-row>Frete Estimado</v-row>
                                <v-row
                                    v-for="(item, index) in calcDiscount"
                                    :key="index"
                                    cols="12"
                                >
                                    <div v-if="item > 0">Desconto</div>
                                </v-row>
                            </v-col>

                            <v-col>
                                <v-row class="justify-end">
                                    {{ getPrice(calculateAmount) }}
                                </v-row>

                                <v-row class="justify-end">
                                    +{{
                                        getPrice(
                                            (calculateAmount >= 200 ? 0 : 25)
                                                
                                        )
                                    }}</v-row
                                >
                                <v-row
                                    v-for="(item, index) in calcDiscount"
                                    :key="index"
                                    class="justify-end"
                                    cols="12"
                                >
                                
                                    <div v-if="item > 0">
                                        -{{ getPrice(item) }}
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
                                            calculateAmount -
                                                disccountAmount +
                                                (calculateAmount >= 200
                                                    ? 0
                                                    : 25)
                                        )
                                    }}
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>


                    <v-divider
                        class="mb-5"
                        style="
                            border-bottom: thin solid rgba(255, 255, 255, 0.12);
                        "
                    ></v-divider>
                    <div>
                        <div
                                    class="d-flex align-center justify-center green2--text font-weight-bold"
                                >
                                    {{
                                        disccountAmount > 0
                                            ? "Comprando agora você economiza " +
                                            getPrice(disccountAmount) +
                                              "!"
                                            : ""
                                    }}
                                </div>
                        <div style="max-width: 400px" >
                            <div
                                class="d-flex align-center justify-center green2--text font-weight-bold"
                            >
                            
                                                
                                <span v-if="200 - (calculateAmount - disccountAmount ) > 0">
                                    Por mais
                                    {{ getPrice(200 - (calculateAmount - disccountAmount )) }}
                                    o frete é grátis!
                                </span>
                                <span v-else>
                                    Comprando agora o frete é grátis!
                                </span>
                                <div
                                    class="d-flex align-center pl-2"
                                    style="width: 50px"
                                >
                                    <svg
                                        width="50"
                                        height="28"
                                        viewBox="0 0 50 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 3.78947C18 2.80117 18.6805 2 19.52 2H35.48C36.3195 2 37 2.80117 37 3.78947V19H26.2175L24.46 17.2105L23.32 17.6579L21.8 19H18V3.78947Z"
                                            fill="#64DD17"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M42.0106 7.03226H37.9V11.1613H40.6L40.15 16.8387L39.25 18.3871L39.7 20.4516L42.2496 21.6216L43.75 18.3871V18.3871L40.15 16.8387L40.6 11.1613H44.2L42.0106 7.03226ZM42.4783 6H37V19.4194H38.8L39.25 20.9677L40.6 22L42.85 21.4839L44.2 19.4194H46V11.7512L42.4783 6Z"
                                            fill="#64DD17"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24 20.5C24.8284 20.5 25.5 19.8284 25.5 19C25.5 18.1716 24.8284 17.5 24 17.5C23.1716 17.5 22.5 18.1716 22.5 19C22.5 19.8284 23.1716 20.5 24 20.5ZM24 22C25.6569 22 27 20.6569 27 19C27 17.3431 25.6569 16 24 16C22.3431 16 21 17.3431 21 19C21 20.6569 22.3431 22 24 22Z"
                                            fill="#64DD17"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M41 20.5C41.8284 20.5 42.5 19.8284 42.5 19C42.5 18.1716 41.8284 17.5 41 17.5C40.1716 17.5 39.5 18.1716 39.5 19C39.5 19.8284 40.1716 20.5 41 20.5ZM41 22C42.6569 22 44 20.6569 44 19C44 17.3431 42.6569 16 41 16C39.3431 16 38 17.3431 38 19C38 20.6569 39.3431 22 41 22Z"
                                            fill="#64DD17"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18 4L5 4V3L18 3V4Z"
                                            fill="#64DD17"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18 9L9 9V8L18 8V9Z"
                                            fill="#64DD17"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18 14L13 14V13L18 13V14Z"
                                            fill="#64DD17"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-container class="text-center text-h5 primary--text">
                        <v-btn class="accent white--text" @click="checkout"
                            >Comprar Agora
                        </v-btn>
                    </v-container>
                </v-card>
            </div>
        </client-only>

        <div align="center" v-if="page_loading">
            <v-card max-width="900px" class="pa-2">
                <v-card class="primary--text secondary py-2">
                    <span class="text-h5"> CARRINHO | </span>
                    <v-icon class="primary--text pb-3">mdi-cart</v-icon>
                </v-card>
                <v-divider class="third"></v-divider>
                <v-skeleton-loader
                    class="mx-auto"
                    type="image"
                ></v-skeleton-loader>
            </v-card>
        </div>
    </div>
</template>


<script>
import { v4 } from "uuid";
import { sign } from "jsonwebtoken";

export default {
    middleware: ["loggedIn"],

    data() {
        return {
            products: [],
            choseAddressModel: false,
            addresses: [],
            selected: [0],
            page_loading: true,
            promotions: [],
        };
    },

    async fetch() {
        this.products = await this.$axios.$get(`cart`);
        this.promotions = await this.$axios.$get(`promotions`);

        this.page_loading = false;
    },

    methods: {
        getPrice(amount) {
            return ` R$ ${amount.toFixed(2).replace(".", ",")}`;
        },

        async checkout() {
            if (!this.$auth.loggedIn) {
                this.$toasted({
                    text: "Entre ou crie uma conta para comprar produtos!",
                });
                this.$store.commit(
                    "setBack_url",
                    this.$router.history.current.path
                );
                return this.$router.push("/login");
            }

            const reference = v4();

            let items = [];

            this.products.forEach((p) => {
                items.push({
                    product_id: p.product_id,
                    quantity: p.quantity,
                    size: p.size,
                    color: p.color,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    categories: p.categories,
                });
            });



            this.$cookies.set("reference", reference, {
                path: "/",
                maxAge: 60 * 60 * 3,
            });

            this.$store.commit("setItems", items);

            await this.$router.push({
                path: "/checkout",
                query: { reference: reference, type: "cart" },
            });
        },

        async decrement(index) {
            const cart = {
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
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
        },

        async increment(index) {
            const quantity = this.products[index].quantity;
            const cart = {
                product_id: this.products[index].product_id,
                size_id: this.products[index].size_id,
                color_id: this.products[index].color_id,
                quantity: this.products[index].quantity + 1,
            };

            await this.$axios
                .put("/cart", { cart: cart })
                .then(() => {
                    if (this.products[index].quantity == quantity) {
                        this.products[index].quantity++;
                    }
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
        },

        changeActive(index) {
            this.active = index;
        },

        async deleteProduct(index) {
            const cart = {
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
                    this.$toasted({
                        text: `O produto ${name} foi removido do carrinho`,
                        color: "success",
                    });
                    this.products.splice(index, 1);
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

    computed: {
        calculateAmount() {
            let amout = 0;
            this.products.map(
                (product) => (amout += product.price * product.quantity)
            );
            return amout;
        },

        disccountAmount() {
            let amount = 0;
            const keysArray = Object.keys(this.calcDiscount);
            for (const key of keysArray) {
                amount += this.calcDiscount[key];
            }
            return amount;
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
    },
};
</script>

<style >
tr:hover {
    background-color: transparent !important;
}

.disccount .col {
    padding: 2px;
}
</style>