<template>
    <div align="center">
        <v-dialog v-model="preference_loading">
            <v-progress-circular
                indeterminate
                color="blue"
                v-if="preference_loading"
                :size="60"
                style="position: fixed; top: 98px; left: 48%; z-index: 50"
            ></v-progress-circular>
        </v-dialog>

        <SkeletonProductBuy v-if="$fetchState.pending || page_loading" />

        <v-row justify="center" v-else style="max-width: 1600px">
            <v-col cols="12" sm="10" md="5" class="pt-0">
                <v-card outlined class="pa-1" style="max-width: 800px">
                    <div>
                        <v-carousel
                            hide-delimiters
                            style="max-width: 800px; height: auto"
                        >
                            <v-carousel-item
                                v-for="(item, i) in product.images"
                                :key="i"
                            >
                                <v-img
                                    max-height
                                    style="max-width: 800px; max-height: 500px"
                                    :src="item.url"
                                ></v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="10" md="5" class="pt-0">
                <v-card
                    class="third--text pt-3 pb-12"
                    outlined
                    style="max-width: 800px"
                >
                    <h1 class="px-12">{{ product.name }}</h1>
                    <v-row align="center" class="mx-0 justify-center px-12">
                        <v-col class="d-flex justify-center">
                            <v-rating
                                :value="
                                    product.sold >= 1
                                        ? parseFloat(getRating())
                                        : 5
                                "
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                class="d-inline-block"
                            ></v-rating>

                            <div class="grey--text ms-4 d-inline-block pt-1">
                                {{
                                    product.sold >= 1
                                        ? `${parseFloat(
                                              this.product.rating
                                          ).toFixed(1)}(${product.sold})`
                                        : "(5)"
                                }}
                            </div>
                        </v-col>
                    </v-row>

                    <Price
                        :price="parseFloat(product.price)"
                        :size1="'h6'"
                        :size2="'h4'"
                    />

                    <ProductQuantity
                        :max="max"
                        :quantity="quantity"
                        v-on:increment="
                            this.quantity =
                                this.quantity == this.max
                                    ? this.quantity
                                    : this.quantity + 1
                        "
                        v-on:decrement="this.quantity--"
                        class="pb-0"
                    />

                    <v-container class="px-12 py-1">
                        <div class="py-2 px-1 d-inline">Cor:</div>
                        <v-select
                            :items="colors"
                            :disabled="colors.length == 1"
                            item-text="value"
                            class="d-inline-block"
                            dense
                            outlined
                            v-model="color"
                        ></v-select>
                    </v-container>

                    <v-container class="px-0 py-1">
                        <div>Tamanho:</div>
                        <v-btn
                            light
                            rounded
                            color="sencondary"
                            class="rounded-circle ma-2"
                            min-width="30px"
                            min-height="30px"
                            height="30px"
                            width="30px"
                            v-for="size in sizes"
                            :key="size.value"
                            v-bind:class="{
                                'accent secondary--text':
                                    size_selected == indexOfSize(size),
                                white: size_selected != indexOfSize(size),
                            }"
                            @click="size_selected = indexOfSize(size)"
                        >
                            {{ size.value }}
                        </v-btn>
                    </v-container>

                    <v-row justify="space-around">
                        <v-col cols="10" sm="5" md="7" lg="5" class="px-0">
                            <v-btn
                                class="accent white--text"
                                height="50px"
                                append
                                width="200px"
                                block
                                @click="addCart"
                            >
                                <span
                                    class="font-weight-bold"
                                    style="text-align: start"
                                    >adicionar<br />
                                    ao carrinho</span
                                >
                                <v-divider
                                    vertical
                                    class="white mx-2"
                                ></v-divider>
                                <v-icon class="text--end">
                                    mdi-cart-plus
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="10" sm="5" lg="5" md="7" class="px-0">
                            <v-btn
                                class="accent white--text font-weight-bold"
                                block
                                width="200px"
                                height="50px"
                                @click="checkout"
                                :disabled="preference_loading"
                                >COMPRAR
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <v-col cols="12" sm="10" v-if="product.description">
                <v-card outlined class="mt-10" style="max-width: 1600px">
                    <v-card-title class="flex justify-center">
                        Descrição do Produto</v-card-title
                    >
                    <v-card-text
                        style="text-align: initial"
                        v-html="product.description"
                    >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <ListProduct
            class="pt-16"
            v-if="category != null"
            label="Produtos semelhantes"
            :id="category"
        />

    </div>
</template>


<script>
import { mapMutations } from "vuex";
import ListProduct from "@/components/product/ListProduct.vue";
import SkeletonProductBuy from "~/components/product/SkeletonProductBuy.vue";
import Price from "@/components/product/Price.vue";
import ProductQuantity from "@/components/product/ProductQuantity.vue";
import Payment from "~/components/product/Payment.vue";
import { v4 } from "uuid";
import {sign } from "jsonwebtoken";

export default {
    middleware: ["product-view"],

    components: {
        SkeletonProductBuy,
        ListProduct,
        ProductQuantity,
        Price,
        Payment,
    },

    data() {
        return {
            //product properties
            product: {},
            category: null,
            size_selected: 1,
            quantity: 1,
            max: null,
            color: null,

            preferece_id: null,
            preference_loading: false,

            choseAddressModel: null,

            addresses: [],
            selected: [0], //address selected

            page_loading: true,
        };
    },

    mounted() {
        this.page_loading = false;
    },

    async fetch() {
        const product_id = this.$store.state.product_id;

        if (!product_id) {
            this.$router.push("not-found");
            return;
        }

        this.product = await this.$axios.$get(`product/${product_id}`);

        this.category = this.product.categories[0].id;
        this.color = this.product.colors[0].color;
        this.size_selected = this.getSizeSelected();

        if (this.product.images.length === 0)
            this.product.images.push({ url: "/noImage.png" });
    },

    methods: {
        ...mapMutations(["toasted", "SetBack_url"]),

        async checkout() {

            if (!this.$auth.loggedIn) {
                this.toasted({
                    text: "Entre ou crie uma conta para comprar produtos!",
                });
                this.SetBack_url(this.$router.history.current.path);
                return this.$router.push("/login");
            }


            const reference = v4();

            const items = [
                {
                    quantity: this.quantity,
                    product_id: this.product.id,
                    name: this.product.name,
                    price: this.product.price,
                    image: this.product.images[0].url,
                    size: this.product.colors[this.size_selected].size,
                    color: this.product.colors[this.size_selected].color,
                }
            ]
            

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
                query: { reference: reference, type: "unique" },
            });
        },

       

        addCart() {
            if (!this.$auth.loggedIn) {
                this.toasted({
                    text: "Entre ou crie uma conta para adicionar produtos ao carrinho!",
                });

                this.SetBack_url(this.$router.history.current.path);

                return this.$router.push("/login");
            }
            const newCart = {
                user_id: this.$auth.user.id,
                product_id: this.product.id,
                size_id: this.choice.size_id,
                color_id: this.choice.color_id,
                quantity: this.quantity,
            };

            this.$axios
                .post("/cart", { cart: newCart })
                .then(() => {
                    this.toasted({
                        text: `${this.$route.params.name} adicionado ao carrinho!`,
                        color: "success",
                    });
                    this.$store.commit("addNumberOfProductsInCart");
                })
                .catch((e) =>
                    this.toasted({
                        text: e.response.data ? e.response.data : e,
                    })
                );
        },

        getRating() {
            return this.product.rating
                ? parseFloat(this.product.rating).toFixed(1)
                : 5;
        },

        getSizeSelected() {
            this.product.colors.sort(
                (a, b) => b.size.charCodeAt(0) - a.size.charCodeAt(0)
            );

            let items = this.product.colors.find(
                (item) => item.color === this.color
            );
            return this.product.colors.indexOf(items);
        },

        getColor() {
            this.product.colors.sort(
                (a, b) => b.size.charCodeAt(0) - a.size.charCodeAt(0)
            );

            let items = this.product.colors.find(
                (item) => item.color === this.color
            );
            return items[0].color;
        },

        indexOfSize(size) {
            let item = this.product.colors.find(
                (item) => item.size_id === size.id && item.color === this.color
            );
            return this.product.colors.indexOf(item);
        },
    },

    watch: {
        size_selected() {
            if (!this.colors) return;
            this.max = this.choice.quantity;
            this.quantity = 1;
        },

        color() {
            this.size_selected = this.getSizeSelected();

            if (!this.colors) return;

            this.max = this.choice.quantity;
            this.quantity = 1;
        },
    },

    computed: {
        colors() {
            let colors = [];

            if (this.product.colors) {
                this.product.colors.forEach((item) => {
                    if (!colors.find((color) => color.value == item.color)) {
                        colors.push({
                            value: item.color,
                            id: item.color_id,
                        });
                    }
                });
            }

            return colors;
        },

        sizes() {
            let sizes = [];
            if (this.product.colors) {
                this.product.colors.forEach((item) => {
                    if (
                        item.color === this.color &&
                        !sizes.find((size) => size.value == item.size)
                    ) {
                        sizes.push({ value: item.size, id: item.size_id });
                    }
                });
            }
            sizes = sizes.sort((a, b) => {
                return b.value.charCodeAt(0) - a.value.charCodeAt(0);
            });

            return sizes;
        },

        choice() {
            let choice = this.product.colors.find(
                (item) =>
                    item.color === this.color &&
                    item.size_id ==
                        this.product.colors[this.size_selected].size_id
            );

            return choice;
        },
    },
};
</script>

<style>
.did {
    background-color: aqua;
    color: #000;
}

.v-carousel__item {
    height: auto !important;
    max-width: 800px !important;
}
</style>