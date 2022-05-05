<template>
  <v-navigation-drawer
    fixed
    :value.sync="isMenuOpen"
    right
    class="secondary hidden-md-and-up"
  >
    <v-list v-if="!hide">
      <v-list-item class="text-end">
        <v-list-item-content>
          <div text @click="changeMenuVisible">
            <v-icon class="primary--text"> mdi-close </v-icon>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-for="(btn, index) in btns" :key="index">
        <v-list-item-content>
          <NuxtLink :to="btn.link" class="text-decoration-none">
            <v-btn text class="primary--text text-start" block>
              <v-icon> {{ btn.icon }} </v-icon>
              <v-list-item-title color="primary" class="ml-5">{{
                btn.text
              }}</v-list-item-title>
            </v-btn>
          </NuxtLink>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      btns: [
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
        {
          icon: "mdi-cart",
          text: "CARRINHO",
          link: "/cart",
        },
      ],
    };
  },
  props:{
      hide: Boolean
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
</style>