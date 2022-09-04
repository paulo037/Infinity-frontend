<template>
    <div>
        <h2 class="primary--text ml-10 d-inline-block" align="start">
            {{ label }}
        </h2>

        <v-sheet color="secondary">
            <v-slide-group show-arrows="desktop">
                <!-- <v-slide-group-content> -->

                <v-slide-item v-for="(c, index) in category" :key="index">
                    <category :name="c.name" :img="c.image" :id="c.id" />
                </v-slide-item>
                <!-- </v-slide-group-content> -->
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script>
import Category from "./Category.vue";
export default {
    components: {
        Category,
    },

    data() {
        return {
            category: [],
        };
    },
    async fetch() {
        this.category = await this.$axios.$get(`category/`).catch((e) =>
            this.$store.commit("toasted", {
                text: e.response.data ? e.response.data : e,
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