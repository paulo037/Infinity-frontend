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

                <v-card outlined class="my-5 py-0">
                    <v-card-title>Descrição</v-card-title>
                    <Editor  v-model="product.description"/>
                </v-card>
                <AdminProductImage
                    :items="product.images"
                    :create_items="createImages"
                    :delete_items="deleteImages"
                />
            </v-col>

            <v-col md="6" sm="10">
                <AdminProductColor />
                <AdminProductSize />
                <AdminProductCategory :items="product.categories" />
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
                <v-btn block color="red" @click="deleteProduct()">
                    Excluir
                </v-btn>
            </v-col>

            <v-col cols="6" sm="6" md="3" v-if="!creating">
                <v-btn block color="green" @click="save()">
                    Salvar alterações
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import { mapMutations } from "vuex";

export default {

    data: () => ({  
        rate: 0,
        errors: {},
        timeout: 3000,
        creating: false,
        descriptionText: "",
        deleteImages: [],
        createImages: [],
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

        createProductEntity(payload) {
            return JSON.parse(
                JSON.stringify({
                    name: payload.name,
                    id: payload.id,
                    price: payload.price,
                    description: payload.description,
                    height: payload.height,
                    width: payload.width,
                    length: payload.length,
                    weight: payload.weight,
                })
            );
        },
        async save() {
            this.$store.commit("setLoading", { loading: true });
            this.product.colors = this.$store.state.admin.product.sizes;
            this.product.name = this.product.name.trim();
          
            if (!this.validation()) return;

            let formData = new FormData();

            const product = this.createProductEntity(this.product);

            formData.append("product", JSON.stringify(product));

            this.createImages.forEach((image, index) => {
                formData.append("uploadImages", image.file);
            });

            formData.append("deleteImages", JSON.stringify(this.deleteImages));

            const updateImages = this.product.images.filter((i) => this.deleteImages.indexOf(i) == -1 && !i.file)
            formData.append("updateImages", JSON.stringify(updateImages));

            formData.append("colors", JSON.stringify(this.product.colors));

            formData.append(
                "categories",
                JSON.stringify(this.product.categories)
            );

            formData.append(
                "primary",
                JSON.stringify(this.createImages.map((i) => i.primary))
            );

            await this.$axios
                .$put(`product/${this.product.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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
            this.$store.commit("setLoading", { loading: false });
        },


        async create() {
            this.$store.commit("setLoading", { loading: true });
            this.product.colors = this.$store.state.admin.product.sizes;
            this.product.name = this.product.name.trim();
            if (!this.validation()) return;

            let formData = new FormData();

            const product = this.createProductEntity(this.product);

            formData.append("product", JSON.stringify(product));

            this.createImages.forEach((image, index) => {
                formData.append("uploadImages", image.file);
            });


            formData.append("colors", JSON.stringify(this.product.colors));

            formData.append(
                "categories",
                JSON.stringify(this.product.categories)
            );

            formData.append(
                "primary",
                JSON.stringify(this.createImages.map((i) => i.primary))
            );

            await this.$axios
                .$post(`product`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((e) => {
                    this.$toasted({
                        text: "Produto criado com sucesso!",
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
            this.$store.commit("setLoading", { loading: false });
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

    },
};
</script>

<style>
</style>