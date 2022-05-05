<template>
  <v-container style="width:100%; max-width:none">
    <h2 class="primary--text ml-10 d-inline-block" align="start">
      {{ label }}
    </h2>
    <v-sheet color="secondary" >
      <v-slide-group show-arrows class="ma-0" >
        <v-slide-item
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
        </v-slide-item>

      </v-slide-group>
    </v-sheet>
  </v-container>
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
      .$get(`http://localhost:8080/product/category/${this.id}`)
      .catch((e) => console.log(e));
    console.log(this.Products);
  },
};
</script>

<style>
</style>