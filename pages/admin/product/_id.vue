<template>
    <v-form ref="form" enctype="multipart/form-data" method="post">
        <v-row justify="space-around">
            <v-col cols="12">
                <NuxtLink to="/admin/product" style="text-decoration: none">
                    <v-icon large class="primary--text ml-5"
                        >mdi-arrow-left-bold</v-icon
                    >
                </NuxtLink>
            </v-col>
            <v-col md="6" sm="10">
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
                    v-model="descriptionText"
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
                <v-btn
                   min-width="150px"
                    color="green"
                    @click="create()"
                    class="white--text"
                >
                    Criar
                </v-btn>
            </v-col>

            <v-col cols="6" sm="6" md="3" v-if="!creating">
                <v-btn block color="green" @click="save()"> Salvar alterações </v-btn>
            </v-col>

            <v-col cols="6" sm="6" md="3" v-if="!creating">
                <v-btn block color="red" @click="deleteProduct()">
                    Excluir
                </v-btn>
            </v-col>
        </v-row>
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
        descriptionText: "",
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
            this.product = await this.$axios
                .$get(`product/${this.$route.params.id}`)
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );

            let pDescription = this.product.description;

            if (pDescription) {
                this.descriptionText = pDescription
                    .replace(/<br>/g, "\n")
                    .replace(/<wbr\/\>&nbsp;<wbr\/\>/g, " ");
            }

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
            initialColor: "admin/product/initialColor",
            initialSizes: "admin/product/initialSizes",
        }),
        async save() {
            this.product.colors = this.$store.state.admin.product.sizes;
            this.product.description = await this.descriptionText
                .replace(/\n/g, "<br>")
                .replace(/ /g, "<wbr/>&nbsp;<wbr/>");

            if (!this.validation()) return;
            await this.uploadImages();
            await this.$axios
                .$put(`product/${this.$route.params.id}`, {
                    product: this.product,
                })
                .then((e) => {
                    this.$toasted({
                        text: "Modificações salvas!",
                        color: "success",
                    });
                    this.$router.push("/admin/product");
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
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
                    this.$toasted({
                        text: "Produto criado com sucesso!",
                        color: "success",
                    });
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
                    this.$router.push("/admin/product");
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
        },
        async uploadImages() {
            let formData = new FormData();
            let append = false;
            this.product.images.forEach((image, index) => {
                if (image.file) {
                    image.file.primary = image.primary;
                    formData.append("uploadImages", image.file);
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
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    )
                    .then((images) => {
                        this.parseImages(images);
                    });
            }
        },
        async deleteProduct() {
            await this.$axios
                .$delete(`product/${this.$route.params.id}`)
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                )
                .then((e) => {
                    this.$toasted({
                        text: "Produto deletado sucesso!",
                        color: "success",
                    });
                    this.$router.push("/admin/product");
                });
        },

        validation() {
            const reg = new RegExp(
                "^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{1})?|(?:,[0-9]{3})*(?:.[0-9]{1,2})?|(?:.[0-9]{3})*(?:,[0-9]{1,2})?)$"
            );

            if (this.product.name === "" || !this.product.name) {
                this.$toasted({ text: "Adicione um nome ao produto!" });
                return false;
            }

            if (!reg.test(this.product.price)) {
                this.$toasted({
                    text: "Adicione um preço válido para o produto!",
                });
                return false;
            }

            this.product.price = this.product.price
                .toString()
                .replace(",", ".");

            this.product.price = parseFloat(this.product.price);

            if (this.product.price <= 0) {
                this.$toasted({
                    text: "Adicione um preço válido para o produto!",
                });
                return false;
            }

            if (this.product.colors.length < 1) {
                this.$toasted({ text: "Adicione pelo menos um tamanho!" });
                return false;
            }

            return true;
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