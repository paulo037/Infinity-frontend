<template>
    <div class="secondary">
        <list-product label="Lançamentos" :id="c1" />
        <list-category label="Categorias" class="py-10 pb-15" />

        <list-product label="Produtos Mais Vendidos" :id="c2" />
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

    data() {
        return {
            c1: "9bcf9dfc-f0ba-4b48-9b82-b4fb13893a2b",
            c2: "a00d1ae9-b32c-4dea-acb0-062ec4a1cc07",
        };
    },
};
</script>

    
<style>
</style>