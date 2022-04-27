<template>
  <v-card outlined >
    <div class="primary--text text-center d-block text-h6 mt-5">Tamanhos</div>
    <v-row justify="center" class="mb-5 pt-5">
      <v-col cols="9" sm="6" class="pb-0 mb-0">
        <v-autocomplete
          :items="sizesItems"
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
      <template v-slot:item.actions="{ item }">
        <v-icon @click="deleteSize(item)" class="mr-2 red--text">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:item.quantity="{ item }">
        <v-icon
          color="sencondary"
          class="accent rounded-circle"
          :disabled="item.quantity == 1 ? true : false"
          @click="item.quantity--"
        >
          mdi-minus
        </v-icon>

        <span class="font-weight-light ma-5" v-text="item.quantity"></span>
        <v-icon
          color="sencondary"
          class="accent rounded-circle"
          @click="item.quantity++"
        >
          mdi-plus
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    items: [],
  },
  data() {
    return {
      newSize: null,
      sizes: [],
      headers: [
        { text: "Tamanho", value: "value", sortable: false },
        { text: "Quantidade", value: "quantity", align: "center" },
        { value: "actions", sortable: false, align: "right" },
      ],
    };
  },
  async fetch() {
    this.sizes = await this.$axios
      .$get(`http://localhost:8080/size`)
      .then(console.log(this.sizes));
  },
  methods: {
    pushSize() {
      let size = this.sizes.find((s) => s.value == this.newSize);
      size = {
        ...size,
        quantity: 1,
      };
      console.log(size);
      this.items.push(size);

      this.newSize = null;
    },
    deleteSize(value) {
      this.items.splice(this.items.indexOf(value), 1);
    },
  },
  computed: {
    sizesItems() {
      let items = [];
      this.sizes.forEach((s) => {
        if (!Boolean(this.items.find((size) => size.value == s.value))) {
          items.push(s);
        }
      });
      return items;
    },
  },
};
</script>

<style>
</style>