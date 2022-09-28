<template>
    <div align="center">
        <div align="left" style="max-width: 1000px">
            <v-icon @click="$router.push('/profile/address')" x-large
                >mdi-arrow-left-bold</v-icon
            >
        </div>
        <h1 class="text-left pb-5" style="max-width: 700px">
            {{ $route.params.mode != "new-address" ? "Editar" : "Criar" }}
            Endereço
        </h1>
        <v-card outlined class="pa-5" style="max-width: 700px">
            <v-form>
                <v-row style="width: -webkit-fill-available">
                    <v-col class="pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Nome completo"
                            :rules="[rules.required]"
                            v-model="address.user_name"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="CEP"
                            v-mask="'#####-###'"
                            maxlength="9"
                            v-model="address.cep"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="justify-space-between">
                    <v-col class="justify-space-between pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Estado"
                            disabled
                            v-model="address.state"
                        ></v-text-field>
                    </v-col>

                    <v-col class="pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Cidade"
                            disabled
                            v-model="address.city"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="justify-space-between pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Bairro"
                            v-model="address.district"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="justify-space-between">
                    <v-col class="justify-space-between pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Rua/Avenida"
                            v-model="address.street"
                        ></v-text-field>
                    </v-col>

                    <v-col class="pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Número"
                            v-model="address.number"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="justify-space-between pl-0" cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Telefone para contato"
                            v-mask="'(##) #########'"
                            v-model="address.telephone"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="d-flex justify-center">
                    <v-col class="justify-space-between pl-0" cols="12" md="6">
                        <v-btn
                            color="primary"
                            class="accent third--text font-weight-bold"
                            block
                            width="200px"
                            height="50px"
                            @click="save"
                        >
                            salvar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            mode: this.$route.params ? this.$route.params.mode : null,
            address: this.$store.getters["user/getAddress"],

            rules: {
                required: (value) =>
                    (!!value && value != "") || "Campo obrigatório.",
            },
        };
    },

    middleware: "address-edit-and-new",

    watch: {
        async "address.cep"() {
            if (this.address.cep.length == 9) {
                const cep = this.address.cep.replace("-", "");
                await this.$axios
                    .get(`address/cep/${cep}`)
                    .then((response) => {
                        const { localidade, uf, logradouro, bairro } =
                            response.data;
                        console.log(response);
                        this.address.city =
                            localidade != "" ? localidade : this.address.city;
                        this.address.state = uf != "" ? uf : this.address.state;
                        this.address.street =
                            logradouro != "" ? logradouro : this.address.street;
                        this.address.district =
                            bairro != "" ? bairro : this.address.district;
                    })
                    .catch((e) => {
                        this.$toasted({
                            text: "CEP não encontrado!",
                        });
                        this.address.cep = "";
                    });
            }
        },
    },

    methods: {
        addressValid() {
            if (!this.address.user_name || this.address.user_name == "") {
                this.$toasted({ text: "Preencha seu nome completo!" });
                return false;
            }
            if (
                !this.address.cep ||
                this.address.cep == "" ||
                this.address.cep.length != 9
            ) {
                this.$toasted({ text: "Preencha o CEP do enderço!" });
                return false;
            }
            if (!this.address.state || this.address.state == "") {
                this.$toasted({ text: "Preencha o nome estado!" });
                return false;
            }
            if (!this.address.city || this.address.city == "") {
                this.$toasted({ text: "Preencha o nome da cidade!" });
                return false;
            }
            if (!this.address.district || this.address.district == "") {
                this.$toasted({ text: "Preencha o nome do bairro!" });
                return false;
            }
            if (!this.address.street || this.address.street == "") {
                this.$toasted({ text: "Preencha  o nome da rua!" });
                return false;
            }

            if (!this.address.telephone || this.address.telephone == "") {
                this.$toasted({ text: "Preencha o número para contato!" });
                return false;
            }

            if (!this.address.number || this.address.number == "") {
                this.$toasted({
                    text: "Preencha o número referente a sua casa!",
                });
                return false;
            }

            return true;
        },

        async save() {
            const regNumber = /[^0-9]+/g;

            if (!this.addressValid()) return;
            this.address.cep = this.address.cep.replace(regNumber, "");
            this.address.telephone = this.address.telephone.replace(
                regNumber,
                ""
            );

            if (this.mode == "new-address") {
                await this.$axios
                    .$post(`address/new-address`, {
                        address: this.address,
                    })
                    .then(() => {
                        this.$toasted({
                            text: "Endereço criado com sucesso!",
                            color: "success",
                        });
                        this.$router.push("/profile/address");
                        return;
                    });
                this.address.cep = "";
                return;
            }

            await this.$axios
                .$put(`address/${this.address.id}`, { address: this.address })
                .then(() => {
                    this.$toasted({
                        text: "Endereço atualizado com sucesso!",
                        color: "success",
                    });
                    this.$router.push("/profile/address");
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                );
        },
    },
};
</script>

<style>
</style>