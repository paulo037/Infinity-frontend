<template>
  <div align="center">
    <v-card max-width="80%" class="secondary  pa-8" elevation="20">
      <v-layout row wrap align-top justify-space-around>
        <v-flex md6 sm12>
          <v-carousel hide-delimiters height="400">
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              width="400"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex md6 sm12>
          <v-card class="secondary third--text pa-12" elevation="8">
            <h1>{{ name }}</h1>
            <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <h2 class="my-4 text-h4">
              R$: {{ value.toFixed(2).replace(".", ",") }}
            </h2>
            <v-container>
              <div class="pa-2">Quantidade:</div>
              <v-icon
                color="sencondary"
                class="accent rounded-circle"
                :disabled="quantity == 1 ? true : false"
                @click="decrement"
              >
                mdi-minus
              </v-icon>

              <span class="font-weight-light ma-5" v-text="quantity"></span>
              <v-icon
                color="sencondary"
                class="accent rounded-circle"
                @click="increment"
              >
                mdi-plus
              </v-icon>
            </v-container>

            <v-container>
              <div class="pa-2">Tamanho:</div>
              <v-btn
                light
                rounded
                color="sencondary"
                class="rounded-circle ma-2"
                min-width="30px"
                min-height="30px"
                height="30px"
                width="30px"
                v-for="(size, index) in sizes"
                :key="size"
                v-bind:class="{
                  'primary secondary--text': active == index,
                  third: active != index,
                }"
                @click="changeActive(index)"
              >
                {{ size }}
              </v-btn>
            </v-container>
            <v-btn class="primary secondary--text" block height="50px"
              >COMPRAR
            </v-btn>

            <v-btn
              class="my-5 primary secondary--text pa-5"
              height="50px"
              to="/my-cart"
              block
            >
              <div class="text-subtitle-2">
                adicionar <br class="hidden-sm-and-up" />
                ao carrinho <br class="hidden-sm-and-up" />
              </div>
              <v-divider class="mx-4" vertical></v-divider>
              <v-icon> mdi-cart </v-icon>
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <ListProduct label="Relacionados" />
  </div>
</template>

<script>
import ListProduct from "@/components/product/ListProduct.vue";
export default {
    scrollToTop: true,
   
  components: {
    ListProduct,
  },
  data() {
    return {
      active: 0,
      quantity: 1,
      value: 60,
      name: "Blusa Básica",
      rating: 5,
      price: 60,
      sizes: ["p", "m", "g", "gg"],
      items: [
        {
          src: "https://img.ltwebstatic.com/images3_pi/2021/10/20/163469596627a68c90e7d65a7c12daf5d145ef97ad_thumbnail_600x.webp",
        },
        {
          src: "https://static.netshoes.com.br/produtos/camisa-selecao-brasil-iii-1920-sn-torcedor-nike-masculina/14/HZM-0866-014/HZM-0866-014_zoom1.jpg?ts=1639673308",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    decrement() {
      this.quantity--;
    },
    increment() {
      this.quantity++;
    },
    changeActive(index) {
      this.active = index;
    },
  },
};
</script>

<style>
.did {
  background-color: aqua;
  color: #000;
}
</style>