<template>
  <div align="center">
    <v-card max-width="900px" class="secondary mx-8 mb-16" elevation="20">
      <v-card class="primary--text secondary py-2" elevation="8">
        <span class="text-h5"> CARRINHO | </span>
        <v-icon class="primary--text pb-3">mdi-cart</v-icon>
      </v-card>
      <v-divider class="third"></v-divider>

      <v-simple-table class="secondary third--text mb-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left third--text px-8">PRODUTOS</th>

              <th class="text-left third--text hidden-xs-only pa-0">
                QUANTIDADE
              </th>
              <th class="text-left third--text text-center hidden-xs-only">
                PREÇO
              </th>
              <th class="pa-0"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="item.name">
              <!-- Para Celular -->
              <td class="hidden-sm-and-up pa-0">
                <v-card class="d-flex align-start pa-0 ma-2">
                  <v-container class="d-flex align-start">
                    <router-link to="/buy">
                      <v-img
                        class="d-inline-block"
                        :src="item.img"
                        max-width="80px"
                        height="80px"
                      ></v-img>
                    </router-link>
                    <div class="text ml-5">
                      <span>
                        {{ item.name }}
                      </span>

                      <span class="primary--text">
                        <br />
                        R$:
                        {{
                          (item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")
                        }}
                      </span>

                      <div>
                        <v-icon
                          color="sencondary"
                          class="accent rounded-circle"
                          :disabled="item.quantity == 1 ? true : false"
                          @click="decrement(index)"
                          small
                        >
                          mdi-minus
                        </v-icon>

                        <span
                          class="font-weight-light pa-2"
                          v-text="item.quantity"
                        ></span>
                        <v-icon
                          color="sencondary"
                          class="accent rounded-circle"
                          small
                          @click="increment(index)"
                          link
                        >
                          mdi-plus
                        </v-icon>
                      </div>
                      <span class="primary--text">GG</span>
                    </div>
                  </v-container>

                  <v-icon
                    block
                    small
                    class="red rounded-circle ma-2"
                    @click="deleteProduct(index)"
                  >
                    mdi-close
                  </v-icon>
                </v-card>
              </td>
              <!-- Para Computadores -->
              <td class="hidden-xs-only">
                <v-card
                  class="d-flex align-top py-5 ma-2 secondary"
                  width="260px"
                  elevation="5"
                  to="/buy"
                >
                  <v-img
                    class="d-inline-block mx-5"
                    :src="item.img"
                    max-width="80px"
                    height="80px"
                  ></v-img>
                  <div>
                    <span>
                      {{ item.name }}
                    </span>

                    <span class="primary--text">
                      <br />
                      <br />
                      GG
                    </span>
                  </div>
                </v-card>
              </td>

              <td class="hidden-xs-only pa-0">
                <v-icon
                  color="sencondary"
                  class="accent rounded-circle"
                  :disabled="item.quantity == 1 ? true : false"
                  @click="decrement(index)"
                >
                  mdi-minus
                </v-icon>

                <span
                  class="font-weight-light pa-2"
                  v-text="item.quantity"
                ></span>
                <v-icon
                  color="sencondary"
                  class="accent rounded-circle"
                  @click="increment(index)"
                >
                  mdi-plus
                </v-icon>
              </td>
              <td
                class="hidden-xs-only primary--text text-subtitle-1 text-center"
              >
                R$:
                {{ (item.price * item.quantity).toFixed(2).replace(".", ",") }}
              </td>
              <td class="pa-0 hidden-xs-only">
                <v-container
                  style="height: 100%; padding: 0px"
                  class="text-right pa-1"
                >
                  <v-icon
                    small
                    class="red rounded-circle ma-2"
                    @click="deleteProduct(index)"
                  >
                    mdi-close
                  </v-icon>
                </v-container>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-divider class="third"></v-divider>

      <v-container class="py-16">
        <v-layout row wrap align-top justify-center>
          <v-flex md8>
            <span class="third--text text-h5 mb-8 ml-5 text-center">TOTAL</span>
          </v-flex>

          <v-flex md4>
            <span class="primary--text text-h5 text-right">
              R$:

              {{ calculateAmount.toFixed(2).replace(".", ",") }}
            </span>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider class="third"></v-divider>
      <v-container class="text-center text-h5 primary--text pa-8">
        <v-btn class="primary secondary--text" width="60%" height="50px"
          >COMPRAR
        </v-btn>
      </v-container>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="timeout" class="ma-8">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="accent" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
    scrollToTop: true,
  data() {
    return {
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,
      products: [
        {
          name: "Lollipop",
          price: 392,
          quantity: 1,
          img: "https://img.elo7.com.br/product/zoom/2154614/camiseta-vikings-masculina-ragnar-camisa-blusa-frases.jpg",
        },
        {
          name: "Honeycomb",
          price: 408,
          quantity: 1,
          img: "https://img.ltwebstatic.com/images3_pi/2021/10/20/163469596627a68c90e7d65a7c12daf5d145ef97ad_thumbnail_600x.webp",
        },
        {
          name: "Donut",
          price: 452,
          quantity: 1,
          img: "https://img.ltwebstatic.com/images3_pi/2022/03/22/1647913483064da6464276fe205040d5ae2b8d4efa_thumbnail_405x552.webp",
        },
        {
          name: "KitKat",
          price: 518,
          quantity: 1,
          img: "https://img.ltwebstatic.com/images3_pi/2022/02/25/1645778033bcddf6b1aa20f426ee3dc45337ded9b5_thumbnail_405x552.webp",
        },
      ],
    };
  },
  methods: {
    decrement(index) {
      this.products[index].quantity--;
    },
    increment(index) {
      this.products[index].quantity++;
    },
    changeActive(index) {
      this.active = index;
    },
    deleteProduct(index) {
      console.log(index);
      const name = this.products[index].name;
      this.products.splice(index, 1);
      this.text = `O produto ${name} foi removido`;
      this.snackbar = true;
    },
  },

  computed: {
    calculateAmount() {
      let amout = 0;
      this.products.map(
        (product) => (amout += product.price * product.quantity)
      );
      console.log(amout);
      return amout;
    },
  },
};
</script>

<style >
tr:hover {
  background-color: transparent !important;
}
</style>