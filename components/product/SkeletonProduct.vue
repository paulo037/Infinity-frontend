<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        tag="span"
        class="d-inline-block my-5 mx-2 pa-3"
        height="450px"
        outlined
        :elevation="hover ? 2 : 0"
      >
        <v-skeleton-loader
          width="260px"
          type=" image, list-item-three-line, list-item"
          class="v-skeletonimage"
        ></v-skeleton-loader>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {};
</script>

<style>
.v-skeletonimage {
  width: 260px !important;
  height: 260px !important;
}
</style>