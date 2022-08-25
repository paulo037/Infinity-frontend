 <template>
  <v-footer  padless class="pt-15 secondary">
    <v-card class=" secondary primary--text text-center" tile>
      <v-card-text>
        <v-divider class="pb-5"></v-divider>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 third--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="third--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text>

      <v-card-text class="third--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
 
 <script>
export default {
  data: () => ({
    icons: ["mdi-whatsapp", "mdi-instagram"],
  }),
};
</script>
 
 <style>
</style>