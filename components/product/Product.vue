<template >
  <NuxtLink :to="`/buy/${id}`">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          tag="span"
          class="d-inline-block my-5 mx-2 pa-3"
          height="450"
          outlined
          :elevation="hover ? 2 : 0"
        >
          <v-img
            height="260"
            width="260"
            :src="image ? image : '/noImage.png'"
          ></v-img>

          <v-card-title style="width: 250px; heigth: 20px" class="text-h6">
            {{ name.substring(0, 17) }}
            {{ name.length > 17 ? "..." : "" }}
          </v-card-title>

          <v-card-text  style="text-align: start">
            <v-row  class="mx-0">
              <v-rating
                :value="sold >= 1 ? rating : 5"
                color="amber"
                dense
                half-increments
                readonly
                size="16"
              ></v-rating>

              <div class="grey--text ms-4">
                {{ sold >= 1 ? `${rating.toFixed(1)}(${sold})` : "(5)" }}
              </div>
            </v-row>

            <Price :price="price" :size1="'body-2'" :size2="'subtitle-1'"/>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
  </NuxtLink>
</template>

<script>
import Price from "./Price.vue";
export default {
  components: {
    Price,
  },
  props: {
    price: Number,
    name: String,
    rating: Number | NaN,
    image: String,
    id: Number,
    sold: Number | NaN,
  },


  
};
</script>

<style>
</style>