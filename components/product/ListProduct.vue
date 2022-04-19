<template>
  <v-container>
    <h2 class="primary--text ml-10 d-inline-block" align="start">
      {{ label }}
    </h2>
    <v-sheet color="secondary">
      <v-slide-group show-arrows>
        <v-slide-item v-for="(product,  index) in products" :key="index" class="">
          <Product
            :name="product.name"
            :rating="product.rating"
            :price="product.price"
            :image="product.image"
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
        products: [
            {
                name: "Blusa Vikings",
                image:  "https://static.netshoes.com.br/produtos/camiseta-hd-nocturn-masculina/10/C93-1476-010/C93-1476-010_detalhe1.jpg?ts=1602703039",
                rating: 4.5,
                price: 65,

            },
            {
                name: "Blusa Vikings",
                image:"https://img.ltwebstatic.com/images3_pi/2022/02/25/1645778033bcddf6b1aa20f426ee3dc45337ded9b5_thumbnail_405x552.webp",
                rating: 4.5,
                price: 65,

            },{
                name: "Blusa Vikings",
                image:  "https:img.ltwebstatic.com/images3_pi/2021/10/20/163469596627a68c90e7d65a7c12daf5d145ef97ad_thumbnail_600x.webp",
                rating: 4.5,
                price: 65,

            },{
                name: "Blusa Vikings",
                image:  "https://img.ltwebstatic.com/images3_pi/2022/03/24/16481164695142ae5455df4f624d172ff902c2e8f4_thumbnail_405x552.webp",
                rating: 4.5,
                price: 65,

            },{
                name:   "Blusa Malhada",
                image:  "https://img.ltwebstatic.com/images3_pi/2022/03/22/1647913483064da6464276fe205040d5ae2b8d4efa_thumbnail_405x552.webp",
                rating: 4.5,
                price: 65,

            },

        ]


    };
  },

  async fetch(){
    //   this.p = await this.$axios.$get('http://localhost:8080/product')
    //   console.log(this.p)
  },
  props: {
    label: String,
  },
};
</script>

<style>
</style>