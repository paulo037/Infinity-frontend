<template >
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
                tag="span"
                class="d-inline-block my-5 mx-2 pa-3"
                height="450"
                outlined
                :elevation="hover ? 2 : 0"
                @click="goToProduct"
            >
                <nuxt-img
                    height="260"
                    width="260"
                    format="webp"
                    present="product"
                    provider="cloudinary"
                    v-if="image"
                    :src="image"
                ></nuxt-img>

                <v-img
                    height="260"
                    width="260"
                    v-else
                    :src="'/noImage.png'"
                ></v-img>

                <v-card-title
                    style="width: 250px; heigth: 20px"
                    class="text-h6"
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

                        <div class="grey--text ms-4" v-if="rating && sold">
                            {{
                                sold >= 1
                                    ? `${rating.toFixed(1)}(${sold})`
                                    : "(5)"
                            }}
                        </div>
                    </v-row>

                    <ProductPrice :price="price" :size1="'subtitle-1'" :size2="'h6'" />
                </v-card-text>
            </v-card>
        </template>
    </v-hover>
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