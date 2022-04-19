<template>
  <v-card class="ma-10 mt-0 pt-0">
    <v-tabs v-model="tab" class="pa-5">
      <v-tab v-for="(item, index) in tabLabel" :key="index"> {{ item }} </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pa-5">
      <v-tab-item> usuarios </v-tab-item>
      <v-tab-item>
        <ProductTabel />
      </v-tab-item>
      <v-tab-item> pedidos </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ProductTabel from "@/components/admin/ProductTabel.vue";

export default {
  components: {
    ProductTabel,
  },
  layout: "admin",
  data() {
    return {
      tab: null,
      tabLabel: ["Usuários", "Produtos", "Pedidos"],
    };
  },
};
</script>

<style>
</style>