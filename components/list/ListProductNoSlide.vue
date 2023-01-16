    <template>
    <v-container class="pa-0">
        <v-row>
            <h2
                class="primary--text ml-2 d-inline-block"
                align="start"
                v-if="!loading"
            >
                {{ products.length }}
                <span v-if="term">
                    Resultado(s) para : "{{
                        term.length > 20 ? term.substring(0, 20) + "..." : term
                    }}"
                </span>

                <span v-else>
                    Resultado (s) para categoria: "{{
                        products.length > 0 ? products[0].category : ""
                    }}"
                </span>
            </h2>

            <h2 class="primary--text ml-2 d-inline-block" align="start" v-else>
                <span class="pr-5"> Buscando </span>
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </h2>
        </v-row>
        <v-row class="ma-0" justify="center" justify-md="start">
            <v-col
                class="ma-0 pa-0 d-flex flex-grow-0"
                v-for="(product, index) in productsWithPagination"
                :key="`${index}-${product.name}`"
            >
                <Product
                    :name="product.name"
                    :rating="product.rating"
                    :price="product.price"
                    :sold="parseInt(product.sold)"
                    :image="product.image"
                    :id="product.id"
                />
            </v-col>

            <v-col class="ma-0 pa-0 d-flex flex-grow-0" v-for="n in 3" :key="n">
                <SkeletonProduct v-if="loading" />
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-pagination
                v-if="products.length > productPerPage"
                v-model="page"
                :length="qtdpage"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
            ></v-pagination>
        </v-row>
    </v-container>
</template>

<script>


export default {

    data() {
        return {
            page: 1,
            qtdpage: 1,
            productPerPage: 21,
        };
    },

    props: {
        term: String,
        category: Number,
        products: Array,
        loading: Boolean,
    },

    computed: {
        productsWithPagination() {
            this.qtdpage = Math.ceil(
                this.products.length / this.productPerPage
            );
            const start = (this.page - 1) * this.productPerPage;

            return this.products.slice(start, start + this.productPerPage);
        },
    },


    watch:{
        products(){
            this.page = 1
        }
    }
};
</script>

<style>
</style>