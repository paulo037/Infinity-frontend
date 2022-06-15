<template>
  <v-app-bar height="60px" app class="secondary" elevation="1">
    <v-toolbar-title>
      <v-card to="/" class="secondary pl-4" flat align="center">
        <span class="font-weight-light primary--text">Infinity</span>
        <span class="primary--text"> Modas</span>
      </v-card>
    </v-toolbar-title>

    <v-spacer></v-spacer>
  
    <v-text-field
      v-model="term"
      placeholder="Pesquisar" 
      class="mt-6 primary--text"
      dense
      outlined
      @keydown="enter"
      
      v-if="!hide"
    >
    <template v-slot:append>
         <v-icon @click="search">
            mdi-magnify
        </v-icon>
    </template>
    
    </v-text-field>
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

    async fetch() {
        //  this.items = await this.$axios.$get(`/search/`);
      },

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
    async search(){
        if (this.term){
            await this.$router.push({path: '/search', query: { term: this.term }});
            
        }
    },

    enter(keydown){
        if (keydown.key === 'Enter'){
           this.search();
        }
    }

  },
  computed: {
    ...mapState({
      isMenuOpen: (state) => state.isMenuOpen,
    }),
  },

  watch:{
   
      term(){
        if(this.term){
            this.text = this.term;
        }else{
            this.term = this.text;
        }
      },
       select(){
          console.log(this.term, this.select)
      }
  }
   
 
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