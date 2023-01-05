<template>
  <nuxt-child></nuxt-child>
</template>


<script>
export default {
    middleware: ["loggedIn"],
};
</script>

<style>
</style>