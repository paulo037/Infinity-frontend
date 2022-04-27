<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card outlined class="pb-10">
        <div class="primary--text text-center d-block text-h4 my-5">
          <wbr />Tamanhos<wbr />
        </div>
        <v-divider class="pb-10"></v-divider>
        <v-row justify="center">
          <v-col cols="10" sm="5">
            <v-row justify="center">
              <v-col cols="12" class="align-center">
                <div class="text-center d-block primary--text text-h6 mt-5">
                  <wbr />Adicionar<wbr /> Novo<wbr /> Tamanho<wbr />
                </div>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  outlined
                  dense
                  label="Tamanho"
                  v-model="newSize"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-btn @click="createNewSize(newSize)" block color="accent"
                  >Criar</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" sm="5">
            <v-row justify="center">
              <v-col cols="12">
                <div class="text-center d-block primary--text text-h6 mt-5">
                  <wbr />Excluir<wbr /> Tamanho<wbr /> Existente<wbr />
                </div>
              </v-col>

              <v-col cols="12" md="12" xs="12">
                <v-autocomplete
                  :items="typeSizes"
                  outlined
                  dense
                  class="pb-0"
                  v-model="sizeSelected"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="5" xs="12">
                <v-btn @click="removeTypeSize()" block color="red"
                  >Deletar</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      typeSizes: ["P", "M", "G", "GG"],
      sizeSelected: null,
      newSize: null,
    };
  },
  methods: {
    createNewSize(typeSize) {
      this.typeSizes.push(typeSize);
    },

    removeTypeSize() {
      console.log(this.sizeSelected);
      const index = this.typeSizes.indexOf(this.sizeSelected);
      this.typeSizes.splice(index, 1);
      this.sizeSelected = null;
    },
  },
};
</script>

<style>
</style>