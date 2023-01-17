<template>
    <v-row class="justify-center align-center">
        <v-col cols="12" md="11" align="center" class="pa-2">
            <SkeletonProductBuy v-if="$fetchState.pending || page_loading" />
            <v-card v-else style="max-width: 1600px; height: auto" class="pa-1" >
                <v-row justify="center" eager>
                    <v-col
                        cols="12"
                        sm="10"
                        md="7"
                        class="d-flex justify-center"
                    >
                        <v-item-group
                            v-model="selected"
                            class="mr-5 hidden-sm-and-down"
                            center-active
                        >
                            <v-item v-if="view > 0">
                                <v-icon large @click="view -= 5"
                                    >mdi-arrow-up-drop-circle-outline</v-icon
                                >
                            </v-item>

                            <v-item v-for="(item, i) in images" :key="i">
                                <v-card
                                    outlined
                                    class="pa-0-8 d-flex justify-center my-2"
                                    rounded="md"
                                    style="
                                        height: 6vw;
                                        width: 6vw;
                                        max-width: 60px;
                                        max-height: 60px;
                                    "
                                    @click="
                                        selected = product.images.indexOf(item)
                                    "
                                    :style="
                                        selected == product.images.indexOf(item)
                                            ? 'border: 2px solid rgba(239,108,0,0.85)'
                                            : ''
                                    "
                                >
                                    <nuxt-img
                                        sizes="xs:5vw sm:5vw md:5vw lg:5vw xl:80px"
                                        :src="item.url"
                                        :provider="item.provider || 'static'"
                                        class="rounded-md"
                                        format="webp"
                                    >
                                    </nuxt-img>
                                </v-card>
                            </v-item>

                            <v-item
                                v-if="product.images.length - (view + 5) > 0"
                            >
                                <v-card
                                    outlined
                                    class="
                                        pa-0-8
                                        d-flex
                                        justify-center
                                        my-2
                                        align-center
                                    "
                                    rounded="md"
                                    style="
                                        height: 6vw;
                                        width: 6vw;
                                        max-width: 60px;
                                        max-height: 60px;
                                    "
                                    @click="view += 5"
                                >
                                    <v-card-title class="pa-0 grey--text">
                                        +
                                        {{ product.images.length - (view + 5) }}
                                    </v-card-title>
                                </v-card>
                            </v-item>

                            <v-item
                                v-if="product.images.length - (view + 5) > 0"
                            >
                                <v-icon large @click="view += 5"
                                    >mdi-arrow-down-drop-circle-outline</v-icon
                                >
                            </v-item>
                        </v-item-group>

                        <div class="flex-grow-1">
                            <v-carousel
                                hide-delimiters
                                style="height: auto !important"
                                v-model="selected"
                            >
                                <v-carousel-item
                                    v-for="(item, i) in product.images"
                                    :key="i"
                                    class=""
                                    eager
                                >
                                    <nuxt-img
                                        :src="item.url"
                                        :provider="item.provider"
                                        sizes="xs:80vw sm:60vw md:35vw lg:35vw xl:500px"
                                        ref="images"
                                        :style="
                                            item.provider == 'static'
                                                ? 'width:80%'
                                                : ''
                                        "
                                    >
                                    </nuxt-img>
                                </v-carousel-item>
                            </v-carousel>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="10" class="hidden-md-and-up">
                        <v-item-group
                            v-model="selected"
                            class="d-flex justify-center"
                        >
                            <v-item v-if="view > 0">
                                <v-icon @click="view -= 5"
                                    >mdi-arrow-left-drop-circle-outline</v-icon
                                >
                            </v-item>

                            <v-item v-for="(item, i) in images" :key="i">
                                <v-card
                                    outlined
                                    class="pa-0-8 d-flex justify-center mx-1"
                                    rounded="md"
                                    style="
                                        height: 10vw;
                                        width: 10vw;
                                        max-width: 60px;
                                        max-height: 60px;
                                    "
                                    @click="
                                        selected = product.images.indexOf(item)
                                    "
                                    :style="
                                        selected == product.images.indexOf(item)
                                            ? 'border: 2px solid rgba(239,108,0,0.85)'
                                            : ''
                                    "
                                >
                                    <nuxt-img
                                        sizes="xs:5vw sm:5vw md:5vw lg:5vw xl:80px"
                                        :src="item.url"
                                        :provider="item.provider"
                                        class="rounded-md"
                                        format="webp"
                                    >
                                    </nuxt-img>
                                </v-card>
                            </v-item>

                            <v-item
                                v-if="product.images.length - (view + 4) > 0"
                            >
                                <v-card
                                    outlined
                                    class="
                                        pa-0-8
                                        d-flex
                                        justify-center
                                        mx-1
                                        align-center
                                    "
                                    rounded="md"
                                    style="
                                        height: 10vw;
                                        width: 10vw;
                                        max-width: 60px;
                                        max-height: 60px;
                                    "
                                    @click="view += 5"
                                >
                                    <v-card-title class="pa-0 grey--text">
                                        +
                                        {{ product.images.length - (view + 5) }}
                                    </v-card-title>
                                </v-card>
                            </v-item>
                            <v-item
                                v-if="product.images.length - (view + 4) > 0"
                            >
                                <v-icon @click="view += 5"
                                    >mdi-arrow-right-drop-circle-outline</v-icon
                                >
                            </v-item>
                        </v-item-group></v-col
                    >
                    <v-col cols="12" sm="10" md="5">
                        <v-card
                            class="third--text pt-3 pb-12 pa-5"
                            outlined
                            style="max-width: 500px"
                        >
                            <h1 class="">{{ product.name }}</h1>
                            <v-row
                                align="center"
                                class="mx-0 justify-center px-12"
                            >
                                <v-col class="d-flex justify-center">
                                    <v-rating
                                        :value="
                                            product.rating ? product.rating : 5
                                        "
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="20"
                                        class="d-inline-block"
                                    ></v-rating>

                                    <div
                                        class="
                                            grey--text
                                            ms-4
                                            d-inline-block
                                            pt-1
                                        "
                                    >
                                        {{
                                            product.rating
                                                ? `${product.rating.toFixed(
                                                      1
                                                  )}(${product.sold})`
                                                : "(5)"
                                        }}
                                    </div>
                                </v-col>
                            </v-row>

                            <ProductPrice
                                :price="product.price"
                                :size1="'h6'"
                                :size2="'h4'"
                            />

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
                                                size_selected ==
                                                indexOfSize(size),
                                            white:
                                                size_selected !=
                                                indexOfSize(size),
                                        }"
                                        @click="
                                            size_selected = indexOfSize(size)
                                        "
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
                                            {{
                                                formatMoney(200 - product.price)
                                            }}
                                            o frete é grátis!
                                        </span>
                                        <span v-else>
                                            Comprando agora o frete é grátis!
                                        </span>
                                        <div
                                            class="d-flex align-center pl-2"
                                            style="width: 50px"
                                        >
                                            <span
                                                class="
                                                    d-flex
                                                    align-end
                                                    flex-column
                                                "
                                            >
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
                                <span
                                    class="text-h6 red--text font-weight-bold"
                                >
                                    Produto Esgotado!
                                </span>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="10" v-if="product.description">
                        <v-card
                            outlined
                            text
                            class="mt-10"
                            style="max-width: 1600px"
                        >
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
            </v-card>

            <ListProduct
                class="pt-16"
                v-if="category != null"
                label="Produtos semelhantes"
                :name="category"
            />
        </v-col>
    </v-row>
</template>


<script>
import { mapMutations } from "vuex";
import { v4 } from "uuid";
import { sign } from "jsonwebtoken";

export default {
    middleware: ["product-view"],

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
            view: 0,

            preferece_id: null,

            choseAddressModel: null,

            selected: 0, //address selected

            page_loading: true,
            imageLoad: [],

            model: null,
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
                this.product.images.push({
                    url: "/noImage.png",
                    provider: "static",
                });
        }

        this.imageLoad = this.product.images.map(() => false);
    },

    methods: {
        loaded(i) {
            this.$refs.loading[i].$el.style = "display: none !important";
            // this.$refs.images[i].$el.style = "display: block !important";
        },

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

        view() {
            this.selected = this.view;
        },

        selected() {
            this.view =
                this.selected > this.view + 4 ? this.view + 5 : this.view;
            this.view = this.selected < this.view ? this.view - 5 : this.view;
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

        images() {
            const product = this.product;
            const view = this.view;
            return this.product.images.filter(function (x) {
                const index = product.images.indexOf(x);
                return index >= view && index <= view + 4;
            });
        },
    },
};
</script>

<style>
.did {
    background-color: aqua;
    color: #000;
}

.v-image {
    height: auto !important;
}
</style>