<template>
  <v-card flat class="pa-5">
    <Category class="mb-16" />
    <Size class="mb-16" />
    <Color class="mb-16" />
  </v-card>
</template>

<script>
import Category from "@/components/admin/property/Category.vue";
import Size from "@/components/admin/property/Size.vue";
import Color from "@/components/admin/property/Color.vue";
export default {
  components: {
    Category,
    Color,
    Size,
  },
};
</script>

<style>
</style>