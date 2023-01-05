<template>
    <div class="secondary">
        <list-product label="Lançamentos" :name="launch" />
        <list-category label="Categorias" class="py-10 pb-15" />

        <list-product label="Produtos Mais Vendidos" :name="bestSeller" />
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
            launch: "Lancamentos",
            bestSeller: "Produtos Mais Vendidos",
        };
    },
};
</script>

    
<style>
</style>
