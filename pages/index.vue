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
            c1: "3fa9ef43-e9a3-4fab-ad2c-8ab3b6b6e281",
            c2: "f80b17b9-6f19-48b6-a033-3724bbf1297f",
        };
    },
};
</script>

<style>
</style>