 <template>
    <v-app>
        <v-container fluid class="d-flex justify-space-between ma-0 pa-0 secondary">
            <NuxtLink to="/" style="text-decoration: none">
                <v-icon large class="primary--text pl-10">mdi-arrow-left-bold</v-icon>
            </NuxtLink>
            <v-switch
                v-model="switch1"
                class="
                    mt-0
                    pr-5
                    primary--text
                    secondary
                    text-right
                    d-inline-block
                "
                width="100%"
                color="primary"
                input-value="true"
                hide-details
                :label="$vuetify.theme.dark ? 'Escuro' : 'Claro'"
                @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            ></v-switch>
        </v-container>
        <toasted-vue
            :snackbar="$store.state.snackbar"
            :text="$store.state.text"
            :color="$store.state.color"
        ></toasted-vue>

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

        <v-main class="secondary pa-5 d-flex">
            <Nuxt class="pa-0"> </Nuxt>
        </v-main>

        <Footer />
    </v-app>
</template>



 <script>
import ToastedVue from "~/components/template/Toasted.vue";
import Navbar from "@/components/template/Navbar.vue";
import Sidbar from "@/components/template/Sidebar.vue";
import Footer from "@/components/template/Footer.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Sidbar,
        Footer,
        ToastedVue,
    },
    data() {
        return {
            switch1: true,
            preference_loading: true,
        };
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
