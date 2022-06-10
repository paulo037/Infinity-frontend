<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="10" md="3">
        <h3 class="primary--text text-center py-2">Filtrar por categoria</h3>
        <v-select
         :items="this.$store.state.search.categories"
         item-text="category"
         item-value="id"
         solo
         dense
         v-model="select"
        > </v-select>
      </v-col>
      <v-col cols="10" md="9" class="pa-0">
        <list-product-no-slide :term="term" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ListProductNoSlide from "@/components/product/ListProductNoSlide.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    ListProductNoSlide,
  },
  data() {
    return {
      term: this.$route.params.term,
      select: null
    };
  },
  methods: {
    ...mapMutations({
      setCategory: "search/setCategory",
    }),
  },
  watch:{
    select(){
        this.setCategory(this.select)
    }
  }
};
</script>

<style>
</style>