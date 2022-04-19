<template >
  <v-hover >
    <template v-slot:default="{ hover }">
      <v-card
        tag="span"
        class="d-inline-block my-5 mx-5"
        max-height="330"
        color="secondary"
        :elevation="hover ? 10 : 0"
        to="/#"
      >
        <v-img height="180" width="180" :src="img" class="rounded-circle" ></v-img>
        <v-card-text align="center">{{ name }}</v-card-text>


      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    name: String,
    img: String,
  },
};
</script>

<style>
</style>