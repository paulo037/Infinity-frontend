<template>
    <div class="secondary">
        <ListProduct label="Lançamentos" :name="launch" />
        <ListCategory label="Categorias" class="py-10 pb-15" />

        <ListProduct label="Produtos Mais Vendidos" :name="bestSeller" />
    </div>
</template>

<script>
export default {
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
