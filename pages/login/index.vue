<template>
    <div align="center">
        <v-card max-width="500px" class="secondary mb-8 pa-8" elevation="20">
            <header class="third--text text-h4 mb-8">LOGIN</header>

            <v-form ref="form" lazy-validation class="text-left">
                <v-text-field
                    label="E-mail"
                    name="email"
                    type="email"
                    v-model="user.email"
                    required
                    outlined
                ></v-text-field>

                <v-text-field
                    label="Senha"
                    name="password"
                    v-model="user.password"
                    required
                    outlined
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show_password = !show_password"
                    :type="show_password ? 'text' : 'password'"
                ></v-text-field>

                <span> Não têm conta ? </span>

                <router-link class="primary--text text-left" to="/signup">
                    Cadastrar-se
                </router-link>

                <v-container width="100%" class="my-8 text-center">
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
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            show_password: null,
        };
    },

    methods: {
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