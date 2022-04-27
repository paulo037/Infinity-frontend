<template>
  <v-card class="ma-10 mt-0 pt-0">
    <v-tabs v-model="tab" class="pa-5 pb-0">
      <v-tab v-for="(item, index) in tabLabel" :key="index"> {{ item }} </v-tab>
    </v-tabs>
    <v-divider class="pb-5"></v-divider>
    <v-tabs-items v-model="tab" class="pa-5">
      <v-tab-item> usuarios </v-tab-item>
      <v-tab-item>
        <v-card outlined class="pb-10">
          <div class="primary--text text-center d-block text-h4 mt-5">
            Produtos
          </div>
          <v-divider class="pb-5"></v-divider>
          <nuxt-child />
        </v-card>
      </v-tab-item>
      <v-tab-item> pedidos </v-tab-item>
      <v-tab-item>
        <SizeAdm />
        <CategoryAdm />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ProductEdit from "~/components/admin/ProductEdit.vue";
import ProductTable from "~/components/admin/ProductTable.vue";
import SizeAdm from "~/components/admin/SizeAdm.vue";
import CategoryAdm from "~/components/admin/CategoryAdm.vue";

export default {
  components: {
    ProductEdit,
    ProductTable,
    SizeAdm,
    CategoryAdm,
  },
  layout: "admin",
  data() {
    return {
      tab: null,
      tabLabel: ["Usuários", "Produtos", "Pedidos", "Propriedades"],
    };
  },
};
</script>

<style>
</style>