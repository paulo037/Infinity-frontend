<template>
    <div align="center">
        <v-card max-width="400px" class="secondary mb-8 pa-8" elevation="5">
            <div
                @click="$router.go(-1)"
                style="
                    text-decoration: none;
                    position: absolute;
                    left: -20px;
                    top: 10px;
                    cursor: pointer;
                "
            >
                <v-icon large class="third--text pl-10"
                    >mdi-arrow-left-bold</v-icon
                >
            </div>
            <header class="third--text text-h4 mb-8">Entrar</header>

            <v-form ref="form" lazy-validation class="text-left">
                <v-text-field
                    label="E-mail"
                    name="email"
                    type="email"
                    v-model="user.email"
                    :rules="[rules.required, rules.email]"
                    required
                    outlined
                ></v-text-field>

                <v-text-field
                    label="Senha"
                    name="password"
                    v-model="user.password"
                    class="text-body-2"
                    :rules="[rules.required, rules.counter]"
                    required
                    outlined
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show_password = !show_password"
                    :type="show_password ? 'text' : 'password'"
                ></v-text-field>
                <div
                    class="
                        pb-5
                        text-decoration-underline
                        third--text
                        text-body-2
                    "
                    style="cursor: pointer"
                    @click="passwordRecovery"
                >
                    Esqueceu a sua senha ?
                </div>
                <div>
                    <span> Não têm conta ? </span>

                    <router-link class="third--text text-left" to="/signup">
                        Cadastrar-se
                    </router-link>
                </div>

                <v-container width="100%" class="my-5 text-center">
                    <v-btn
                        align="center"
                        class="primary px-10"
                        @click="login"
                        :disabled="$store.state.loading"
                    >
                        Continuar
                    </v-btn>
                </v-container>
            </v-form>
        </v-card>

        <div id="my-signin2"></div>
    </div>
</template>


<script>
export default {
    layout: "clean",
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            show_password: null,
            rules: {
                required: (value) => !!value || "Campo obrigatório.",
                counter: (value) =>
                    value.length >= 8 || "mínimo 8 caracteres  ",
                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "E-mail inválido";
                },
            },
        };
    },

    methods: {
        async passwordRecovery() {
            if(this.rules.required(this.user.email) !== true){
                this.$toasted({
                        text: "Preencha o campo de E-mail!",
                    });
                return;
            }

            if(this.rules.email(this.user.email) !== true){
                this.$toasted({
                        text: "E-mail inválido",
                    });
                return
            }

            await this.$axios.$post(`password`, {
                email: this.user.email,
            }).then((response) => {
                    this.$toasted({
                        text: "O link para a redefinição da sua senha foi enviado no seu E-mail!",
                        color: "success",
                    });
                })
                .catch((e) => {
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    });
                });
        },
        async login() {
            this.$store.commit("setLoading", {
                loading: true,
            });
            await this.$auth
                .loginWith("local", {
                    data: {
                        email: this.user.email,
                        password: this.user.password,
                    },
                })
                .then((response) => {
                    this.$toasted({
                        text: "Login realizado com sucesso!",
                        color: "success",
                    });

                    if (this.$store.state.back_url) {
                        const back = this.$store.state.back_url;
                        this.$store.commit("SetBack_url", "/");
                        return window.open(
                            `${process.env.BASE_FRONT}${back}`,
                            "_self"
                        );
                    }
                    return window.open(`${process.env.BASE_FRONT}`, "_self");
                })
                .catch((e) => {
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
    },
};
</script>

<style>
.v-dialog--active {
    height: 100%;
    width: 100%;
    margin: 0px;
    max-height: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>