<template>
    <div class="secondary">
        <list-product label="Lançamentos" :id="1" />
        <list-category label="Categorias" />
        <list-product label="Produtos Mais Vendidos" :id="2" />
    </div>
</template>

<script>
import ListProduct from "@/components/product/ListProduct.vue";
import ListCategory from "@/components/category/ListCategory.vue";
export default {
    components: {
        ListProduct,
        ListCategory,
    },
};
</script>

<style>
</style>