<template>
  <v-app-bar height="60px" app class="secondary ">
    <v-toolbar-title>
      <v-card to="/"  class="secondary pl-4" flat align="center">
        <span class="font-weight-light primary--text">Infinity</span>
        <span class="primary--text"> Modas</span>
      </v-card>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-text-field
      append-icon="mdi-magnify"
      placeholder="Pesquisar"
      class="mt-6 primary--text"
      rounded
      dense
      outlined
      filled
     
      v-if="!hide"
    ></v-text-field>
    <v-spacer></v-spacer>

    <v-toolbar-items v-if="!hide">
   
      
  


      <NuxtLink
        v-for="(btn, index) in btns"
        :key="index"
        class="text-decoration-none"
        :to="btn.link"
      >
        <v-btn text class="primary--text hidden-sm-and-down py-8">
          <v-icon> {{ btn.icon }} </v-icon>
          <span v-bind:style="{ marginLeft: '5px' }">{{ btn.text }}</span>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      btns: [
        {
          icon: "mdi-cart",
          text: "",
          link: "/cart",
        },
        {
          icon: "mdi-home",
          text: "HOME",
          link: "/",
        },
        {
          icon: "mdi-account",
          text: "LOGIN | CADASTRO",
          link: "/login",
        },
      ],
    };
  },
  props: {
    hide: Boolean,
  },
  methods: {
    changeMenuVisible() {
      this.$store.commit("changeMenu");
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
.v-toolbar__content {
  padding: 0px !important;
}
</style>