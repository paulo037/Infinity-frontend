<template>
  <NuxtLink :to="link" class="text-decoration-none">
    <v-btn text class="primary--text text-start" block>
      <v-icon> {{icon}} </v-icon>
      <v-list-item-title color="primary" class="ml-5">{{text}}</v-list-item-title>
    </v-btn>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    link: String,
  },
};
</script>

<style>
</style>