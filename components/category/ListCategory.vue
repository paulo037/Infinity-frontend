<template>
  <v-container style="width:100%; max-width:none">
    <h2 class="primary--text ml-10">{{ label }}</h2>
    <v-sheet color="secondary">
      <v-slide-group show-arrows>
        <v-slide-item v-for="n in imgs.length" :key="n" class="">
          <category :name="names[n - 1]" :img="imgs[n - 1]" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import Category from "./Category.vue";
export default {
  components: {
    Category,
  },
 
  data() {
    return {
      imgs: [
        "https://static.netshoes.com.br/produtos/camisa-selecao-brasil-iii-1920-sn-torcedor-nike-masculina/14/HZM-0866-014/HZM-0866-014_zoom1.jpg?ts=1639673308",
        "https://m.media-amazon.com/images/I/513sJqRxICL._AC_SX679_.jpg",
        "https://images-americanas.b2w.io/produtos/2918266890/imagens/calca-jogger-camuflada-masculina-travis/2918267075_1_large.jpg",
        "https://static.zattini.com.br/produtos/blusa-broken-rules-malha-listrada-masculina/06/E60-0565-006/E60-0565-006_zoom1.jpg?ts=1602703157&ims=544x",
        "https://static.netshoes.com.br/produtos/short-masculino-forthem-moda-praia-summer/42/NBO-0252-042/NBO-0252-042_zoom1.jpg?ts=1641913400",
        "https://barbaderespeito.com.br/media/catalog/product/cache/1/image/500x500/85e4522595efc69f496374d01ef2bf13/2/1/21413001.jpg",
      ],
      names: [
        "Blusa Time",
        "Blusa Basica",
        "Calça Básica",
        "Blusa Malhada",
        "Short Praia",
        "Short Básico",
      ],
    };
  },
  props: {
    label: String,
  },
};
</script>

<style>
</style>