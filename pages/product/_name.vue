<template>
    <div align="center">
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
                                    style="max-width: 800px; max-height: 500px; min-height:500px"
                                    :src="item.url"
                                >
                                    <template v-slot:placeholder>
                                        <v-row
                                            class="fill-height ma-0"
                                            align="center"
                                            justify="center"
                                        >
                                            <v-progress-circular
                                                indeterminate
                                                color="primary"
                                            ></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="10" md="5" class="pt-0">
                <v-card
                    class="third--text pt-3 pb-12 pa-5"
                    outlined
                    style="max-width: 800px"
                >
                    <h1 class="px-12">{{ product.name }}</h1>
                    <v-row align="center" class="mx-0 justify-center px-12">
                        <v-col class="d-flex justify-center">
                            <v-rating
                                :value="product.rating ? product.rating : 5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                class="d-inline-block"
                            ></v-rating>

                            <div class="grey--text ms-4 d-inline-block pt-1">
                                {{
                                    product.rating
                                        ? `${product.rating.toFixed(1)}(${
                                              product.sold
                                          })`
                                        : "(5)"
                                }}
                            </div>
                        </v-col>
                    </v-row>

                    <Price :price="product.price" :size1="'h6'" :size2="'h4'" />

                    <div v-if="product.colors.length > 0">
                        <ProductQuantity
                            :max="max"
                            :quantity="quantity"
                            v-on:increment="increment"
                            v-on:decrement="decrement"
                            class="pb-0"
                        />

                        <v-container class="px-12 py-1">
                            <div class="py-2 px-1 d-inline">Cor:</div>
                            <v-select
                                :items="colors"
                                :disabled="colors.length == 1"
                                item-text="value"
                                class="d-inline-block no-details pt-1"
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
                                min-width="26px"
                                min-height="26px"
                                height="26px"
                                width="26px"
                                style="padding: 16px !important"
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
                        <div style="max-width: 400px">
                            <div
                                class="
                                    d-flex
                                    align-center
                                    justify-center
                                    green2--text
                                    font-weight-bold
                                "
                            >
                                <span v-if="200 - product.price > 0">
                                    Por mais
                                    {{ formatMoney(200 - product.price) }}
                                    o frete é grátis!
                                </span>
                                <span v-else>
                                    Comprando agora o frete é grátis!
                                </span>
                                <div
                                    class="d-flex align-center pl-2"
                                    style="width: 50px"
                                >
                                    <span class="d-flex align-end flex-column">
                                        <v-divider
                                            class="green2"
                                            style="width: 15px"
                                        ></v-divider>
                                        <v-divider
                                            class="green2 mt-1"
                                            style="width: 10px"
                                        ></v-divider>
                                        <v-divider
                                            class="green2 mt-1"
                                            style="width: 5px"
                                        ></v-divider>
                                    </span>
                                    <span>
                                        <v-icon
                                            class="
                                                display-inline-block
                                                green2--text
                                            "
                                            >mdi-truck</v-icon
                                        >
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style="max-width: 300px">
                            <v-btn
                                block
                                style=""
                                class="
                                    accent
                                    white--text
                                    font-weight-bold
                                    pa-5
                                    my-1
                                "
                                @click="checkout"
                                >Comprar agora
                            </v-btn>

                            <v-btn
                                class="pa-5 my-1 white--text"
                                color="rgba(239,108,0,0.85)"
                                append
                                block
                                @click="addCart"
                            >
                                <span
                                    class="font-weight-bold"
                                    style="text-align: start"
                                    >Adicionar<br />
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
                        </div>
                    </div>

                    <div class="my-16" v-else>
                        <span class="text-h6 red--text font-weight-bold">
                            Produto Esgotado!
                        </span>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="10" v-if="product.description">
                <v-card outlined text class="mt-10" style="max-width: 1600px">
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
            :name="category"
        />
    </div>
</template>


<script>
import { mapMutations } from "vuex";
import ListProduct from "@/components/product/ListProduct.vue";
import SkeletonProductBuy from "~/components/product/SkeletonProductBuy.vue";
import Price from "@/components/product/Price.vue";
import ProductQuantity from "@/components/product/ProductQuantity.vue";
import { v4 } from "uuid";
import { sign } from "jsonwebtoken";

export default {
    middleware: ["product-view"],

    components: {
        SkeletonProductBuy,
        ListProduct,
        ProductQuantity,
        Price,
    },

    data() {
        return {
            //product properties
            product: {
                colors: [],
            },
            category: null,
            size_selected: 1,
            quantity: 1,
            max: null,
            color: null,

            preferece_id: null,

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

        if (this.product.colors.length > 0) {
            this.color = this.product.colors[0].color;
            this.size_selected = this.getSizeSelected();
            if (this.product.categories.length > 0) {
                this.category = this.product.categories[0].name;
            }
            if (this.product.images.length === 0)
                this.product.images.push({ url: "/noImage.png" });
        }
    },

    methods: {
        ...mapMutations(["toasted", "SetBack_url"]),

        formatMoney(value) {
            return `R$ ${value.toFixed(2).toString().replace(".", ",")}`;
        },

        async checkout() {
            if (!this.$auth.loggedIn) {
                this.$toasted({
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
                },
            ];

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
                this.$toasted({
                    text: "Entre ou crie uma conta para adicionar produtos ao carrinho!",
                });

                this.SetBack_url(this.$router.history.current.path);

                return this.$router.push("/login");
            }
            const newCart = {
                product_id: this.product.id,
                size_id: this.choice.size_id,
                color_id: this.choice.color_id,
                quantity: this.quantity,
            };

            this.$axios
                .post("/cart", { cart: newCart })
                .then(() => {
                    this.$toasted({
                        text: `${this.$route.params.name} adicionado ao carrinho!`,
                        color: "success",
                    });
                    this.$store.commit("addNumberOfProductsInCart");
                    return this.$router.push("/cart");
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
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

        increment() {
            this.quantity =
                this.quantity == this.max ? this.quantity : this.quantity + 1;
        },

        decrement() {
            this.quantity =
                this.quantity > 1 ? this.quantity - 1 : this.quantity;
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