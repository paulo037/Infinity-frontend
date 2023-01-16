<template>
    <div>
        <h2 class="primary--text ml-10 d-inline-block" align="start">
            {{ label }}
        </h2>

        <v-sheet color="secondary">
            <v-slide-group
                show-arrows="desktop"
                center-active
                v-if="!$fetchState.pending"
            >
                <v-slide-item
                    v-for="(c, index) in category"
                    :key="index"
                >
                    <div>
                        <CardCategory
                            v-if="noShow.indexOf(c.name) == -1"
                            :name="c.name"
                            :img="c.image"
                            :id="c.id"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>

            <v-slide-group show-arrows="desktop" v-if="$fetchState.pending">
                <v-slide-item v-for="n in 10" :key="n">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                            <v-card
                                tag="span"
                                class="d-inline-block my-5 mx-2 pa-3"
                                height="450px"
                                outlined
                                :elevation="hover ? 2 : 0"
                            >
                                <v-skeleton-loader
                                    width="260px"
                                    type=" image, list-item-three-line, list-item"
                                ></v-skeleton-loader>
                            </v-card>
                        </template>
                    </v-hover>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: [],
            noShow: ["Lançamentos", "Produtos Mais Vendidos"],
        };
    },
    async fetch() {
        this.category = await this.$axios.$get(`category/`).catch((e) =>
            this.$toasted({
                text: e.response.data
                    ? e.response.data
                    : "Ocorreu um erro inesperado!",
            })
        );
    },
    props: {
        label: String,
    },
};
</script>

<style>
.v-slide-group__content {
    display: flex;
    justify-content: center !important;
}
</style>