<template>
    <v-card outlined class="my-5">
        <div class="primary--text text-center d-block text-h5 mt-5">
            Cores
        </div>
        <v-row justify="center" class="mb-5 pt-5" v-if="!edit">
            <v-col cols="9" sm="6" class="pb-0 mb-0">
                <v-text-field
                    v-model="newColor"
                    label="Nome"
                    outlined
                    dense
                    class="no-details"
                ></v-text-field>
            </v-col>

            <v-col cols="10" sm="3" class="text-center">
                <v-btn class="accent" @click="create()"> Adicionar </v-btn>
            </v-col>
        </v-row>

        <v-row justify="center" class="mb-5 pt-5" v-else>
            <v-col cols="9" sm="6" class="pb-0 mb-0">
                <v-text-field
                    v-model="colors[index].value"
                    label="Valor"
                    outlined
                    dense
                    class="no-details"
                ></v-text-field>
            </v-col>

            <v-col cols="10" sm="2" class="text-center">
                <v-btn
                    class="red"
                    @click="
                        edit = false;
                        colors[index].value = updateColor;
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
            :items="colors"
            :headers="headers"
            :hide-default-header="true"
        >
            <template #[`item.value`]="{ item }">
                <span>{{ item.value }}</span>
            </template>

            <template #[`item.actions`]="{ item, index }">
                <v-icon @click="remove(item.value)" class="mr-2 red--text">
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
export default {
    data() {
        return {
            colors: [],
            newColor: "",
            updateColor: "",
            headers: [
                { value: "value", sortable: false, align: "center" },
                { value: "actions", sortable: false, align: "center" },
            ],
            edit: false,
            index: 0,
        };
    },

    async fetch() {
        this.colors = await this.$axios.$get(`color`);
    },

    methods: {
        async remove(value) {
            const color = this.colors.find((c) => c.value == value);
            if (color);
            await this.$axios
                .$delete(`color/${color.id}`)
                .then(() => {
                    this.$toasted({
                        text: "Tamanho deletado com sucesso!",
                        color: "success",
                    });
                    this.colors.splice(this.colors.indexOf(color), 1);
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
            this.updateColor = this.colors[this.index].value;
        },

        async update() {
            await this.$axios
                .$put(`color`, { color: this.colors[this.index] })
                .then(() => {
                    this.$toasted({
                        text: "Categoria atualizada com sucesso!",
                        color: "success",
                    });
                    this.edit = false;
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
            if (
                !this.colors.find((c) => c.value == this.newColor) &&
                this.newColor != ""
            ) {
                await this.$axios
                    .$post(`color`, { color: this.newColor })
                    .then((id) => {
                        this.$toasted({
                            text: "Categoria criada com sucesso!",
                            color: "success",
                        });
                        this.colors.push({ value: this.newColor, id });
                    })
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    );
            }

            this.newColor = "";
        },
    },
    computed: {},
};
</script>

<style>
</style>