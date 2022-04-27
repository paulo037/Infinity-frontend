<template>
  <v-card outlined>
    <div class="primary--text text-center d-block text-h4 mt-5">Produtos</div>
    <v-divider class="pb-5"></v-divider>
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
            <v-btn block color="accent"> Criar novo produto </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2 primary--text" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>


 <script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Imagem", value: "image" },
        { text: "Id", value: "id" },
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        { text: "Preço", value: "price" },
        { text: "Ações", value: "actions", sortable: false, align: "right" },
      ],
      product: {
        name: "Blusa",
        price: 20,
        descrpition: "descrição",
        id: 2,
        image:  "https://static.netshoes.com.br/produtos/camiseta-hd-nocturn-masculina/10/C93-1476-010/C93-1476-010_detalhe1.jpg?ts=1602703039",
        sizes: [
          {
            size: "P",
            quantity: 2,
          },
          {
            size: "M",
            quantity: 2,
          },
          {
            size: "GG",
            quantity: 2,
          },
        ],
        categories: ["blusa", "blusa de time"],
      },

      products: [
        {
          name: "Blusa",
            image:  "https://static.netshoes.com.br/produtos/camiseta-hd-nocturn-masculina/10/C93-1476-010/C93-1476-010_detalhe1.jpg?ts=1602703039",
          price: 20,
          descrpition: "descrição",
          id: 1,
          sizes: [
            {
              size: "P",
              quantity: 2,
            },
            {
              size: "M",
              quantity: 2,
            },
            {
              size: "GG",
              quantity: 2,
            },
          ],
          categories: ["blusa", "blusa de time"],
        },

        {
          name: "Short",
        image:  "https://static.netshoes.com.br/produtos/camiseta-hd-nocturn-masculina/10/C93-1476-010/C93-1476-010_detalhe1.jpg?ts=1602703039",
          price: 20,
          descrpition: "descrição",
          id: 2,
          sizes: [
            {
              size: "P",
              quantity: 2,
            },
            {
              size: "M",
              quantity: 2,
            },
            {
              size: "GG",
              quantity: 2,
            },
          ],
          categories: ["blusa", "blusa de time"],
        },

        {
          name: "Calça",
          price: 20,
          descrpition: "descrição",
          id: 3,
          image:  "https://static.netshoes.com.br/produtos/camiseta-hd-nocturn-masculina/10/C93-1476-010/C93-1476-010_detalhe1.jpg?ts=1602703039",
          sizes: [
            {
              size: "P",
              quantity: 2,
            },
            {
              size: "M",
              quantity: 2,
            },
            {
              size: "GG",
              quantity: 2,
            },
          ],
          categories: ["blusa", "blusa de time"],
        },
      ],
    };
  },

  methods: {
    formatMoney(value) {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    },
  },
};
</script>

<style>
</style>