<template>
    <v-navigation-drawer
        fixed
        :value.sync="isMenuOpen"
        right
        class="nav_background hidden-md-and-up"
    >
        <v-list v-if="!hide">
            <v-list-item class="text-end primary--text">
                <v-list-item-content>
                    <div text @click="changeMenuVisible">
                        <v-icon class="primary--text"> mdi-close </v-icon>
                    </div>
                </v-list-item-content>
            </v-list-item>

            <v-list-item class="pa-0">
                <v-list-item-content class="pa-0">
                    <MdiLinkVue
                        :icon="'mdi-cart'"
                        :link="'/cart'"
                        :text="'CARRINHO'"
                    >
                        <template v-slot:cart>
                            <div>
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
                                        $store.state.numberOfProductsInCart >
                                            9 &&
                                        $store.state.numberOfProductsInCart <
                                            100
                                    "
                                >
                                    {{ $store.state.numberOfProductsInCart }}
                                </span>

                                <span
                                    class="blue white--text rounded-circle"
                                    style="
                                        position: absolute;
                                        left: 18px;
                                        top: -7px;
                                        font-size: small;
                                        width: 15px;
                                        height: 15px;
                                    "
                                    v-else-if="
                                        $store.state.numberOfProductsInCart < 9
                                    "
                                    >{{
                                        $store.state.numberOfProductsInCart
                                    }}</span
                                >
                            </div>
                        </template>
                    </MdiLinkVue>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="$auth.loggedIn" class="pa-0">
                <v-list-item-content class="pa-0">
                    <MdiLinkVue
                        @click="logout"
                        :icon="'mdi-logout'"
                        :link="'/login'"
                        :text="'LOGOUT'"
                    ></MdiLinkVue>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-else class="pa-0">
                <v-list-item-content>
                    <MdiLinkVue
                        :icon="'mdi-account'"
                        :link="'/login'"
                        :text="'LOGIN | CADASTRO'"
                    ></MdiLinkVue>
                </v-list-item-content>
            </v-list-item>
            <client-only>
                <v-list-item
                    v-if="$auth.user ? $auth.user.ad : false"
                    class="pa-0"
                >
                    <v-list-item-content class="pa-0">
                        <NuxtLink to="/admin" class="text-decoration-none pa-0">
                            <v-btn
                                text
                                class="primary--text text-start py-8"
                                block
                            >
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
                                <v-list-item-title color="primary" class="ml-5"
                                    >Admin</v-list-item-title
                                >
                            </v-btn>
                        </NuxtLink>
                    </v-list-item-content>
                </v-list-item>
            </client-only>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MdiLinkVue from "./MdiLink.vue";

export default {
    components: {
        MdiLinkVue,
    },
    props: {
        hide: Boolean,
    },
    methods: {
        changeMenuVisible() {
            this.$store.commit("changeMenu");
        },
        ...mapMutations(["toasted"]),

        logout() {
            this.toasted({
                text: "Logout realizado com sucesso!",
                color: "success",
            });
            this.$auth.logout();
        },
    },

    computed: {
        ...mapState({
            isMenuOpen: (state) => state.isMenuOpen,
        }),
    },
};
</script>

<style>
</style>