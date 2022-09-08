<template>
  <v-card outlined class="my-5">
    <div class="primary--text text-center d-block text-h5 mt-5">Categorias</div>
    <v-row justify="center" class="mb-5 pt-5">
      <v-col cols="9" sm="6" class="pb-0 mb-0">
        <v-text-field
          v-model="message4"
          label="Valor"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="10" sm="3">
        <v-btn block class="accent" @click="pushCategory"> adicionar </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      :items="categories"
      :headers="headers"
      :hide-default-header="true"
      hide-default-footer
    >
      <template  #[`item.actions`]="{ item }">
        <v-icon @click="deleteCategory(item.name)" class="mr-2 accent--text">
          mdi-pencil
        </v-icon>

        <v-icon @click="deleteCategory(item.name)" class="mr-2 red--text">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      newCategory: null,
      headers: [
        { value: "name", sortable: false, align: "center" },
        { value: "actions", sortable: false, align: "center" },
      ],
    };
  },
  async fetch() {
    this.categories = await this.$axios.$get(`category`);
    console.log(this.categories)
  },

  methods: {
    deleteCategory(name) {
      this.items.forEach((c, index) => {
        if (c.name == name) this.items.splice(index, 1);
      });
    },

    pushCategory() {
      this.items.push(this.categories.find((c) => c.name == this.newCategory));
      this.newCategory = null;
    },
  },
  computed: {},
};
</script>

<style>
</style>