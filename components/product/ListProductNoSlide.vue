<template>
  <v-container class="pa-0">
    <v-row>
      <h2 class="primary--text ml-2 d-inline-block" align="start">
        {{ products.length }} Resultado (s) para : "{{ term }}"
      </h2>
    </v-row>
    <v-row class="ma-0" justify="center" justify-md="start">
      <v-col
        class="ma-0 pa-0 d-flex flex-grow-0"
        v-for="(product, index) in products"
        :key="index"
      >
        <Product
          :name="product.name"
          :rating="parseFloat(product.rating)"
          :price="parseFloat(product.price)"
          :sold="parseInt(product.sold)"
          :image="product.image"
          :id="product.id"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from "./Product.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    Product,
  },
  data() {
    return {
      products: [],
    };
  },

  props: {
    term: String,
  },

  async fetch() {
    this.products = await this.$axios
      .$get(`product/search/${this.term}`)
      .catch((e) => console.log(e));

    let categories = [];
    
    this.products.forEach(async (p) => {
        p.categories.forEach((c) => {
          if (categories.indexOf(c) == -1) {
            categories.push(c);
          }
        });
      })
    this.setCategories(categories);
   
  },
  methods: {
    ...mapMutations({
      setCategories: "search/setCategories",
    }),
  },
};
</script>

<style>
</style>