 <template>
    <v-app>
        <TemplateNavbar :hide="false" />

        <TemplateSidebar :hide="false" />

        <v-switch
            v-model="$vuetify.theme.dark"
            style="position: absolute; right: 0px; top: 65px"
            class="mt-0 pr-5 primary--text secondary text-right d-inline-block"
            width="100%"
            color="primary"
            hide-details
            @click="toggleDarkMode"
            :label="$vuetify.theme.dark ? 'Escuro' : 'Claro'"
        ></v-switch>
        <Toasted
            :snackbar="$store.state.snackbar"
            :text="$store.state.text"
            :color="$store.state.color"
        ></Toasted>

        <v-dialog
            v-model="$store.state.loading"
            persistent
            class="d-flex align-center justify-center"
        >
            <v-progress-circular
                indeterminate
                :color="$store.state.loading_color"
                :size="60"
                style="position: fixed; top: 98px; z-index: 50"
            ></v-progress-circular>
        </v-dialog>

        <v-main class="secondary pt-10 d-flex">
            <Nuxt class="pa-0"> </Nuxt>
        </v-main>
        <TemplateFooter style="width: 100%;"/>
    </v-app>
</template>


<script>

export default {
    name: "App",


    data() {
        return {
            switch1: true,
            preference_loading: true,
        };
    },

    methods: {
        async toggleDarkMode() {
            this.$cookies.set("darkTheme", this.$vuetify.theme.dark, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        },
    },

    async beforeCreate() {
        const isDark = await this.$cookies.get("darkTheme");
        this.$vuetify.theme.dark = (await isDark) === undefined ? true : isDark;
    },
};
</script>


<style>
.nuxt-progress {
    color: blue !important;
}

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
