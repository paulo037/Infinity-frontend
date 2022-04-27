<template>
  <v-container>
    <v-form ref="form">
      <v-row justify="space-around">
        <v-col md="5">
          <v-text-field outlined label="Nome"></v-text-field>

          <v-text-field outlined label="Preço"></v-text-field>
          <v-textarea outlined name="input-7-1" label="Descrição"></v-textarea>
          <v-card outlined class="pb-5">
            <div class="text-center d-block primary--text text-h6 my-5">
              <wbr /> Imagens<wbr /> Do<wbr /> Produto<wbr />
            </div>
            <v-row>
              <v-col>
                <v-row justify="center">
                  <v-col cols="10" sm="10" xl="6">
                    <v-btn
                      color="primary"
                      :loading="isSelecting"
                      block
                      outlined
                      @click="handleFileImport"
                      max-width="300px"
                    >
                      Adicionar Imagem
                    </v-btn>

                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="onFileChanged"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-col
              v-for="(img, index) in files"
              :key="index"
              md="12"
              class="py-1"
            >
              <!-- <v-container class="pr-15"> -->
              <v-card
                outlined
                class="d-flex pa-1 ma-2"
                align="center"
                style="align-items: center"
              >
                <v-img
                  :src="createURL(img)"
                  :key="index"
                  max-width="36px"
                  max-height="36px"
                  class="d-block rounded-0 ml-2"
                >
                </v-img>
                <v-container
                  class="d-inline pa-0 px-5 overflow-ellipsis"
                  style="
                    text-overflow: ellipsis;
                    overflow: hidden;
                    width: 160px;
                    height: 1.2em;
                    white-space: nowrap;
                  "
                >
                  {{ img.name }}
                </v-container>

                <v-icon small class="accent--text rounded-0 ma-0 mr-15 d-block">
                  mdi-star
                </v-icon>
                <v-icon
                  small
                  class="red ma-0 rounded-0"
                  @click="removeImage(index)"
                  absolute
                  style="position: absolute; top: 1px; right: 0px"
                >
                  mdi-close
                </v-icon>
              </v-card>
            </v-col>
          </v-card>
        </v-col>

        <v-col md="6">
          <v-card outlined class="pa-5 pt-0">
            <div class="primary--text text-center d-block text-h6 mt-5">
              <wbr />Tamanho<wbr /> e <wbr />Quantidade
            </div>
            <v-card
              class="px-8 my-5 pt-2"
              v-for="(item, index) in product.sizes"
              :key="index"
              outlined
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
                class="red ma-0 rounded-0"
                @click="deleteSize(index)"
                absolute
                style="position: absolute; top: 1px; right: 0px"
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
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="8" sm="4" md="3" v-if="creating">
          <v-btn block color="green"> CRIAR </v-btn>
        </v-col>

        <v-col cols="8" sm="4" md="3" v-if="!creating">
          <v-btn block color="green"> SALVAR </v-btn>
        </v-col>

        <v-col cols="8" sm="4" md="3" v-if="!creating">
          <v-btn block color="red"> EXCLUIR </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isSelecting: false,
    file: null,
    files: [],
    creating: false,
    typeSizes: ["P", "M", "G", "GG"],
    newSize: null,
    product: {
      name: "Blusa",
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

    handleFileImport() {
      this.isSelecting = true;

      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },

    onFileChanged(e) {
      this.files.push(e.target.files[0]);
      console.log(this.files);
    },

    createURL(img) {
      console.log(img);
      return URL.createObjectURL(img);
    },

    removeImage(index) {
      this.files.splice(index, 1);
    },
  },
};
</script>

<style>
</style>