<template>
    <v-card outlined class="my-5">
        <div class="primary--text text-center d-block text-h6 mt-5">
            Categorias
        </div>
        <v-row justify="center" class="mb-5 pt-5">
            <v-col cols="9" sm="6" class="pb-0 mb-0">
                <v-autocomplete
                    :items="categoriesItems"
                    class="ma-0 pa-0"
                    outlined
                    dense
                    item-text="name"
                    v-model="newCategory"
                    label="Categoria"
                >
                </v-autocomplete>
            </v-col>

            <v-col cols="12" sm="4" class="text-center">
                <v-btn class="accent" @click="pushCategory"> Adicionar </v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-data-table
            :items="items"
            :headers="headers"
            :hide-default-header="true"
            hide-default-footer
        >
            <template #[`item.image`]="{ item }">
                <div>

                </div>
                <nuxt-img
                    format="webp"
                    :src="item.image ? item.image : '/noImage'"
                    width="36px"
                    height="36px"
                    :provider="item.provider || 'cloudinary'"
                >
                </nuxt-img>
            </template>

            <template #[`item.actions`]="{ item }">
                <v-icon
                    @click="deleteCategory(item.name)"
                    class="mr-2 red--text"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            newCategory: null,
            headers: [
                { value: "image", sortable: false, align: "center" },
                { value: "name", sortable: false },
                { value: "actions", sortable: false, align: "center" },
            ],
        };
    },
    async fetch() {
        this.categories = await this.$axios.$get(`category`);
    },
    props: {
        items: [],
    },
    methods: {
        deleteCategory(name) {
            this.items.forEach((c, index) => {
                if (c.name == name) this.items.splice(index, 1);
            });
        },

        pushCategory() {
            this.items.push(
                this.categories.find((c) => c.name == this.newCategory)
            );
            this.newCategory = null;
        },
    },
    computed: {
        categoriesItems() {
            let items = [];
            this.categories.forEach((c) => {
                if (
                    !Boolean(
                        this.items.find((category) => category.name == c.name)
                    )
                ) {
                    items.push(c);
                }
            });
            return items;
        },
    },
};
</script>

<style>
</style>