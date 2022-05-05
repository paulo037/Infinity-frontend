<template>
  <div align="center">
    <v-row justify="center" class="pb-16">
      <v-col cols="10" md="5">
        <div style="max-width: 800px">
          <v-card width="500" outlined class="pa-1">
            <v-carousel hide-delimiters width="400" height="400">
              <v-carousel-item
                v-for="(item, i) in product.images"
                :key="i"
                :src="item.url"
                width="500"
                height="500"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </div>

        <v-card outlined class="d-none d-md-block mt-10" max-width="500px">
          <v-card-title class="flex justify-center"> Descrição</v-card-title>

          <v-card-text>
            {{ product.description }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="10" md="5">
        <v-card class="third--text pa-12" outlined max-width="800px">
          <h1 class="pb-2">{{ product.name }}</h1>
          <v-row align="center" class="mx-0 py-2 justify-center">
            <v-col class="d-flex justify-center">
              <v-rating
                :value="product.sold >= 1 ? parseFloat(getRating()) : 5"
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
                    ? `${parseFloat(this.product.rating).toFixed(1)}(${
                        product.sold
                      })`
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
            v-on:increment="increment"
            v-on:decrement="decrement"
          />

          <v-container class="px-0">
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
              v-for="(size, index) in product.sizes"
              :key="size.value"
              v-bind:class="{
                'accent secondary--text': active == index,
                white: active != index,
              }"
              @click="active = index"
            >
              {{ size.value }}
            </v-btn>
          </v-container>
          <v-row class="pt-5" justify="space-between">
            <v-col cols="12" sm="5" md="12" lg="5" class="px-0">
              <v-btn
                class="primary secondary--text"
                height="50px"
                to="/cart"
                append
                nuxt
                width="200px"
                block
              >
                <span style="text-align: start"
                  >adicionar<br />
                  ao carrinho</span
                >
                <v-divider vertical class="secondary mx-2"></v-divider>
                <v-icon class="text--end"> mdi-cart </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="5" lg="5" md="12" class="px-0">
              <v-btn
                class="primary secondary--text"
                block
                width="200px"
                height="50px"
                @click="buy"
                >COMPRAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="10" md="5" class="d-md-none d-block">
        <v-card outlined class="mt-10" max-width="500px">
          <v-card-title class="flex justify-center"> Descrição</v-card-title>

          <v-card-text>
            {{ product.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ListProduct label="Relacionados" :id="category" />
  </div>
</template>

<script>
import ListProduct from "@/components/product/ListProduct.vue";
import Price from "@/components/product/Price.vue";
import ProductQuantity from "@/components/product/ProductQuantity.vue";
export default {
  scrollToTop: true,

  components: {
    ListProduct,
    ProductQuantity,
    Price,
  },
  data() {
    return {
      category: 2,
      snackbar: false,
      timeout: 1100,
      active: null,
      quantity: 1,
      max: null,
      price: 60,
      product: {},
    };
  },

  async fetch() {
    this.product = await this.$axios.$get(
      `http://localhost:8080/product/${this.$route.params.id}`
    );
    this.active = 0;
    console.log(this.product.categories[0].id)
    this.category = this.product.categories[0].id
  },

  methods: {
    buy() {
      console.log(this.quantity);
    },
    decrement() {
      this.quantity--;
    },
    increment() {
      if (this.quantity == this.max) {
        this.snackbar = true;
        console.log("true");
        return;
      }
      this.quantity++;
    },
    getRating() {
      return this.product.rating
        ? parseFloat(this.product.rating).toFixed(1)
        : 5;
    },
  },

  watch: {
    active() {
      this.max = this.product.sizes[this.active].quantity;
      this.quantity = 1;
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