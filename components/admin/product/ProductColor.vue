<template>
  <v-card outlined class="mb-5">
    <div class="primary--text text-center d-block text-h6 mt-5">Cores</div>
    <v-row justify="center" class="mb-5 pt-5">
      <v-col cols="9" sm="6" class="pb-0 mb-0">
        <v-autocomplete
          :items="colorItems"
          class="ma-0 pa-0"
          outlined
          dense
          item-text="value"
          v-model="newColor"
          label="Cor"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4">
        <v-btn block class="accent" @click="pushColor"> adicionar </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      :items="items"
      :headers="headers"
      hide-default-footer
      hide-default-header
      ref="dataTable"
    >
      <template #[`item.actions`]="{ item }">
        <v-icon @click="deleteColor(item)" class="mr-2 red--text">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      newColor: null,
      colors: [],
      headers: [
        { value: "value", sortable: false, align: "center" },
        { value: "actions", sortable: false, align: "center" },
      ],
    };
  },
  async fetch() {
    this.colors = await this.$axios.$get(`color`).then();
  },
  methods: {
    ...mapMutations({
      on: "admin/product/onDialog",
      setText: "admin/product/setText",
      dialogFunction: "admin/product/executeCallBack",
    }),

    onDialog(timout, cb) {
      this.on(timout, cb);

      timout != undefined
        ? setTimeout(() => {
            this.dialogFunction();
            clearTimeout();
          }, timout)
        : null;
    },

    pushColor() {
      if (!this.newColor) {
        this.setText("Selecione<wbr> a<wbr> cor<wbr> para<wbr> ser <wbr> adicionada.");
        this.onDialog(1500);
        return;
      }
      let c = this.colors.find((color) => color.value === this.newColor);
      this.$store.commit("admin/product/pushColor", c);
      this.newColor = null;
    },
    deleteColor(value) {
      this.$store.commit("admin/product/deleteColor", value);
    },
  },
  computed: {
    colorItems() {
      let colors = [];
      this.colors.forEach((element) => {
        if (!this.items.find((c) => c.value == element.value))
          colors.push(element);
      });
      return colors;
    },

    items() {
      let items = this.$store.state.admin.product.colors;
      return items;
    },
  },
};
</script>

<style>
</style>