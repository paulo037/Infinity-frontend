<template>
    <v-app-bar height="60px" class="nav_background text--accent" elevation="1">
        <v-toolbar-title>
            <v-card to="/" class="nav_background pl-4" flat align="center">
                <span class="font-weight-light primary--text">Infinity</span>
                <span class="primary--text"> Modas</span>
            </v-card>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="term"
            placeholder="Buscar Produtos"
            class="mt-6 primary--text"
            dense
            outlined
            @keydown="enter"
            v-if="!hide"
        >
            <template v-slot:append>
                <v-icon @click="search"> mdi-magnify </v-icon>
            </template>
        </v-text-field>
        <v-spacer></v-spacer>

        <v-toolbar-items v-if="!hide">
            <NuxtLink class="text-decoration-none" to="/cart">
                <v-btn text class="primary--text hidden-sm-and-down py-8">
                    <v-icon> mdi-cart </v-icon>
                    <span v-bind:style="{ marginLeft: '5px' }"></span>

                    <span
                        class="blue white--text rounded-circle"
                        style="
                            position: absolute;
                            left: 18px;
                            top: -12px;
                            padding: 3px 1px;
                            font-size: x-small;
                        "
                        v-if="
                            $store.state.numberOfProductsInCart > 9 &&
                            $store.state.numberOfProductsInCart < 100
                        "
                    >
                        {{ $store.state.numberOfProductsInCart }}
                    </span>

                    <span
                        class="blue white--text rounded-circle"
                        style="
                            position: absolute;
                            right: -2px;
                            top: -7px;
                            font-size: small;
                            width: 15px;
                            height: 15px;
                        "
                        v-else-if="$store.state.numberOfProductsInCart < 9"
                        >{{ $store.state.numberOfProductsInCart }}</span
                    >
                </v-btn>
            </NuxtLink>

            <NuxtLink
                class="text-decoration-none"
                to="/login"
                v-if="$auth.loggedIn"
            >
                <v-btn
                    text
                    class="primary--text hidden-sm-and-down py-8"
                    @click="logout"
                >
                    <v-icon> mdi-logout </v-icon>
                    <span v-bind:style="{ marginLeft: '5px' }">Sair</span>
                </v-btn>
            </NuxtLink>

            <NuxtLink class="text-decoration-none" to="/login" v-else>
                <v-btn text class="primary--text hidden-sm-and-down py-8">
                    <v-icon> mdi-account </v-icon>
                    <span v-bind:style="{ marginLeft: '5px' }"
                        >Entrar | CADASTRO</span
                    >
                </v-btn>
            </NuxtLink>

            <NuxtLink
                class="text-decoration-none"
                to="/admin"
                v-if="$auth.user ? $auth.user.ad : false"
                >
                <v-btn text class="primary--text hidden-sm-and-down py-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M13.82 22h-3.64a1 1 0 0 1-.977-.786l-.407-1.884a8.002 8.002 0 0 1-1.535-.887l-1.837.585a1 1 0 0 1-1.17-.453L2.43 15.424a1.006 1.006 0 0 1 .193-1.239l1.425-1.3a8.1 8.1 0 0 1 0-1.772L2.623 9.816a1.006 1.006 0 0 1-.193-1.24l1.82-3.153a1 1 0 0 1 1.17-.453l1.837.585c.244-.18.498-.348.76-.5c.253-.142.513-.271.779-.386l.408-1.882A1 1 0 0 1 10.18 2h3.64a1 1 0 0 1 .976.787l.412 1.883a8.192 8.192 0 0 1 1.535.887l1.838-.585a1 1 0 0 1 1.169.453l1.82 3.153c.232.407.152.922-.193 1.239l-1.425 1.3a8.1 8.1 0 0 1 0 1.772l1.425 1.3c.345.318.425.832.193 1.239l-1.82 3.153a1 1 0 0 1-1.17.453l-1.837-.585a7.98 7.98 0 0 1-1.534.886l-.413 1.879a1 1 0 0 1-.976.786ZM11.996 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z"
                        />
                    </svg>
                    <span v-bind:style="{ marginLeft: '5px' }"></span>
                </v-btn>
            </NuxtLink>

            <span>
                <v-app-bar-nav-icon
                    text
                    class="primary--text hidden-md-and-up"
                    @click="changeMenuVisible"
                >
                </v-app-bar-nav-icon>
            </span>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    async fetch() {
        if (this.$auth.loggedIn) {
            let response = await this.$axios.$get("cart/products-number");
            this.$store.commit("setNumberOfProductsInCart", response.number);
        }
    },

    data() {
        return {
            loading: false,
            items: [],
            term: null,
            select: null,
            text: null,
        };
    },
    props: {
        hide: Boolean,
    },
    methods: {
        changeMenuVisible() {
            this.$store.commit("changeMenu");
        },
        logout() {
            this.toasted({
                text: "Logout realizado com sucesso!",
                color: "success",
            });

            this.$auth.logout();
        },
        async search() {
            if (this.term) {
                await this.$router.push({
                    path: "/search",
                    query: { term: this.term },
                });
            }
        },

        enter(keydown) {
            if (keydown.key === "Enter") {
                this.search();
            }
        },

        ...mapMutations(["toasted"]),
    },
    computed: {
        ...mapState({
            isMenuOpen: (state) => state.isMenuOpen,
        }),
    },

    watch: {
        term() {
            if (this.term) {
                this.text = this.term;
            } else {
                this.term = this.text;
            }
        },

        async "$auth.loggedIn"() {
            if (this.$auth.loggedIn) {
                let response = await this.$axios.$get("cart/products-number");
                this.$store.commit(
                    "setNumberOfProductsInCart",
                    response.number
                );
            } else {
                this.$store.commit("setNumberOfProductsInCart", 0);
            }
        },
    },
};
</script>

<style>
.v-toolbar__content {
    padding: 0px !important;
}
.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: rotate(0deg);
}
</style>