<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col
        cols="10"
        md="3"
        class="d-flex align-start flex-column"
        v-if="!this.$route.query.category"
      >
        <h3 class="primary--text text-center align-self-center py-2">
          Filtrar por categoria
        </h3>
        <div class="align-self-center">
          <v-select
            :items="this.$store.state.search.categories"
            item-text="category"
            item-value="id"
            placeholder="Categoria"
            dense
            outlined
            v-model="select"
            style="width: 250px"
          
          >
          </v-select>
        </div>
      </v-col>
      <v-col cols="10" md="9" class="">
        <list-product-no-slide :term="term" :category="parseInt(category)" />
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
      term: this.$route.query.term,
      category: this.$route.query.category,
      select: null,
    };
  },
  methods: {
    ...mapMutations({
      setCategory: "search/setCategory",
    }),
  },
  watch: {
    select() {
      this.setCategory(this.select);
    },
    $route() {
      this.term = this.$route.query.term;
    },
  },
};
</script>

<style>
</style>