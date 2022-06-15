<template >
  <div>
    <v-hover >
      <template v-slot:default="{ hover }">
        <v-card
          tag="div"
          class="my-5 mx-5 rounded-circle"
          max-height="330"
          color="secondary"
          :elevation="hover ? 16 : 0"
          @click="$router.push({ path: 'search', query: { category: id }});"
        >
          <v-img
            height="180"
            width="180"
            :src="img"
            class="rounded-circle"
          ></v-img>
        </v-card>
      </template>
    </v-hover>
    <span align="center" class="d-block">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    img: String,
    id: Number,
  },
};
</script>

<style>
</style>