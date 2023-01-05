<template>
    <div align="center">
        <v-card max-width="400px" class="secondary mb-8 pa-8" elevation="5">
            <div
                @click="step == 2 ? (step = 1) : $router.go(-1)"
                style="text-decoration: none;
                    position: absolute;
                    left: -20px;
                    top: 10px;
                    cursor: pointer;"
            >
                <v-icon large class="third--text pl-10"
                    >mdi-arrow-left-bold</v-icon
                >
            </div>
            <header class="third--text text-h4 mb-8">Cadastrar</header>
            <v-form ref="form" class="text-left">
                <v-stepper v-model="step" flat>
                    <v-stepper-items class="secondary pa-0">
                        <v-stepper-content step="1" class="secondary pa-0">
                            <v-text-field
                                v-model="user.first_name"
                                label="Nome"
                                outlined
                                
                                class="pa-1"
                                :rules="[rules.required]"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.last_name"
                                label="Sobrenome"
                                :rules="[rules.required]"
                                outlined
                                
                                class="pa-1"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.cpf"
                                label="CPF"
                                v-mask="'###.###.###-##'"
                                :rules="[rules.required, rules.cpf]"
                                outlined
                                
                                class="pa-1"
                            ></v-text-field>
                            <v-container class="text-center">
                                <v-btn
                                    align="center"
                                    class="primary"
                                    @click="validateUserStep1"
                                >
                                    Continuar
                                </v-btn>
                            </v-container>
                        </v-stepper-content>
                        <v-stepper-content step="2" class="secondary pa-0">
                            <v-text-field
                                v-model="user.email"
                                label="E-mail"
                                class="pa-1"
                                :rules="[rules.required, rules.email]"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                v-model="user.password"
                                label="Senha"
                                class="pa-1"
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
                                class="pa-1"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show2 = !show2"
                                :type="show2 ? 'text' : 'password'"
                                outlined
                            ></v-text-field>

                            <v-container class="text-center">
                                <v-btn
                                    align="center"
                                    class="primary"
                                    @click="createUser"
                                >
                                    Continuar
                                </v-btn>
                            </v-container>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-form>
        </v-card>
    </div>
</template>


<script>
import ToastedVue from "~/components/template/Toasted.vue";

export default {
    layout: "clean",
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
            step: 1,
            user: {
                first_name: "",
                last_name: "",
                cpf: "",
                email: "",
                password: "",
                confirm_password: "",
            },
            login_loading: false,

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
            if (!this.validateUsersStep2())  return;
            this.$store.commit("setLoading", {
                loading: true,
            });
            await this.$axios
                .$post(`signup/`, {
                    user: this.user,
                })
                .then(() => {
                    this.$toasted({
                        text: "Conta criada com sucesso!",
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
                            if (this.$store.state.back_url) {
                                this.$router.push(this.$store.state.back_url);
                                this.$store.commit("SetBack_url", "/");
                            }else{
                                this.$router.push("/");
                            }
                        })
                        .catch((e) =>
                            this.$toasted({
                                text: e.response.data
                                    ? e.response.data
                                    : "Ocorreu um erro inesperado!",
                            })
                        );
                })
                .catch((e) => {
                    this.step = 1;
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    });
                });
            this.$store.commit("setLoading", {
                loading: false,
            });
        },

        validateUsersStep2() {
            let valido = true;
            if (!this.validateEmail()) valido = false;
            else if (!this.validatePassword()) valido = false;

            return valido;
        },

        validateUserStep1() {
            let valido = true;
            if (!this.validateName()) valido = false;
            else if (!this.validateCPF()) valido = false;
            if(valido)this.step=2;
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