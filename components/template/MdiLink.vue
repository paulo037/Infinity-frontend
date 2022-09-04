<template>
    <NuxtLink :to="link" class="text-decoration-none "  width="100%">
        <v-btn text class="primary--text text-start py-8" block>
            <v-icon> {{ icon }} </v-icon>
            <v-list-item-title  class="ml-5 primary--text">{{
                text
            }}</v-list-item-title>

            <slot name="cart"> </slot>
          
        </v-btn>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        icon: String,
        text: String,
        link: String,
    },
};
</script>

<style>
</style>

<!-- text class="primary--text hidden-sm-and-down py-8" -->