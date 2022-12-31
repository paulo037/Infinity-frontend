<template>
    <div align="center">
        <div align="left" style="max-width: 1000px">
            <v-icon @click="$router.push('/profile')" x-large
                >mdi-arrow-left-bold</v-icon
            >
        </div>

        <h1 class="text-left pb-5 ma-0" style="max-width: 800px">Segurança</h1>
        <v-card
            style="max-width: 600px"
            outlined
            class="pa-5 px-10 d-flex justify-center"
        >
            <v-row class="justify-center" style="max-width: 500px">
                <v-col cols="12">
                    <h2 class="d-block">Alterar senha</h2>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        v-model="new_password"
                        :rules="[rules.required, rules.counter]"
                        outlined
                        label="Nova senha"
                        :append-icon="
                            show_new_password ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append="show_new_password = !show_new_password"
                        :type="show_new_password ? 'text' : 'password'"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        :rules="[rules.required, rules.counter]"
                        outlined
                        label="Confirmação da nova senha"
                        v-model="confirm_new_password"
                        :append-icon="
                            show_confirm_new_password
                                ? 'mdi-eye'
                                : 'mdi-eye-off'
                        "
                        @click:append="
                            show_confirm_new_password =
                                !show_confirm_new_password
                        "
                        :type="show_confirm_new_password ? 'text' : 'password'"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="password"
                        :rules="[rules.required, rules.counter]"
                        outlined
                        label="Senha atual"
                        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show_password = !show_password"
                        :type="show_password ? 'text' : 'password'"
                    ></v-text-field>
                </v-col>

                <v-col cols="10">
                    <v-btn
                        width="200px"
                        height="50px"
                        class="accent white--text font-weight-bold"
                        @click="save"
                        >Salvar alterações</v-btn
                    >
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: "",
            new_password: "",
            confirm_new_password: "",
            show_new_password: false,
            show_confirm_new_password: false,
            show_password: false,
            rules: {
                required: (value) => !!value || "Campo obrigatório.",
                counter: (value) =>
                    value.length >= 8 || "mínimo 8 caracteres  ",
            },
        };
    },

    methods: {
        async save() {
            if (this.validatePassword()) {
                await this.$axios
                    .$put("/password", {
                        props: {
                            password: this.password,
                            new_password: this.new_password,
                            confirm_new_password: this.confirm_new_password,
                        },
                    })
                    .then(() => {
                        this.$toasted({
                            text: "Senha alterada com sucesso",
                            color: "success",
                        });
                        this.$router.push('/profile')
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

        validatePassword() {
            if (this.new_password < 8) {
                this.$toasted({
                    text: "Nova senha não tem o mínimo de 8 caracteres!",
                });
                return false;
            }

            if (this.confirm_new_password < 8) {
                this.$toasted({
                    text: "Confirmação sa nova senha não tem o mínimo de 8 caracteres!",
                });
                return false;
            }

            if (this.password < 8) {
                this.$toasted({
                    text: "Senha atual não tem o mínimo de 8 caracteres!",
                });
                return false;
            }

            if (this.confirm_new_password != this.new_password) {
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