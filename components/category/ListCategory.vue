<template>
  <v-container >
    <h2 class="primary--text ml-10">{{ label }}</h2>
    <v-sheet color="secondary">
      <v-slide-group >
        <v-slide-item 
        v-for="(c, index) in category" 
        :key="index"
        >
          <category :name="c.name" :img="c.image" :id="parseInt(c.id)"/>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import Category from "./Category.vue";
export default {
  components: {
    Category,
  },

  data() {
    return {
      category: [],
     
    };
  },
  async fetch() {
    this.category = await this.$axios
      .$get(`category/`)
      .catch((e) => console.log(e));
  },
  props: {
    label: String,
  },
};
</script>

<style>
</style>