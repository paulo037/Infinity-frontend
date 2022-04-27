<template>
  <v-form ref="form" enctype="multipart/form-data" method="post">
    <v-row justify="space-around">
      <v-col cols="12">
        <NuxtLink to="/admin" style="text-decoration: none">
          <v-icon large class="primary--text ml-5">mdi-arrow-left-bold</v-icon>
        </NuxtLink>
      </v-col>
      <v-col md="5" cols="10">
        <v-text-field
          outlined
          label="Nome"
          v-model="product.name"
        ></v-text-field>

        <v-text-field
          outlined
          label="Preço"
          prefix="R$"
          v-model="product.price"
        ></v-text-field>

        <v-textarea
          outlined
          name="input-7-1"
          label="Descrição"
          v-model="product.description"
        ></v-textarea>
        <ProductImage :items="product.images" />
      </v-col>

      <v-col md="6" sm="10">
        <ProductSize :items="product.sizes" />
        <ProductCategory :items="product.categories" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8" sm="4" md="3" v-if="creating">
        <v-btn block color="green" @click="create()" class="white--text">
          CRIAR
        </v-btn>
      </v-col>

      <v-col cols="8" sm="4" md="3" v-if="!creating">
        <v-btn block color="green" @click="save()"> SALVAR </v-btn>
      </v-col>

      <v-col cols="8" sm="4" md="3" v-if="!creating">
        <v-btn block color="red" @click="deleteProduct()"> EXCLUIR </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="300px">
      <v-card class="pa-2">
        <v-card-title
          class="text-center"
          v-html="text"
          style="white-space: nowrap"
        >
        </v-card-title>

        <v-card-actions>
          <v-btn class="accent" @click="dialogFunction()" block> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import ProductImage from "../../../components/admin/product/ProductImage.vue";
import ProductSize from "../../../components/admin/product/ProductSize.vue";
import ProductCategory from "../../../components/admin/product/ProductCategory.vue";

export default {
  components: {
    ProductImage,
    ProductSize,
    ProductCategory,
  },
  data: () => ({
    dialog: false,
    dialogFunction: null,
    rate: 0,
    errors: {},
    snackbar: false,
    text: null,
    timeout: 3000,
    creating: false,
    product: {
      name: null,
      price: null,
      description: null,
      id: null,
      images: [],
      sizes: [],
      categories: [],
    },
  }),

  async fetch() {
    if (this.$route.params.id) {
      this.product = await this.$axios.$get(
        `http://localhost:8080/product/${this.$route.params.id}`
      );
      return;
    }
    this.creating = true;
  },

  methods: {
    async save() {
      if (!this.validation()) return;
      console.log(this.product);
      await this.uploadImages();

      await this.$axios
        .$put(`http://localhost:8080/product/${this.$route.params.id}`, {
          product: this.product,
        })
        .then((e) => {
          this.text = `Modificações Salvas`;
          this.onDialog(this.timeout);
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.text = "<span>Requisição mal<br>formatada Enviada</span>";
          } else {
            this.text = "Houve um erro na atualização";
          }
          this.onDialog(this.timeout);
          return;
        });
    },
    async create() {
      if (!this.validation()) return;

      await this.uploadImages();

      await this.$axios
        .$post(`http://localhost:8080/product/`, {
          product: this.product,
        })
        .then(() => {
          this.text =
            "<span>Produto <wbr>foi <wbr> criado<wbr> com<wbr> sucesso</span>";
          this.onDialog();
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.text = e.response.data
              ? e.response.data
              : "<span>Requisição mal<br>formatada Enviada</span>";
          } else {
            this.text = "Houve um erro na Criação";
          }
          this.onDialog(this.timeout);
          return;
        });
    },
    async uploadImages() {
      let formData = new FormData();
      let append = false;
      this.product.images.forEach((image, index) => {
        if (!image.id) {
          formData.append("uploadImages", image);
          append = true;
        }
      });

      if (append) {
        await this.$axios
          .$post(`http://localhost:8080/product/image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .catch((e) => {
            this.text = e.response.data
              ? e.response.data
              : "Houve um erro na atualização";
            this.onDialog(this.timeout);
            return;
          })
          .then((images) => {
            this.parseImages(images);
          });
      }
    },
    async deleteProduct() {
      await this.$axios
        .$delete(`http://localhost:8080/product/${this.$route.params.id}`)
        .catch((e) => {
          this.text = e.response.data
            ? e.response.data
            : "Houve um erro ao tentar apagar o produto";
          this.onDialog(this.timeout);
          return;
        })
        .then((e) => {
          this.text = `Produto deletado`;
          this.onDialog(null, () => {
            this.$router.push("/admin");
          });
        });
    },

    validation() {
      let valid = true;
      const reg = new RegExp(
        "^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{1})?|(?:,[0-9]{3})*(?:.[0-9]{1,2})?|(?:.[0-9]{3})*(?:,[0-9]{1,2})?)$"
      );

      if (!reg.test(this.product.price)) {
        this.text = "Preço Inválido";
        this.onDialog(this.timeout);
        valid = false;
        return valid;
      }
      this.product.price = this.product.price.replace(",", ".");
      if (this.product.sizes.length < 1) {
        this.text = "Adicione<wbr> pelo<wbr> menos<wbr> um<wbr> tamanho";
        this.onDialog(this.timeout);
        valid = false;
        return valid;
      }

      return valid;
    },
    onDialog(timout, cb) {
      this.dialog = true;

      this.dialogFunction =
        cb != undefined
          ? cb
          : function () {
              console.log(this.dialog);
              this.dialog = false;
            };
      timout != undefined
        ? setTimeout(() => {
            this.dialogFunction();
            clearTimeout();
          }, timout)
        : null;
    },
    parseImages(images) {
      let m = [];
      this.product.images.map((file) => {
        if (!file.id) {
          images.forEach((img) => {
            if (img.name === file.name) {
              img.primary = Boolean(file.primary);
              m.push(img);
            }
          });
        } else {
          m.push(file);
        }
      });
      this.product.images = m;
    },
  },
};
</script>

<style>
</style>