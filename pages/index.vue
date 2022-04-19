<template>
  <div>
    <list-product label="Produtos Mais Vendidos"/>
    <list-category label="Categorias"/>
    <list-product label="Lançamentos"/>

  </div>
</template>

<script>
import ListProduct from "@/components/product/ListProduct.vue";
import ListCategory from '@/components/category/ListCategory.vue';
export default {

  components: {
    ListProduct,
    ListCategory,
  },
};
</script>

<style>
</style>