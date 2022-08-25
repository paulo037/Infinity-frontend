<template>
    <div align="center">
        <v-card max-width="500px" class="secondary mb-8 pa-8" elevation="20">
            <header class="third--text text-h4 mb-8">CADASTRAR</header>
            <v-form ref="form" class="text-left">
                <v-text-field
                    v-model="user.first_name"
                    label="Nome"
                    outlined
                    :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                    v-model="user.last_name"
                    label="Sobrenome"
                    :rules="[rules.required]"
                    outlined
                ></v-text-field>

                <v-text-field
                    v-model="user.cpf"
                    label="CPF"
                    v-mask="'###.###.###-##'"
                    :rules="[rules.required, rules.cpf]"
                    outlined
                ></v-text-field>

                <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    :rules="[rules.required, rules.email]"
                    outlined
                ></v-text-field>

                <v-text-field
                    v-model="user.password"
                    label="Senha"
                    :rules="[rules.required, rules.counter]"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                ></v-text-field>

                <v-text-field
                    v-model="user.confirm_password"
                    :rules="[rules.required, rules.counter]"
                    label="Confirmar Senha"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2"
                    :type="show2 ? 'text' : 'password'"
                    outlined
                ></v-text-field>

                <v-container width="100%" class="my-8 text-center">
                    <v-btn
                        align="center"
                        height="50px"
                        class="primary px-10"
                        @click="createUser"
                    >
                        CONTINUAR
                    </v-btn>
                </v-container>
            </v-form>
        </v-card>
    </div>
</template>


<script>
import ToastedVue from "~/components/template/Toasted.vue";
import { mapMutations } from "vuex";

export default {
    components: {
        ToastedVue,
    },
    data() {
        return {
            snackbar: false,
            text: "",
            color: "",
            show1: false,
            show2: false,
            user: {
                // first_name: "",
                // last_name: "",
                // cpf: "",
                // email: "",
                // password: "",
                // confirm_password: "",
            },

            rules: {
                required: (value) => !!value || "Campo obrigatório.",
                counter: (value) =>
                    value.length >= 8 || "mínimo 8 caracteres  ",
                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "E-mail inválido";
                },
                cpf: (value) => {
                    const pattern =
                        /^((\d{3}\d{3}?\d{3}?\d{2})|(\d{3}\.\d{3}\.\d{3}\-\d{2}))$/;

                    return pattern.test(value) || "CPF inválido.";
                },
            },
        };
    },

    methods: {
        async createUser() {
            if (!this.validateUser()) return;
            this.$axios
                .$post(`signup/`, {
                    user: this.user,
                })
                .then(() => {
                    this.toasted({
                        text: "Conta criada com sucesso !",
                        color: "success",
                    });

                    this.$auth
                        .loginWith("local", {
                            data: {
                                email: this.user.email,
                                password: this.user.password,
                            },
                        })
                        .then((response) => {
                            this.toasted({
                                text: "Login realizado com sucesso !",
                                color: "success",
                            });
                        })
                        .catch((e) =>
                            e.response.data
                                ? this.toasted({ text: e.response.data })
                                : this.toasted({ text: e })
                        );
                })
                .catch((e) =>
                    e.response.data
                        ? this.toasted({ text: e.response.data })
                        : this.toasted({ text: e })
                );
        },

        ...mapMutations(["toasted"]),

        validateUser() {
            let valido = true;
            if (!this.validateName()) valido = false;
            else if (!this.validateCPF()) valido = false;
            else if (!this.validateEmail()) valido = false;
            else if (!this.validatePassword()) valido = false;

            return valido;
        },

        validateName() {
            if (this.user.first_name == "") {
                this.toasted({ text: "Nome inválido !" });
                return false;
            }
            if (this.user.last_name == "") {
                this.toasted({ text: "Sobrenome inválido !" });
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
                this.toasted({ text: "CPF inválido !" });
            }
            return valido;
        },

        validateEmail() {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let valido = pattern.test(this.user.email);

            if (!valido) {
                this.toasted({ text: "E-mail inválido !" });
            }
            return valido;
        },

        validatePassword() {
            if (this.user.password.length < 8) {
                this.toasted({ text: "Senha inválido !" });
                return false;
            }

            if (this.user.confirm_password < 8) {
                this.toasted({ text: "Confirmação de senha inválido !" });
                return false;
            }

            if (this.user.password != this.user.confirm_password) {
                this.toasted({ text: "Senhas não conferem !" });
                return false;
            }

            return true;
        },
    },
};
</script>

<style>
</style>