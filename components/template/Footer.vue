 <template>
    <v-footer padless class="pt-15 secondary">
        <v-card class="secondary primary--text text-center" tile style="width: 100%;">
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