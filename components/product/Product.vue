<template >
  <NuxtLink to="/buy">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          tag="span"
          class="d-inline-block my-5 mx-5"
          max-height="330"
          :elevation="hover ? 24 : 6"
        >
          <v-img height="224" width="224" :src="image"></v-img>

          <v-card-title>{{ name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ rating }} (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              R$: {{ price.toFixed(2).replace(".",",") }}
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    price: Number,
    name: String,
    rating: Number,
    image: String,
  },
};
</script>

<style>
</style>