<template>
    <v-card flat class="pa-5">
        <h1>Gerenciamento de Promoções</h1>

        <div class="promotion-info">
            <v-row>
                <v-col cols="12" class="px-0">
                    <div class="promotion-text mb-5 pl-3 font-weight-bold">
                        Geral
                    </div>
                    <v-row class="justify-space-between px-0">
                        <v-col
                            cols="12"
                            md="4"
                            class="d-flex justify-center pa-0"
                        >
                            <v-text-field
                                outlined
                                dense
                                v-model="selectedPromotion.name"
                                label="Nome"
                                class="px-3"
                                style="max-width: 300px"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            md="4"
                            class="d-flex justify-center pa-0 pb-5"
                        >
                            <div
                                class="custom-btn outlined"
                                @click="modal1Open = true"
                            >
                                {{ text1 }}
                            </div>

                            <v-dialog v-model="modal1Open" persistent>
                                <div class="d-flex flex-column">
                                    <v-date-picker
                                        v-model="startDate"
                                        locale="pt"
                                        :no-title="true"
                                        style="background-color: #1e1e1e00; !important;"
                                        @input="
                                            (date) => {
                                                this.selectedPromotion.startDate =
                                                    new Date(
                                                        date + ', 00:00:00'
                                                    );
                                            }
                                        "
                                    ></v-date-picker>
                                    <div class="d-flex justify-center pt-5">
                                        <v-btn
                                            class="accent"
                                            @click="modal1Open = false"
                                            style="width: 290px"
                                            >Fechar</v-btn
                                        >
                                    </div>
                                </div>
                            </v-dialog>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                            class="d-flex justify-center pa-0 pb-5"
                        >
                            <div
                                class="custom-btn outlined"
                                @click="modal2Open = true"
                            >
                                {{ text2 }}
                            </div>

                            <v-dialog
                                v-model="modal2Open"
                                persistent
                                class="pa-10"
                            >
                                <div class="d-flex flex-column">
                                    <v-date-picker
                                        v-model="endDate"
                                        locale="pt"
                                        :no-title="true"
                                        style="background-color: #1e1e1e00; !important;"
                                        @input="
                                            (date) => {
                                                this.selectedPromotion.endDate =
                                                    new Date(
                                                        date + ', 00:00:00'
                                                    );
                                            }
                                        "
                                    ></v-date-picker>
                                    <div class="d-flex justify-center pt-5">
                                        <v-btn
                                            class="accent"
                                            @click="modal2Open = false"
                                            style="width: 290px"
                                            >Fechar</v-btn
                                        >
                                    </div>
                                </div>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" md="6">
                    <div class="promotion-text mb-5 font-weight-bold">
                        Comprando
                    </div>
                    <v-card outlined class="pa-5">
                        <v-select
                            outlined
                            dense
                            v-model="selectedPromotion.buying_category_id"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            label="Categoria"
                        ></v-select>
                        <v-text-field
                            outlined
                            dense
                            v-model="selectedPromotion.buying_quantity"
                            label="Quantidade"
                        ></v-text-field>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <div class="promotion-text mb-5 font-weight-bold">
                        Você ganha
                    </div>
                    <v-card outlined class="pa-5">
                        <v-select
                            outlined
                            dense
                            v-model="selectedPromotion.win_category_id"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            label="Categoria"
                        ></v-select>
                        <v-text-field
                            outlined
                            dense
                            v-model="selectedPromotion.win_quantity"
                            label="Quantidade"
                        ></v-text-field>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-3">
                <v-btn color="accent" @click="createPromotion" v-if="!isEditing"
                    >Criar Promoção</v-btn
                >
                <v-row v-if="isEditing" class="justify-center">
                    <v-btn
                        color="error"
                        class="mx-5"
                        @click="
                            isEditing = false;
                            clearSelection();
                        "
                        >Cancelar</v-btn
                    >
                    <v-btn color="success" class="mx-5" @click="updatePromotion"
                        >Atualizar</v-btn
                    >
                </v-row>
            </v-row>
        </div>

        <h2>Promoções Existentes</h2>
        <v-card outlined>
            <v-data-table
                :headers="tableHeaders"
                :items="promotions"
                item-key="id"
            >
                <template v-slot:item.actions="{ index, item }">
                    <v-icon
                        small
                        @click="chose(index)"
                        class="mr-2 accent--text"
                        >mdi-pencil</v-icon 
                    >
                    <v-icon
                        small
                        @click="deletePromotion(item)"
                        class="error--text"
                        >mdi-delete</v-icon
                    >
                </template>
                >

                <template v-slot:item.startDate="{ item }">
                    {{ $brazilianDate(item.startDate) }}
                </template>

                <template v-slot:item.endDate="{ item }">
                    {{ $brazilianDate(item.endDate) }}
                </template>
            </v-data-table>
        </v-card>
    </v-card>
</template>
  
  <script>
import moment from "moment-timezone";

export default {
    data() {
        return {
            selectedPromotion: {
                name: "",
                buying_category_id: "",
                buying_category: "",
                buying_quantity: 0,
                win_category_id: "",
                win_category: "",
                win_quantity: 0,
                startDate: null,
                endDate: null,
            },
            startDate: null,
            endDate: null,
            categories: [], // Categorias disponíveis
            index: null,
            isEditing: false,
            selectedDate: null,
            modal1Open: false,
            modal2Open: false,
            promotions: [],
            tableHeaders: [
                { text: "Nome", value: "name" },
                { text: "Data de Inicio", value: "startDate" },
                { text: "Data de Fim", value: "endDate", align: "center" },
                {
                    text: "Categoria 1",
                    value: "buying_category",
                    align: "center",
                },
                {
                    text: "Quantidade 1",
                    value: "buying_quantity",
                    align: "center",
                },
                { text: "Categoria 2", value: "win_category", align: "center" },
                {
                    text: "Quantidade 2",
                    value: "win_quantity",
                    align: "center",
                },
                { text: "Ações", value: "actions", sortable: false },
            ],
        };
    },

    async fetch() {
        this.categories = await this.$axios.$get("/category");
        this.promotions = await this.$axios.$get("/promotion");
    },

    computed: {
        text1() {
            return !!this.selectedPromotion.startDate
                ? "Data de Início: " +
                      this.$brazilianDate(this.selectedPromotion.startDate)
                : "Selecionar Data de Início";
        },

        text2() {
            return !!this.selectedPromotion.endDate
                ? "Data de Término: " +
                      this.$brazilianDate(this.selectedPromotion.endDate)
                : "Selecionar Data de Término";
        },
    },

    methods: {
        chose(index) {
            this.selectedPromotion = { ...this.promotions[index] };
            this.index = index;
            this.isEditing = true;
        },

        getName(id) {
            return this.categories.find((v) => v.id == id).name;
        },

        validation(promotion, create = true) {
            return (
                promotion.name &&
                promotion.buying_category_id &&
                promotion.buying_quantity &&
                promotion.win_category_id &&
                promotion.win_quantity &&
                promotion.startDate &&
                promotion.endDate &&
                (promotion.id || create)
            );
        },
        async createPromotion() {
            if (this.validation(this.selectedPromotion)) {
                await this.$axios
                    .$post("/promotion", { promotion: this.selectedPromotion })
                    .then((id) => {
                        this.selectedPromotion.id = id;
                        this.$toasted({
                            text: "Promoção criada com sucesso!",
                            color: "success",
                        });
                    })
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    );
                this.selectedPromotion.buying_category = this.getName(
                    this.selectedPromotion.buying_category_id
                );
                this.selectedPromotion.win_category = this.getName(
                    this.selectedPromotion.win_category_id
                );
                this.promotions.push(this.selectedPromotion);
                this.clearSelection();
            } else {
                this.$toasted({
                    text: "Todos os campos devem ser preenchidos!",
                    color: "error",
                });
            }
        },

        async deletePromotion(promotion) {
            const index = this.promotions.indexOf(promotion);
            if (index !== -1) {
                await this.$axios
                    .$delete(`/promotion/${this.promotions[index].id}`)
                    .then(() => {
                        this.promotions.splice(index, 1);
                        this.$toasted({
                            text: "Promoção deletada com sucesso!",
                            color: "success",
                        });
                    })
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    );
            }
        },

        async updatePromotion() {
            if (this.validation(this.selectedPromotion, false)) {
                await this.$axios
                    .$put("/promotion", { promotion: this.selectedPromotion })
                    .then(() => {
                        this.promotions.splice(this.index, 1);
                        this.promotions.push({ ...this.selectedPromotion });

                        this.$toasted({
                            text: "Promoção atualizada com sucesso!",
                            color: "success",
                        });
                    })
                    .catch((e) =>
                        this.$toasted({
                            text: e.response.data
                                ? e.response.data
                                : "Ocorreu um erro inesperado!",
                        })
                    );

                this.isEditing = false;
                this.clearSelection();
            } else {
                this.$toasted({
                    text: "Todos os campos devem ser preenchidos!",
                    color: "error",
                });
            }
        },

        clearSelection() {
            this.selectedPromotion = {
                name: "",
                buying_category_id: "",
                buying_category: "",
                buying_quantity: 0,
                win_category_id: "",
                win_category: "",
                win_quantity: 0,
                startDate: null,
                endDate: null,
            };
        },
    },
};
</script>
  
  <style >
.promotion-info {
    margin-bottom: 16px;
}

.v-dialog--active {
    display: contents !important;
}

.v-picker__body div {
    padding: 10px 10px 25px 10px;
}

.v-picker__body div div {
    padding: 0px;
}
.custom-btn {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.custom-btn.outlined {
    background-color: transparent;
}

.custom-btn.outlined:hover {
    background-color: transparent;
    border: 1px solid #ffa000;
    color: #ffa000;
}
</style>
  