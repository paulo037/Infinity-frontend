<template>
    <div align="center" v-if="error.statusCode === 404">
        <v-card
            align="center"
            max-width="500px"
            class="secondary mx-8 pa-8 justify-center primary--text"
            elevation="5"
        >
            <span class="text-h6"> Parece que esta página não existe! </span>
            <div>
                <br />
                <v-icon class="primary--text" height="200px" x-large
                    >mdi-alert</v-icon
                >
            </div>
            <br />
            <nuxt-link to="/">Ir à página pricipal.</nuxt-link>
        </v-card>
    </div>
</template>
  
  <script>
export default {
    props: ["error"],
};
</script>