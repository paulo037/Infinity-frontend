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
      @click="quantity == max ? snackbar = true : $emit('increment')"
    >
      mdi-plus
    </v-icon>

    <v-snackbar
      v-model="snackbar"
      color="secondary primary--text"
      class="pa-10"
      :timeout="timeout"
      bottom
    >
      <span class="d-flex align-center justify-center">
        Quantidade máxima já selecionada.
      </span>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      timeout: 2000,
      snackbar: false,
    };
  },
  props: {
    quantity: Number,
    max: Number,
  },

  methods: {
    decrement() {
      this.quantity--;
    },
    increment() {
      if (this.quantity == this.max) {
        this.snackbar = true;
        console.log("true");
        return;
      }
      this.quantity++;
    },
  },
};
</script>

<style>
</style>