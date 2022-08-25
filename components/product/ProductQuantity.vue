<template>
  <v-container>
    <div class="pa-2">Quantidade:</div>
    <v-icon
      color="sencondary"
      class="accent rounded-circle"
      :disabled="quantity == 1 ? true : false"
      @click="$emit('decrement')"
    >
      mdi-minus
    </v-icon>

    <span class="font-weight-light ma-5" v-text="quantity"> </span>
    <v-icon
      color="sencondary"
      class="accent rounded-circle"
      @click="quantity == max ? toasted(payload) : $emit('increment')"
    >
      mdi-plus
    </v-icon>

  </v-container>
</template>

<script>

import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      payload: {text: "Quantidade máxima já selecionada."}
    };
  },
  methods:{
    ...mapMutations(["toasted"]),
  },
  props: {
    quantity: Number,
    max: Number,
  },

};
</script>

<style>
</style>