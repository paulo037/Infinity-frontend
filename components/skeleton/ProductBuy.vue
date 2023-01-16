<template>
    <v-card  style="max-width: 1600px; height: auto" class="pa-1">
    <v-row justify="center" class="pb-16">
            <v-col cols="10" md="5">
                <div style="max-width: 800px">
                    <v-card width="500" height="400" outlined class="pa-1">
                        <v-skeleton-loader id="image_product" type="image">
                        </v-skeleton-loader>
                    </v-card>
                </div>

                <v-card
                    outlined
                    class="d-none d-md-block mt-10"
                    max-width="500px"
                >
                    <v-card-title class="flex justify-center">
                        Descrição</v-card-title
                    >

                    <v-card-text style="text-align: initial">
                        <v-skeleton-loader
                            type="article, article, article"
                        ></v-skeleton-loader>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="10" md="5">
                <v-card
                    class="third--text pt-3 px-12 pb-12"
                    outlined
                    max-width="800px"
                >
                    <v-skeleton-loader
                        type=" heading,  list-item-three-line,  list-item-three-line"
                    ></v-skeleton-loader>

                    <div class="">
                        Quantidade:
                        <v-skeleton-loader
                            class="d-inline-bock"
                            type="list-item"
                        ></v-skeleton-loader>
                    </div>
                    <div class="">
                        cor:<v-skeleton-loader
                            class="d-inline-bock"
                            type="list-item"
                        ></v-skeleton-loader>
                    </div>

                    <v-container class="px-0 py-1">
                        <div>
                            Tamanho:
                            <v-skeleton-loader
                                class="d-inline-bock"
                                type="list-item"
                            ></v-skeleton-loader>
                        </div>
                    </v-container>
                    <div style="max-width: 300px">
                        <v-btn
                            block
                            style=""
                            class="
                                accent
                                white--text
                                font-weight-bold
                                pa-5
                                my-1
                            "
                            disabled
                            >Comprar agora
                        </v-btn>

                        <v-btn
                            class="pa-5 my-1 white--text"
                            color="rgba(239,108,0,0.85)"
                            append
                            block
                            disabled
                        >
                            <span
                                class="font-weight-bold"
                                style="text-align: start"
                                >Adicionar<br />
                                ao carrinho</span
                            >
                            <v-divider vertical class="white mx-2"></v-divider>
                            <v-icon class="text--end"> mdi-cart-plus </v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="10" md="5" class="d-md-none d-block">
                <v-card outlined class="mt-10" max-width="500px">
                    <v-card-title class="flex justify-center">
                        Descrição</v-card-title
                    >
                    <v-card-text style="text-align: initial">
                        <v-skeleton-loader
                            type="article, article, article"
                        ></v-skeleton-loader>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {};
</script>

<style>
.v-skeleton-loader__list-item {
    width: 80px;
}

#image_product .v-skeleton-loader__image {
    width: 500px;
    height: 390px;
}
</style>