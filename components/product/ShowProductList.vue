<template>
    <v-card max-width="900px" outlined>
        <v-simple-table class="secondary third--text">
            <thead v-if="head">
                <tr>
                    <th class="third--text pl-8">Produto</th>
                    <th class="text-center third--text" v-if="show_rating">
                        Avaliação
                    </th>
                    <th class="text-center third--text hidden-xs-only pa-0">
                        Quantidade
                    </th>
                    <th
                        class="text-left third--text text-center hidden-xs-only"
                    >
                        Preço
                    </th>
                </tr>
            </thead>
            <!-- Para Celular -->
            <tbody class="hidden-sm-and-up pa-0">
                <tr v-for="(item, index) in products" :key="index">
                    <td class="pa-0">
                        <v-card
                            class="d-flex align-start pa-0 ma-2 secondary"
                            flat
                        >
                            <v-container class="d-flex align-start">
                                <router-link :to="`/product/${item.name}`">
                                    <v-img
                                        class="d-inline-block"
                                        :src="item.image"
                                        max-width="80px"
                                        height="80px"
                                    ></v-img>
                                </router-link>
                                <div class="text ml-5">
                                    <span
                                        class="
                                            primary--text
                                            font-weight-bold
                                            text-body-1
                                        "
                                    >
                                        {{ name_formated(item.name) }}
                                    </span>
                                    <span class="text-body-2 font-weight-bold">
                                        <br />
                                        R$:
                                        {{ item.price }}
                                    </span>

                                    <div>
                                        <span>
                                            Quantidade:
                                            {{ item.quantity }}</span
                                        >
                                    </div>
                                    <span>
                                        Cor:
                                        {{ item.color }}
                                    </span>

                                    <div>
                                        Tamanho:
                                        {{ item.size }}
                                    </div>
                                </div>
                            </v-container>
                        </v-card>
                    </td>
                </tr>
            </tbody>
            <!-- Para Computadores -->
            <tbody class="hidden-xs-only">
                <tr v-for="(item, index) in products" :key="index">
                    <td class="pr-0">
                        <v-card
                            class="d-flex align-top py-5 ma-2 secondary"
                            flat
                            max-width=""
                            :to="`/product/${item.name}`"
                        >
                            <v-img
                                class="d-inline-block mx-5 rounded-sm"
                                :src="item.image"
                                max-width="80px"
                                height="80px"
                            ></v-img>

                            <div>
                                <span
                                    class="
                                        primary--text
                                        font-weight-bold
                                        text-body-1
                                    "
                                >
                                    {{ name_formated(item.name) }}
                                </span>
                                <span class="text-subtitle-3">
                                    <br />
                                    Tamanho:
                                    {{ item.size }}
                                </span>

                                <span class="text-subtitle-3">
                                    <br />
                                    Cor:
                                    {{ item.color }}
                                </span>
                            </div>
                        </v-card>
                    </td>

                    <td v-if="show_rating">
                        <div class="text-center">
                            <v-rating
                                :value="item.rating"
                                v-model="rating[index]"
                                color="amber"
                                dense
                                half-increments
                                size="15"
                                class="d-inline-block"
                            ></v-rating>
                        </div>

                        <div class="text-center">
                            <v-btn
                                v-if="item.rating != rating[index]"
                                class="text-center darken3 white--text rounded"
                                @click="avaliate(index)"
                                small
                                width="60px"
                                style="
                                    height: 30px !important;
                                    padding: 0px !important;
                                "
                            >
                                Avaliar
                            </v-btn>
                        </div>
                    </td>
                    <td>
                        <span class="font-weight-light pa-2">
                            {{
                                item.quantity > 1
                                    ? `${item.quantity} unidades`
                                    : `${item.quantity} unidade`
                            }}</span
                        >
                    </td>
                    <td
                        class="
                            hidden-xs-only
                            primary--text
                            text-subtitle-1 text-center
                        "
                    >
                        {{ formatMoney(item.price) }}
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            rating: [],
        };
    },

    fetch() {
        this.rating = this.products.map((p) => p.rating);
    },
    props: {
        products: [],
        head: Boolean,
        show_rating: Boolean,
    },

    methods: {
        name_formated(name) {
            if (name) {
                return name.length > 28 ? name.substring(0, 25) + "..." : name;
            }

            return "";
        },

        formatMoney(value) {
            return `R$ ${value.toFixed(2).toString().replace(".", ",")}`;
        },

        avaliate(index) {
            const rating = this.rating[index];
            this.products[index].rating = rating;
            const id = this.products[index].id;
            this.$axios.$put(`order/rating/${id}`, { rating });
        },
    },
};
</script>

<style scoped>
td {
    text-align: center;
}
</style>