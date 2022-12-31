 <template>
    <v-footer padless class="pt-15 secondary">
        <v-card class="secondary primary--text text-center" tile>
            <v-card-text>
                <v-divider class="pb-5"></v-divider>
                
                <a
                    v-for="icon in icons"
                   
                    :key="icon.icon"
                    :href="icon.link"
                    target="_blank"
                    class="ma-5"
                    style="text-decoration: none;"
                >
                    <v-icon size="24px">
                        {{ icon.icon }}
                    </v-icon>
                </a>
            </v-card-text>

            <v-card-text class="third--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
                amet. Mauris cursus commodo interdum. Praesent ut risus eget
                metus luctus accumsan id ultrices nunc. Sed at orci sed massa
                consectetur dignissim a sit amet dui. Duis commodo vitae velit
                et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat
                augue vel ipsum ultrices, cursus iaculis dui sollicitudin.
                Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
            </v-card-text>

            <v-card-text class="third--text">
                {{ new Date().getFullYear() }} — <strong>Infinity Modas</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>
 
 <script>
export default {
    data: () => ({
        icons: [
            {
                icon: "mdi-whatsapp",
                link: "https://wa.me/5537998694556?text=Olá, vim pelo site, gostaria de uma ajuda!",
            },

            {
                icon: "mdi-instagram",
                link: "https://instagram.com/infinitymodasmg?igshid=YmMyMTA2M2Y=",
            },
        ],
    }),
};
</script>
 
 <style>
</style>