<template>
  <div>
    <v-data-table :items="products" :headers="headers" :search="search">
      <template v-slot:top>
        <v-row justify="space-around">
          <v-col cols="9" sm="5" class="pb-0">
            <v-text-field
              v-model="search"
              dense
              label="Pesquisar"
              outlined
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>

          <v-col cols="10" sm="6" md="3" class="pb-10">
            <v-btn block color="accent" nuxt :to="{ name: 'admin-product-id' }">
              Criar novo produto
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </template>
      <template v-slot:item.actions="{ item }">
        <NuxtLink
          :to="{ name: 'admin-product-id', params: { id: item.id } }"
          style="text-decoration: none"
        >
          <v-icon class="mr-2 primary--text" nuxt> mdi-pencil </v-icon>
        </NuxtLink>
        <v-icon @click="dialogFunction(item.id)" class="mr-2 red--text">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:item.price="{ item }">
        {{ formatMoney(item.price) }}
      </template>

      <template v-slot:item.image="{ item }">
        <v-img
          :src="item.image ? item.image : 'noImage.png'"
          max-width="36px"
          max-height="36px"
        >
        </v-img>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card class="pa-2">
        <v-card-title
          class="text-center"
          v-html="text"
          style="white-space: nowrap"
        >
        </v-card-title>

        <v-card-actions class="flex justify-space-between">
          <v-btn class="red white--text" @click="dialog = false">
            CANCELAR
          </v-btn>
          <v-btn class="green white--text" @click="deleteProduct()">
            CONFIRMAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


 <script>
export default {
  data() {
    return {
      timeout: 3000,
      search: "",
      text: "",
      dialog: false,
      id: null,

      headers: [
        { text: "Imagem", value: "image", sortable: false },
        { text: "Id", value: "id" },
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        { text: "Preço", value: "price" },
        { text: "Ações", value: "actions", sortable: false, align: "right" },
      ],

      products: [],
    };
  },

  async fetch() {
    this.products = await this.$axios.$get(`http://localhost:8080/product/`);
    console.log(this.products);
  },

  methods: {
    formatMoney(value) {
      return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
    },

    async deleteProduct() {
      if (!this.id) return;
      this.dialog = false;
      await this.$axios
        .$delete(`http://localhost:8080/product/${this.id}`)
        .catch((e) => {
          this.text = e.response.data
            ? e.response.data
            : "Houve um erro ao tentar apagar o produto";
          this.id = null;
        })
        .then((e) => {
          let p = this.products.find((product) => product.id === this.id);
          this.products.splice(this.products.indexOf(p), 1);
          this.id = null;
        });
    },
    dialogFunction(id) {
      this.id = id;
      this.text = `Confirma<wbr> que<wbr> quer<wbr> deletar<wbr> o<wbr> produto ?`;
      this.dialog = true;
    },
  },
};
</script>

<style>
</style>