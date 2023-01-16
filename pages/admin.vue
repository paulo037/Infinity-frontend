<template >
    <div align="center">

        <v-dialog
            v-model="$store.state.loading"
            persistent
            class="d-flex align-center justify-center"
        >
            <v-progress-circular
                indeterminate
                :color="$store.state.loading_color"
                :size="60"
                style="position: fixed; top: 98px; z-index: 50"
            ></v-progress-circular>
        </v-dialog>

        
        <v-card class="ma-0 mt-0 pt-0" style="max-width: 1200px">
            <v-tabs v-model="tab" class="pa-5 pb-0">
                <v-tab
                    v-for="(item, index) in tabs"
                    :key="index"
                    nuxt
                    :to="item.link"
                >
                    {{ item.label }}
                </v-tab>
            </v-tabs>
            <v-divider class="pb-5"></v-divider>
            <v-tabs-items v-model="tab" class="pa-5" align="left">
                <!-- <v-card outlined class="pb-10"> -->
                <!-- <div class="primary--text text-center d-block text-h4 mt-5">
                        {{ title }}
                    </div>
                    <v-divider class="pb-5"></v-divider> -->
                <nuxt-child></nuxt-child>
                <!-- </v-card> -->
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
export default {
    middleware: ["admin"],
    layout: "clean",

    data() {
        return {
            tab: null,
            title: "",
            tabs: [
                { label: "Usuários", link: "/admin/user" },
                { label: "Produtos", link: "/admin/product" },
                { label: "Pedidos", link: "/admin/order" },
                { label: "Propriedades", link: "/admin/property" },
            ],
        };
    },
    watch: {
        tab() {
            let value = "";
            this.tabs.forEach((element) => {
                if (element.link == this.tab) {
                    value = element.label;
                }
                this.title = value;
            });
        },
    },
    created() {
        let route = this.$router.history.current.path.split("/");
        if (route.length <= 2) this.$router.push("/admin/user");
    },
};
</script>

<style>
</style>