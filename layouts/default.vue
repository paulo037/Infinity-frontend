 <template>
    <v-app>
        <Navbar :hide="false" />

        <Sidbar :hide="false" />
        <v-container fluid class="text-right ma-0 pa-0 secondary">
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
                :label="$vuetify.theme.dark ? 'Dark' : 'Light'"
                @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            ></v-switch>
        </v-container>
        <toasted-vue
            :snackbar="$store.state.snackbar"
            :text="$store.state.text"
            :color="$store.state.color"
        ></toasted-vue>

        <v-main class="secondary pa-2 d-flex">
            <Nuxt class="pa-0"> </Nuxt>
        </v-main>

        <Footer/>
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
        };
    },
};
</script>


<style>
</style>
