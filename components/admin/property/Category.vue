<template>
    <v-card outlined class="my-5">
        <div class="primary--text text-center d-block text-h5 mt-5">
            Categorias
        </div>
        <v-row justify="center" class="mb-5 pt-5" v-if="!edit">
            <v-col cols="9" sm="6" class="pb-0 mb-0">
                <v-text-field
                    v-model="newCategory.name"
                    label="Nome"
                    outlined
                    dense
                    class="no-details ml-5"
                ></v-text-field>
                <div class="d-flex mt-5 justify-center align-center">
                    <v-btn
                        color="accent"
                        :loading="isSelecting"
                        outlined
                        @click="handleFileImport"
                    >
                        {{
                            newCategory.image.file == null
                                ? "Adicionar Imagem"
                                : "Mudar Imagem"
                        }}
                    </v-btn>

                    <input
                        ref="uploader"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        name="uploadImages"
                        @change="onFileChanged"
                    />

                    <nuxt-img
                        class="ml-8"
                        :src="
                            newCategory.image.file == null
                                ? newCategory.image.url
                                : createURL(newCategory.image.file)
                        "
                        width="36px"
                        height="36px"
                        format="webp"
                        style="display: inline-block"
                    />
                </div>
            </v-col>

            <v-col cols="4" sm="3" class="text-center">
                <v-btn
                    class="accent"
                    @click="create()"
                    :disabled="
                        newCategory.name == '' || newCategory.image.file == null
                    "
                >
                    Adicionar
                </v-btn>
            </v-col>
        </v-row>

        <v-row justify="center" class="mb-5 pt-5" v-else>
            <v-col cols="9" sm="6" class="pb-0 mb-0">
                <v-text-field
                    v-model="updateCategory.name"
                    label="Valor"
                    outlined
                    dense
                    class="no-details"
                ></v-text-field>

                <div class="d-flex mt-5 justify-center align-center">
                    <v-btn
                        color="accent"
                        :loading="isSelecting"
                        outlined
                        @click="handleFileImport"
                    >
                        Mudar Imagem
                    </v-btn>

                    <input
                        ref="uploader"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        name="uploadImages"
                        @change="onFileChanged"
                    />

                    <nuxt-img
                        :src="updateCategory.image"
                        width="36px"
                        height="36px"
                        format="webp"
                        provider="cloudinary"
                        v-if="updateCategory.image.file == null"
                    />

                    <v-img
                        :src="createURL(updateCategory.image.file)"
                        width="36px"
                        height="36px"
                        v-else
                    />
                </div>
            </v-col>

            <v-col cols="10" sm="2" class="text-center">
                <v-btn
                    class="red"
                    @click="
                        edit = false;
                        updateCategory = { ...newEmptyCategory() };
                    "
                >
                    Cancelar
                </v-btn>
            </v-col>
            <v-col cols="10" sm="2" class="text-center">
                <v-btn class="accent" @click="update">
                    Salvar alterações
                </v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-data-table
            :items="categories"
            :headers="headers"
            :hide-default-header="true"
        >
            <template #[`item.image`]="{ item }">
                <nuxt-img
                    :src="item.image ? item.image : createURL(item.file)"
                    width="36px"
                    height="36px"
                    format="webp"
                />
            </template>
            <template #[`item.name`]="{ item }">
                <span>{{ item.name }}</span>
            </template>

            <template #[`item.actions`]="{ item, index }">
                <v-icon @click="remove(item.name)" class="mr-2 red--text">
                    mdi-delete
                </v-icon>
                <v-icon @click="editItem(index)" class="mr-2 accent--text">
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import ProductImage from "@/components/admin/product/ProductImage.vue";
export default {
    components: {
        ProductImage,
    },
    data() {
        return {
            isSelecting: false,
            categories: [],
            emptyCategory: {
                name: "",
                image: { file: null, url: "/infinity/noImage.png" },
            },
            newCategory: {
                name: "",
                image: { file: null, url: "/infinity/noImage.png" },
            },
            updateCategory: {
                name: "",
                image: { file: null, url: "/infinity/noImage.png" },
            },
            headers: [
                { value: "image", sortable: false },
                { value: "name", sortable: false, align: "center" },
                { value: "actions", sortable: false, align: "center" },
            ],
            edit: false,
            index: 0,
        };
    },
    async fetch() {
        this.categories = await this.$axios.$get(`category`);
        this.newCategory = { ...this.newEmptyCategory() };
        this.updateCategory = { ...this.newEmptyCategory() };
    },

    methods: {
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
            let file = e.target.files[0];
            if (file) {
                if (this.edit) {
                    this.updateCategory.image = {};
                    this.updateCategory.image.name = file.name;
                    this.updateCategory.image.file = file;
                } else {
                    this.newCategory.image = {};
                    this.newCategory.image.name = file.name;
                    this.newCategory.image.file = file;
                }
            }
        },

        createURL(img) {
            return URL.createObjectURL(img);
        },

        async remove(name) {
            const category = this.categories.find((c) => c.name == name);
            if (category);
            await this.$axios
                .$delete(`category/${category.id}`)
                .then(() => {
                    this.$toasted({
                        text: "Categoria deletada com sucesso!",
                        color: "success",
                    });
                    this.categories.splice(
                        this.categories.indexOf(category),
                        1
                    );
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
        },

        editItem(index) {
            this.index = index;
            this.edit = true;
            this.updateCategory = { ...this.categories[this.index] };
        },

        newEmptyCategory() {
            return {
                name: "",
                image: { file: null, url: "/infinity/noImage.png" },
            };
        },

        async update() {
            let formData = new FormData();
            if (this.updateCategory.image.file) {
                formData.append("file", this.updateCategory.image.file);
                this.updateCategory.image = this.createURL(
                    this.updateCategory.image.file
                );
            }

            formData.append("image", this.updateCategory.image);
            formData.append("name", this.updateCategory.name);
            formData.append("id", this.updateCategory.id);

            await this.$axios
                .$put(`category`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((category) => {
                    this.$toasted({
                        text: "Categoria atualizada com sucesso!",
                        color: "success",
                    });

                    this.edit = false;
                    this.categories[this.index].name = category.name;
                    this.categories[this.index].image = category.image;
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
            this.updateCategory = { ...this.newEmptyCategory() };
        },

        async create() {
            if (
                !this.categories.find((c) => c.name == this.newCategory.name) &&
                this.newCategory.name != ""
            ) {
                let formData = new FormData();

                formData.append("file", this.newCategory.image.file);
                formData.append("name", this.newCategory.name);
                formData.append("id", this.newCategory.id);

                await this.$axios
                    .$post(`category`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((category) => {
                        this.$toasted({
                            text: "Categoria criada com sucesso!",
                            color: "success",
                        });
                        this.categories.push(category);
                    })
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    );
            }

            this.newCategory = { ...this.newEmptyCategory() };
        },
    },
    computed: {},
};
</script>

<style>
</style>