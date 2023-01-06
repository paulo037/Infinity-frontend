<template>
    <div align="center">
        <v-card max-width="400px" class="secondary mb-8 pa-8" elevation="5">
            <header class="third--text text-h4 mb-8">Redefinir Senha</header>
            <v-form ref="form" lazy-validation class="text-left">
                <v-text-field
                    label="Senha"
                    name="password"
                    v-model="user.password"
                    class="text-body-2"
                    :rules="[rules.required, rules.counter]"
                    required
                    outlined
                    autofocus
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show_password = !show_password"
                    :type="show_password ? 'text' : 'password'"
                    @keydown.enter="$refs.confirm_password.$el.click()"
                ></v-text-field>

                <v-text-field
                    label="Confirmação da senha"
                    name="password"
                    v-model="user.confirm_password"
                    class="text-body-2"
                    :rules="[rules.required, rules.counter]"
                    required
                    outlined
                    :append-icon="
                        show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                        show_confirm_password = !show_confirm_password
                    "
                    :type="show_confirm_password ? 'text' : 'password'"
                    ref="confirm_password"
                    @keydown.enter="$refs.recovery.$el.click()"
                ></v-text-field>

                <v-container width="100%" class="my-5 text-center">
                    <v-btn
                        align="center"
                        class="primary px-10"
                        @click="passwordUpdate"
                        :disabled="$store.state.loading"
                        ref="recovery"
                    >
                        Redefinir
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
    middleware: ["recovery"],
    data() {
        return {
            user: {
                password: "",
                confirm_password: "",
            },
            show_password: null,
            show_confirm_password: null,
            rules: {
                required: (value) => !!value || "Campo obrigatório.",
                counter: (value) =>
                    value.length >= 8 || "mínimo 8 caracteres  ",
            },
        };
    },

    methods: {
        async passwordUpdate() {
            const id = this.$route.params.id;

            await this.$axios
                .$post(`/password/${id}`, {
                    user: this.user,
                })
                .then((response) => {
                    this.$toasted({
                        text: "Senha alterada com sucesso!",
                        color: "success",
                    });
                    this.$router.push("/login");
                })
                .catch((e) => {
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    });
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