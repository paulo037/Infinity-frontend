 <template>
  <v-app>
    <Navbar :hide="true" />
    <Sidbar :hide="true" />
     <v-container fluid class=" pa-0  ma-0 text-right secondary">
      <v-switch
        v-model="switch1"
        class="pt-12 pb-0  mb-0 pr-5 primary--text secondary text-right d-inline-block"
        width="100%"
        color="primary"
        input-value="true"
        hide-details
        :label="$vuetify.theme.dark ? 'Dark' : 'Light'"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      ></v-switch>
    </v-container>

    <v-main class="secondary">
     <Nuxt/>
    </v-main>

    <Footer />
  </v-app>
</template>



 <script>
import Navbar from "@/components/template/Navbar.vue";
import Sidbar from "@/components/template/Sidebar.vue";
import Footer from "@/components/template/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Sidbar,
    Footer,
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
