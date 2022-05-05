<template>
  <v-card outlined>
    <div class="primary--text text-center d-block text-h6 mt-5">Tamanhos</div>
    <v-row justify="center" class="mb-5 pt-5">
      <v-col cols="9" sm="6" class="pb-0 mb-0">
        <v-autocomplete
          :items="sizes"
          class="ma-0 pa-0"
          outlined
          dense
          item-text="value"
          v-model="newSize"
          label="Tamanho"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="4" sm="3">
        <v-btn block class="accent" @click="pushSize"> adicionar </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-data-table
      :items="items"
      :headers="headers"
      hide-default-footer
      ref="dataTable"
    >
      <template #[`item.color`]="{ item, index }">
        <v-container style="min-width: 100px" class="ma-0 pa-0">
          <v-autocomplete
            :items="colors"
            class="ma-0 pt-5 d-flex justify-center"
            outlined
            dense
            item-text="value"
            @change="changeColor(index, item.color)"
            value="item.color"
            v-model="item.color"
            label="cor"
          >
          </v-autocomplete>
        </v-container>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon @click="deleteSize(item)" class="mr-2 red--text">
          mdi-delete
        </v-icon>
      </template>

      <template #[`item.quantity`]="{ item }">
        <div class="d-flex no-wrap align-baseline">
          <v-icon
            color="sencondary"
            class="accent rounded-circle"
            :disabled="item.quantity == 1 ? true : false"
            @click="item.quantity--"
          >
            mdi-minus
          </v-icon>

          <span
            class="font-weight-light mx-5 text-body-1"
            v-text="item.quantity"
          ></span>
          <v-icon
            color="sencondary"
            class="accent rounded-circle"
            @click="item.quantity++"
          >
            mdi-plus
          </v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      sizes: [],
      newSize: null,
      sizesperColor: [],
      index: null,
      headers: [
        { text: "Cor", value: "color", sortable: false },
        { text: "Tamanho", value: "size", sortable: false, align: "center" },
        { text: "Quantidade", value: "quantity", align: "center" },
        { value: "actions", sortable: false, align: "right" },
      ],
    };
  },
  async fetch() {
    this.sizes = await this.$axios.$get(`http://localhost:8080/size`);
  },
  methods: {
    ...mapMutations({
      on: "admin/product/onDialog",
      setText: "admin/product/setText",
      dialogFunction: "admin/product/executeCallBack",
      deleteSize: "admin/product/deleteSize",
      initialSizes: "admin/product/initialSizes",
      changeSize: "admin/product/changeSize",
      changeIdSize: "admin/product/changeIdSize",
      _pushSize: "admin/product/pushSize",
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

    pushSize() {
      if (!this.newSize) {
        this.setText(
          "Selecione<wbr> o<wbr> tamanho<wbr> para<wbr> ser <wbr>adicionado."
        );
        this.onDialog(1500);
        return;
      }

      if (this.colors.length < 1) {
        this.setText("Adicione<wbr> uma <wbr>cor <wbr> primeiro<wbr>");
        this.onDialog(1500);
        return;
      }
      let size = this.sizes.find((s) => s.value === this.newSize);
      let color = this.colors[0];
      this._pushSize({ size, color });

      this.newSize = null;
    },
    changeColor(index, color) {

      let item = this.colors.find((c) => c.value == color);
      this.changeIdSize({index, color: item.value, id: item.id});
    },
  },

  computed: {
    colors() {
      let items = [...this.$store.state.admin.product.colors];
      return JSON.parse(JSON.stringify(items));
    },

    items() {
      let items = [...this.$store.state.admin.product.sizes];
      return JSON.parse(JSON.stringify(items));
    },
  },
};
</script>


<style>
</style>

