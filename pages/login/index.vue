<template>
    <div align="center">
        <v-dialog v-model="login_loading" style="">
            <v-progress-circular
                indeterminate
                color="accent"
                v-if="login_loading"
                :size="60"
            ></v-progress-circular>
        </v-dialog>

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
                        height="40px"
                        class="primary px-10"
                        @click="login"
                        :disabled="login_loading"
                    >
                        CONTINUAR
                    </v-btn>
                </v-container>
            </v-form>
        </v-card>

        <div id="my-signin2"></div>
    </div>
</template>


<script>
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            show_password: null,
            login_loading: false,
        };
    },

    methods: {
        async login() {
            this.login_loading = true;
            this.$auth
                .loginWith("cookie", {
                    data: {
                        email: this.user.email,
                        password: this.user.password,
                    },
                })
                .then((response) => {
                    console.log(response)
                    this.login_loading = false;

                    this.toasted({
                        text: "Login realizado com sucesso!",
                        color: "success",
                    });
                    if (this.$store.state.back_url) {
                        this.$router.push(this.$store.state.back_url);
                        this.$store.commit("SetBack_url", null);
                    }
                })
                .catch((e) => {
                    this.login_loading = false;
                    e.data
                        ? this.toasted({ text: e.response.data })
                        : this.toasted({ text: e });
                });
        },

        ...mapMutations(["toasted"]),
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