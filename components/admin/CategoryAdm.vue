<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card outlined class="pb-10">
        <div class="primary--text text-center d-block text-h4 my-5">
          <wbr />Categorias<wbr />
        </div>

        <v-divider class="pb-10"></v-divider>

        <div class="primary--text text-center d-block text-h5 my-5">
          <wbr />Categorias <wbr /> Exibidas<wbr />
        </div>
        <v-card outlined class="ma-10">
          <v-row align="center" justify="center" class="px-5">
            <v-col cols="12" sm="5">
              <div class="primary--text text-center d-block text-h6 my-5 pb-5">
                <wbr />Primeira<wbr /> Exibida:<wbr />
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <v-autocomplete
                :items="typeSizes"
                outlined
                dense
                class="pb-0"
                v-model="sizeSelected"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" class="px-5">
            <v-col cols="12" sm="5">
              <div class="primary--text text-center d-block text-h6 pb-5">
                <wbr />Segunda<wbr /> Exibida:<wbr />
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <v-autocomplete
                :items="typeSizes"
                outlined
                dense
                class="pb-0"
                v-model="sizeSelected"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="5" lg="3">
              <v-btn
                color="accent"
                block
                @click="handleFileImport"
                max-width="300px"
                class="mb-10"
              >
                SALVAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <div class="primary--text text-center d-block text-h5 my-5">
          <wbr />Editar <wbr /> Categorias<wbr />
        </div>
        <v-card outlined class="ma-10 pb-10">
          <v-row justify="center">
            <v-col cols="10" sm="5">
              <v-row justify="center">
                <v-col cols="12" class="align-center">
                  <div class="text-center d-block primary--text text-h6 mt-5">
                    <wbr />Adicionar<wbr /> Nova<wbr /> Categoria<wbr />
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="Nome"
                    v-model="newSize"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="primary"
                    :loading="isSelecting"
                    block
                    outlined
                    @click="handleFileImport"
                    max-width="300px"
                  >
                    Adicionar<br class="d-inline d-md-none" />
                    Imagem
                  </v-btn>

                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    @change="onFileChanged"
                  />
                </v-col>

                <v-col md="12" class="py-1" v-if="getFile">
                  <v-card
                    outlined
                    class="d-flex pa-1"
                    align="center"
                    style="align-items: center"
                  >
                    <v-img
                      :src="createURL(getFile)"
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
                      {{ getFile.name }}
                    </v-container>

                    <v-icon
                      small
                      class="red ma-0 rounded-0"
                      @click="removeImage()"
                      absolute
                      style="position: absolute; top: 1px; right: 0px"
                    >
                      mdi-close
                    </v-icon>
                  </v-card>
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
                    <wbr />Excluir<wbr /> Categoria<wbr /> Existente<wbr />
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isSelecting: false,
      file: null,
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
      this.file = e.target.files[0];
    },

    createURL(img) {
      console.log(img);
      return URL.createObjectURL(img);
    },

    removeImage() {
      this.file = null;
    },
  },

  computed: {
    getFile() {
      return this.file;
    },
  },
};
</script>

<style>
</style>