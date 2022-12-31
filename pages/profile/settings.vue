<template>
    <div align="center">
        <div align="left" style="max-width: 1000px">
            <v-icon @click="$router.push('/profile')" x-large
                >mdi-arrow-left-bold</v-icon
            >
        </div>

        <h1 class="text-left pb-5 ma-0" style="max-width: 800px">Dados</h1>
        <v-card style="max-width: 800px" outlined class="pa-5 px-10">
            <div align="center" v-if="$fetchState.pending">
                <v-skeleton-loader
                    class="mx-auto"
                    type="image"
                ></v-skeleton-loader>
            </div>

            <div v-else class="text-left">
                <div>
                    <v-icon
                        v-if="!edit"
                        @click="edit = true"
                        color="accent"
                        style="position: absolute; right: 5px; top: 5px"
                        >mdi-pencil</v-icon
                    >
                    <v-icon
                        v-else
                        @click="edit = false"
                        color="green"
                        style="position: absolute; right: 5px; top: 5px"
                        >mdi-check</v-icon
                    >
                </div>

                <div class="text-h5 mb-2">
                    <span class="font-weight-bold">Nome: </span>
                    <v-text-field
                        class="d-inline-block pa-0 ma-0 text-h5 mb-2"
                        style="max-width: 210px"
                        dense
                        v-model="user.first_name"
                        v-if="edit"
                    ></v-text-field>
                    <span v-else>
                        {{ user.first_name }}
                    </span>
                </div>

                <div class="text-h5 mb-2">
                    <span class="font-weight-bold"> Sobrenome: </span>
                    <v-text-field
                        class="d-inline-block pa-0 ma-0 text-h5 mb-2"
                        style="max-width: 210px"
                        dense
                        v-model="user.last_name"
                        v-if="edit"
                    ></v-text-field>
                    <span v-else>
                        {{ user.last_name }}
                    </span>
                </div>
                <div class="text-h5 mb-2">
                    <span class="font-weight-bold"> CPF: </span>
                    <v-text-field
                        class="d-inline-block pa-0 ma-0 text-h5 mb-2"
                        style="max-width: 210px"
                        dense
                        v-mask="'###.###.###-##'"
                        :rules="[rules.required, rules.cpf]"
                        v-model="user.cpf"
                        v-if="edit"
                    ></v-text-field>
                    <span v-else>
                        {{ user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}}
                    </span>
                </div>

                <div class="text-h5 mb-2">
                    <span class="font-weight-bold"> E-mail: </span>
                    <v-text-field
                        class="d-inline-block pa-0 ma-0 text-h5 mb-2"
                        style="max-width: 210px"
                        dense
                        v-model="user.email"
                        v-if="edit"
                    ></v-text-field>
                    <span v-else>
                        {{ user.email }}
                    </span>
                </div>
            </div>

            <v-divider class="my-5"></v-divider>

            <v-btn
                height="40px"
                width="150px"
                :disabled="save_disabled"
                class="red white--text font-weight-bold hidden-sm-and-down mx-5"
                @click="
                    edit = false;
                    user = { ...old_user };
                "
                >Cancelar</v-btn
            >
            <v-btn
                height="40px"
                width="150px"
                :disabled="save_disabled"
                class="
                    accent
                    white--text
                    font-weight-bold
                    hidden-sm-and-down
                    mx-5
                "
                @click="updateUser"
                >Salvar alterações</v-btn
            >
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            old_user: {
                first_name: "",
                last_name: "",
                email: "",
                cpf: "",
            },

            user: {
                first_name: "",
                last_name: "",
                email: "",
                cpf: "",
            },

            status_model: null,
            save_disabled: true,
            edit: false,
            rules: {
                required: value => !!value || "Campo obrigatório.",
                counter: value=>
                    value.length >= 8 || "mínimo 8 caracteres  ",
                email: value => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "E-mail inválido";
                },
                cpf: value => {
                    const pattern =
                        /^((\d{3}\d{3}?\d{3}?\d{2})|(\d{3}\.\d{3}\.\d{3}\-\d{2}))$/;

                    return pattern.test(value) || "CPF inválido.";
                },
            },
        };
    },

    async fetch() {
        this.user = await this.$axios.$get(`user`).catch((e) =>
            this.$toasted({
                text: e.response.data
                    ? e.response.data
                    : "Ocorreu um erro inesperado!",
            })
        );

        this.old_user = { ...this.user };
    },

    watch: {
        user: {
            handler() {
                let diff = false;

                let user_local = this.user;
                user_local.cpf = user_local.cpf.replace(/[^0-9]/g, "");

                if (user_local.first_name != this.old_user.first_name)
                    diff = true;
                if (user_local.last_name != this.old_user.last_name)
                    diff = true;
                if (user_local.cpf != this.old_user.cpf) diff = true;
                if (user_local.email != this.old_user.email) diff = true;

                this.save_disabled = diff ? false : true;
            },
            deep: true,
        },
    },

    

    methods: {
        async updateUser() {
            if (!this.validateUser()) return;
            this.login_loading = true;
            await this.$axios
                .$put(`user/`, {
                    user: this.user,
                })
                .then(async () => {
                    this.login_loading = false;

                    this.$toasted({
                        text: "Dados atualizados com sucesso!",
                        color: "success",
                    });
                    await this.$axios.$post(`validateToken/`);
                    document.location.reload(true);
                })
                .catch((e) => {
                    this.login_loading = false;
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    });
                });
        },

       
        validateUser() {
            let valido = true;
            if (!this.validateName()) valido = false;
            else if (!this.validateCPF()) valido = false;
            else if (!this.validateEmail()) valido = false;

            return valido;
        },

        validateName() {
            if (this.user.first_name == "") {
                this.$toasted({ text: "Nome inválido!" });
                return false;
            }
            if (this.user.last_name == "") {
                this.$toasted({ text: "Sobrenome inválido!" });
                return false;
            }
            return true;
        },

        validateCPF() {
            let cpf = this.user.cpf.replace(/[^0-9]/g, "");
            let Soma;
            let valido = true;
            let Resto;
            Soma = 0;
            if (cpf == "00000000000") valido = false;

            for (let i = 1; i <= 9; i++) {
                Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            Resto = (Soma * 10) % 11;

            if (Resto == 10 || Resto == 11) Resto = 0;
            if (Resto != parseInt(cpf.substring(9, 10))) valido = false;

            Soma = 0;
            for (let i = 1; i <= 10; i++) {
                Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            Resto = (Soma * 10) % 11;

            if (Resto == 10 || Resto == 11) Resto = 0;
            if (Resto != parseInt(cpf.substring(10, 11))) valido = false;

            if (!valido) {
                this.$toasted({ text: "CPF inválido!" });
            }
            return valido;
        },

        validateEmail() {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let valido = pattern.test(this.user.email);

            if (!valido) {
                this.$toasted({ text: "E-mail inválido!" });
            }
            return valido;
        },

        validatePassword() {
            if (this.user.password.length < 8) {
                this.$toasted({ text: "Senha inválido!" });
                return false;
            }

            if (this.user.confirm_password < 8) {
                this.$toasted({ text: "Confirmação de senha inválido!" });
                return false;
            }

            if (this.user.password != this.user.confirm_password) {
                this.$toasted({ text: "Senhas não conferem!" });
                return false;
            }

            return true;
        },
    },
};
</script>

<style>
</style>