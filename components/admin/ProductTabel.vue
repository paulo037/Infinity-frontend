<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field outlined label="Nome" class="mr-10"></v-text-field>

          <v-text-field outlined label="Preço" class="mr-10"></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-card outlined class="pa-5 pt-0">
            <div class="primary--text text-center d-block text-h6 mt-5">
              <wbr />Tamanho<wbr /> e <wbr />Quantidade
            </div>
            <v-card
              class="px-8 my-15"
              v-for="(item, index) in sizes"
              :key="index"
            >
              <v-row>
                <v-col cols="12" md="6" xs="11" class="pb-0 pt-5">
                  <v-autocomplete
                    :items="typeSizes"
                    outlined
                    dense
                    class="pb-0"
                    v-model="item.size"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6" xs="11" class="pb-0 pt-5">
                  <v-text-field
                    outlined
                    dense
                    label="Quantidade"
                    type="number"
                    v-model="item.quantity"
                  ></v-text-field>
                </v-col>

                <v-col md="1" class="text-right pa-0"> </v-col>
              </v-row>

              <v-icon
                small
                class="red rounded-circle ma-0"
                @click="deleteSize(index)"
                absolute
                style="
                    position: absolute;
                    top: 2px;
                    right: 4px;"
              >
                mdi-close
              </v-icon>
            </v-card>

            <v-row justify="center">
              <v-col cols="12" md="6" xs="12">
                <v-btn @click="createProductSize()" block color="accent"
                  >Adicionar</v-btn
                >
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12">
                <div class="text-center d-block primary--text text-h6 mt-5">
                  <wbr />Adicionar<wbr /> Novo<wbr /> Tamanho<wbr />
                </div>
              </v-col>

              <v-col cols="12" md="12" xs="12">
                <v-text-field
                  outlined
                  dense
                  label="Tamanho"
                  v-model="newSize"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5" xs="12">
                <v-btn @click="createNewSize(newSize)" block color="accent"
                  >Criar</v-btn
                >
              </v-col>

              <v-col cols="12" md="5" xs="12">
                <v-btn @click="removeTypeSize(newSize)" block color="red"
                  >Deletar</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="6"> </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    typeSizes: ["P", "M", "G", "GG"],
    newSize: null,
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
  }),

  methods: {
    deleteSize(index) {
      this.sizes.splice(index, 1);
    },
    createProductSize() {
      this.sizes.push({
        size: "",
        quantity: 1,
      });
    },
    createNewSize(typeSize) {
      this.typeSizes.push(typeSize);
      this.newSize = null;
    },

    removeTypeSize(typeSize) {
      const index = this.typeSizes.indexOf(typeSize);
      this.typeSizes.splice(index, 1);
    },
  },
};
</script>

<style>
</style>