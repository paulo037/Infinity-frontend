<template >
    <div>
        <v-hover > 
            <template v-slot:default="{ hover }">
                <v-card
                    tag="div"
                    class="ma-5 rounded-circle d-flex justify-center align-center"
                    height="190"
                    width="190"
                    color="secondary"
                    :elevation="hover ? 16 : 0"
                    @click="
                        $router.push({
                            path: 'search',
                            query: { category: name },
                        })
                    "
                >
                    <nuxt-img
                        height="180"
                        width="180"
                        :src="img"
                        format="webp"
                        fit="fill"
                    ></nuxt-img>
                </v-card>
            </template>
        </v-hover>
        <span align="center" class="d-block">{{ name }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        img: String,
        id: String,
    },
};
</script>

<style>
</style>