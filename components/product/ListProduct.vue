<template>
  <div>
    <h2 class="primary--text ml-10 d-inline-block" align="start">
      {{ label }}
    </h2>
    <div>
      <v-sheet color="secondary" >
        <v-slide-group class="" show-arrows="desktop" >
          <v-slide-item v-for="(product, index) in products" :key="index">
            <Product
              :name="product.name"
              :rating="parseFloat(product.rating)"
              :price="parseFloat(product.price)"
              :sold="parseInt(product.sold)"
              :image="product.image"
              :id="product.id"
            />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";
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
    id: Number,
    label: String,
  },

  async fetch() {
    this.products = await this.$axios
      .$get(`product/category/${this.id}`)
      .catch((e) => console.log(e));
  },
};
</script>

<style>
</style>