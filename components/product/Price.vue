<template>
    <div>
        <div
            :class="`mt-4 text-${size1} text-decoration-line-through pr-14`"
            style="color: #bdbdbd"
        >
            R$ {{ (this.price * 1.33).toFixed(2).replace(".", ",") }}
        </div>

        <div :class="`mb-4 text-${size2} font-weight-bold third--text`">
            R$ {{ this.price.toFixed(2).replace(".", ",") }}
        </div>
        
    </div>
</template>

<script>
export default {
    name:'ProductPrice',
    props: {
        price: Number,
        size1: String,
        size2: String,
    },

    methods: {},
};
</script>

<style>
</style>