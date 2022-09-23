<template>
    <div align="center">
        <v-card style="max-width: 800px" class="my-5" outlined>
            <v-row align="start">
                <v-col class="d-flex justify-start pa-5">
                    <v-icon class="mdi-48px third--text">
                        mdi-account-circle
                    </v-icon>
                    <v-card-title
                        class="font-weight-bold text-h5 d-flex justify-start"
                    >
                        {{ $auth.user.first_name }} {{ $auth.user.last_name }}
                    </v-card-title>
                </v-col>
            </v-row>
        </v-card>

        <v-card style="max-width: 800px" outlined class="px-5">
            <nuxt-link style="text-decoration: none" to="profile/settings">
                <v-row>
                    <v-col class="d-flex justify-start">
                        <v-icon class="third--text" large> mdi-account </v-icon>
                        <v-card-title class="third--text"
                            >Seus Dados</v-card-title
                        >
                    </v-col>

                    <v-col
                        style="align-self: center"
                        class="d-flex justify-end"
                        cols="1"
                        ><v-icon>mdi-arrow-right</v-icon></v-col
                    >
                </v-row>
            </nuxt-link>

            <v-divider></v-divider>

            <nuxt-link style="text-decoration: none" to="profile/order">
                <v-row>
                    <v-col class="d-flex justify-start">
                        <v-icon class="third--text" large>
                            mdi-package-variant-closed
                        </v-icon>
                        <v-card-title class="third--text"
                            >Seus Pedidos</v-card-title
                        >
                    </v-col>

                    <v-col
                        style="align-self: center"
                        class="d-flex justify-end"
                        cols="1"
                        ><v-icon>mdi-arrow-right</v-icon></v-col
                    >
                </v-row>
            </nuxt-link>

            <v-divider></v-divider>
            <nuxt-link style="text-decoration: none" to="/profile/address">
                <v-row>
                    <v-col class="d-flex justify-start">
                        <v-icon class="third--text" large>
                            mdi-google-maps
                        </v-icon>
                        <v-card-title class="third--text"
                            >Endereços</v-card-title
                        >
                    </v-col>

                    <v-col
                        style="align-self: center"
                        class="d-flex justify-end"
                        cols="1"
                        ><v-icon>mdi-arrow-right</v-icon></v-col
                    >
                </v-row>
            </nuxt-link>

            <v-divider></v-divider>

            <nuxt-link style="text-decoration: none" to="/profile/security">
                <v-row>
                    <v-col class="d-flex justify-start">
                        <v-icon class="third--text" large> mdi-lock </v-icon>
                        <v-card-title class="third--text"
                            >Segurança</v-card-title
                        >
                    </v-col>

                    <v-col
                        style="align-self: center"
                        class="d-flex justify-end"
                        cols="1"
                        ><v-icon>mdi-arrow-right</v-icon></v-col
                    >
                </v-row>
            </nuxt-link>
            <v-divider></v-divider>

            <v-row @click="logout" style="cursor: pointer">
                <v-col class="d-flex justify-start">
                    <v-icon class="third--text" large> mdi-logout </v-icon>
                    <v-card-title class="third--text">Sair</v-card-title>
                </v-col>

                <v-col
                    style="align-self: center"
                    class="d-flex justify-end"
                    cols="1"
                    ><v-icon>mdi-arrow-right</v-icon></v-col
                >
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            user: { first_name: "Paulo", last_name: "Henrique" },
        };
    },

    methods: {
        logout() {
            this.toasted({
                text: "Logout realizado com sucesso!",
                color: "success",
            });

            this.$auth.logout();
        },

        ...mapMutations(["toasted"]),
    },
};
</script>

<style>
</style>