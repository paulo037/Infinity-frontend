<template>
  <v-form ref="form" enctype="multipart/form-data" method="post">
    <v-row justify="space-around">
      <v-col cols="12">
        <NuxtLink to="/admin/product" style="text-decoration: none">
          <v-icon large class="primary--text ml-5">mdi-arrow-left-bold</v-icon>
        </NuxtLink>
      </v-col>
      <v-col md="6"  sm="10">
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
          auto-grow
          name="input-7-1"
          label="Descrição"
          v-model="product.description"
        ></v-textarea>

        <ProductImage :items="product.images" />
      </v-col>

      <v-col md="6" sm="10">
        <ProductColor />
        <ProductSize />
        <ProductCategory :items="product.categories" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8" sm="4" md="3" v-if="creating">
        <v-btn block color="green" @click="create()" class="white--text">
          CRIAR
        </v-btn>
      </v-col>

      <v-col cols="6" sm="6" md="3" v-if="!creating">
        <v-btn block color="green" @click="save()"> SALVAR </v-btn>
      </v-col>

      <v-col cols="6" sm="6" md="3" v-if="!creating">
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
          <v-btn class="accent" @click="dialogFunction" block> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mapMutations } from "vuex";
import ProductImage from "../../../components/admin/product/ProductImage.vue";
import ProductSize from "../../../components/admin/product/ProductSize.vue";
import ProductColor from "../../../components/admin/product/ProductColor.vue";
import ProductCategory from "../../../components/admin/product/ProductCategory.vue";

export default {
  components: {
    ProductImage,
    ProductColor,
    ProductSize,
    ProductCategory,
  },
  data: () => ({
    rate: 0,
    errors: {},
    timeout: 3000,
    creating: false,
    product: {
      name: null,
      price: null,
      description: null,
      id: null,
      images: [],
      colors: [],
      categories: [],
    },
  }),

  computed: {
    text() {
      return this.$store.state.admin.product.text;
    },
    dialog() {
      return this.$store.state.admin.product.dialog;
    },
    sizes() {
      return this.$store.state.admin.product.sizes;
    },
  },
  async fetch() {
    let colors = [];
    if (this.$route.params.id != "new-product") {
      this.product = await this.$axios.$get(`product/${this.$route.params.id}`);
      this.product.colors.forEach((item) => {
        if (!colors.find((color) => color.value == item.color)) {
          colors.push({
            value: item.color,
            id: item.color_id,
          });
        }
      });
      this.initialColor(colors);
      this.initialSizes(this.product.colors);

      return;
    }
    this.initialColor(colors);
    this.initialSizes(this.product.colors);
    this.creating = true;
  },

  methods: {
    ...mapMutations({
      toggle: "todos/toggle",
      on: "admin/product/onDialog",
      changeDialog: "admin/product/changeDialog",
      setText: "admin/product/setText",
      dialogFunction: "admin/product/executeCallBack",
      initialColor: "admin/product/initialColor",
      initialSizes: "admin/product/initialSizes",
    }),
    async save() {
      this.product.colors = this.$store.state.admin.product.sizes;
      if (!this.validation()) return;
      await this.uploadImages();
      await this.$axios
        .$put(`product/${this.$route.params.id}`, {
          product: this.product,
        })
        .then((e) => {
          this.setText(`Modificações Salvas`);
          this.onDialog(this.timeout);
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.setText("<span>Requisição mal<br>formatada Enviada</span>");
          } else {
            this.setText("Houve um erro na atualização");
          }
          this.onDialog(this.timeout);
          return;
        });
    },
    async create() {
      this.product.colors = this.$store.state.admin.product.sizes;
      if (!this.validation()) return;
      await this.uploadImages();
      await this.$axios
        .$post(`product/`, {
          product: this.product,
        })
        .then((p) => {
          this.setText(
            "<span>Produto <wbr>foi <wbr> criado<wbr> com<wbr> sucesso</span>"
          );
          this.onDialog();
          this.product = {
            name: null,
            price: null,
            description: null,
            id: null,
            images: [],
            colors: [],
            categories: [],
          };
          this.initialColor([]);
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.setText(
              e.response.data
                ? e.response.data
                : "<span>Requisição mal<br>formatada Enviada</span>"
            );
          } else {
            this.setText("Houve um erro na Criação");
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
          .$post(`product/image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .catch((e) => {
            this.setText(
              e.response.data ? e.response.data : "Houve um erro na atualização"
            );
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
        .$delete(`product/${this.$route.params.id}`)
        .catch((e) => {
          this.setText(
            e.response.data
              ? e.response.data
              : "Houve um erro ao tentar apagar o produto"
          );
          this.onDialog(this.timeout);
          return;
        })
        .then((e) => {
          this.setText(`Produto deletado`);
          this.onDialog(null, () => {
            this.$router.push("/admin/product");
          });
        });
    },

    validation() {
      let valid = true;
      const reg = new RegExp(
        "^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{1})?|(?:,[0-9]{3})*(?:.[0-9]{1,2})?|(?:.[0-9]{3})*(?:,[0-9]{1,2})?)$"
      );
      if (this.product.name === "" || !this.product.name) {
        this.setText(
          "Adicione<wbr> um<wbr> nome<wbr> para<wbr> o<wbr> produto"
        );
        this.onDialog(this.timeout);
        valid = false;
        return valid;
      }

      if (!reg.test(this.product.price)) {
        this.setText(
          "Adicione<wbr> um<wbr> preço<wbr> válido<wbr> para<wbr> o<wbr> produto"
        );
        this.onDialog(this.timeout);
        valid = false;
        return valid;
      }
      this.product.price = this.product.price.toString().replace(",", ".");
      this.product.price = parseFloat(this.product.price);

      if (this.product.colors.length < 1) {
        this.setText("Adicione<wbr> pelo<wbr> menos<wbr> um<wbr> tamanho");
        this.onDialog(this.timeout);
        valid = false;
        return valid;
      }

      return valid;
    },

    onDialog(timout, cb) {
      this.on(timout, cb);

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