<template>
    <div class="d-flex justify-center">
        <div></div>

        <v-card outlined class="pa-5" style="max-width: 700px; flex-grow: 2">
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
                            v-mask="'+55 (##) #########'"
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
                        >
                            salvar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>

        <div></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: {
                user_name: null,
                cep: null,
                state: null,
                city: null,
                district: null,
                street: null,
                telephone: null,
                number: null,
            },

            rules: {
                required: (value) => !!value || "Campo obrigatório.",
            },
        };
    },

    props: {
        id: String,
    },

    async fetch() {
        if (this.id) {
            //get address
        }
    },

    watch: {
        async "address.cep"() {
            if (this.address.cep.length == 9) {
                const cep = this.address.cep.replace("-", "");
                await this.$axios
                    .get(`address/cep/${cep}`)
                    .then((response) => {
                        console.log(response);
                        this.address.city = response.data.localidade;
                        this.address.state = response.data.uf;
                        this.address.street = response.data.logradouro;
                        this.address.district = response.data.bairro;
                    })
                    .catch((e) =>
                        this.$store.commit("toasted", {
                            text: e.response.data ? e.response.data : e,
                        })
                    );
            }
        },
    },
};
</script>

<style>
</style>