<template>
    <v-row align="center" justify="center" class="px-5">
        <v-col class="d-flex align-cente max-width" cols="12" sm="6" md="5  ">
            <v-pagination
                dense
                v-model="page"
                :length="Math.ceil(count / limit)"
                class="mb-5"
            ></v-pagination>
        </v-col>

        <v-col class="d-flex align-right" cols="12" sm="6" md="5">
            <span class="mt-2 pr-2 d-inline-block">{{ text }}</span>
            <span style="width: 60px" class="d-inline-block">
                <v-autocomplete
                    
                    dense
                    v-model="limit"
                    :items="limits"
                ></v-autocomplete>
            </span>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        limits: [],
        limit: Number,
        page: Number,
        count: Number,
        text: String,
    },

    watch: {

        async page() {
            this.$emit('pageChange', this.page)
        },
        async limit() {
            this.$emit('limitChange', this.limit)

        },
    },
};
</script>

<style>
</style>