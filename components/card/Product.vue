<template >
    <div>
        <div class="hidden-sm-and-up">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card
                        tag="span"
                        class="d-inline-block my-5 mx-1 pa-1"
                        height="300"
                        outlined
                        :elevation="hover ? 2 : 0"
                        @click="goToProduct"
                    >
                        <nuxt-img
                            height="160"
                            width="160"
                            format="webp"
                            present="product"
                            provider="cloudinary"
                            v-if="image"
                            :src="image"
                        >
                        </nuxt-img>

                        <v-img
                            height="150"
                            width="150"
                            v-else
                            :src="'noImage'"
                        ></v-img>

                       
                        <v-card-title
                            style="width: 150px; heigth: 20px"
                            class="text-body-2 py-2"
                        >
                            {{ name.substring(0, 16) }}
                            {{ name.length > 16 ? "..." : "" }}
                        </v-card-title>

                        <v-card-text
                            style="text-align: start"
                            class="pa-0 pl-2"
                        >
                            <v-row class="mx-0">
                                <v-rating
                                    :value="rating ? rating : 5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="12"
                                ></v-rating>

                                <div
                                    class="grey--text ms-4 text-body-2"
                                    v-if="rating && sold"
                                >
                                    {{
                                        sold >= 1
                                            ? `${rating.toFixed(1)}(${sold})`
                                            : "(5)"
                                    }}
                                </div>
                            </v-row>

                            <ProductPrice
                                :price="price"
                                :size1="'body-2'"
                                :size2="'body-2'"
                            />
                        </v-card-text>
                    </v-card>
                </template>
            </v-hover>
        </div>
        <div class="hidden-xs-only">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card
                        tag="span"
                        class="d-inline-block my-5 mx-2 pa-2"
                        height="450"
                        outlined
                        :elevation="hover ? 2 : 0"
                        @click="goToProduct"
                    >
                        <nuxt-img
                            height="250"
                            width="250"
                            format="webp"
                            present="product"
                            provider="cloudinary"
                            v-if="image"
                            :src="image"
                        ></nuxt-img>

                        <v-img
                            height="250"
                            width="250"
                            v-else
                            :src="'noImage'"
                        ></v-img>
                        <v-divider></v-divider>
                        <v-card-title
                            style="width: 250px; heigth: 20px"
                            class="text-h6 py-2"
                        >
                            {{ name.substring(0, 17) }}
                            {{ name.length > 17 ? "..." : "" }}
                        </v-card-title>

                        <v-card-text style="text-align: start">
                            <v-row class="mx-0">
                                <v-rating
                                    :value="rating ? rating : 5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="16"
                                ></v-rating>

                                <div
                                    class="grey--text ms-4"
                                    v-if="rating && sold"
                                >
                                    {{
                                        sold >= 1
                                            ? `${rating.toFixed(1)}(${sold})`
                                            : "(5)"
                                    }}
                                </div>
                            </v-row>

                            <ProductPrice
                                :price="price"
                                :size1="'body-2'"
                                :size2="'h6'"
                            />
                        </v-card-text>
                    </v-card>
                </template>
            </v-hover>
        </div>
        <!-- 
        
        <div class="hidden-sm-and-up pa-0"></div> -->
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: {
        price: Number,
        name: String,
        rating: Number || NaN,
        image: String,
        id: String,
        sold: Number || NaN,
    },

    methods: {
        ...mapMutations(["setProduct"]),

        goToProduct() {
            this.setProduct(this.id);
            this.$router.push(`/product/${this.name}`);
        },
    },
};
</script>

<style>
</style>