export const state = () => ({
    isMenuOpen: false,
    numberOfProductsInCart: 0,
    product_id: null,
    text: "",
    snackbar: false,
    color: "",
    back_url: "",
    setup: true,
    reload: '/',
    load: false,
    access_token: null,
    refresh_token: null,
})
export const mutations = {

    setup(state){
        state.setup = false
    },

    changeMenu(state) {
        state.isMenuOpen = !state.isMenuOpen
    },

    setReload(state, payload){
        state.reload = payload
    },


    setLoad(state, payload){
        state.load = payload
    },


    setAccess_token(state, payload){
        state.access_token = payload
    },

    setRefresh_token(state, payload){
        state.refresh_token = payload
    },

    toasted(state, payload) {
        state.text = payload.text;
        state.color = payload.color || null;
        state.snackbar = !state.snackbar;
    },

    setProduct(state, payload) {
        state.product_id = payload
    },

    setNumberOfProductsInCart(state, payload) {
        state.numberOfProductsInCart = payload
    },

    addNumberOfProductsInCart(state) {
        state.numberOfProductsInCart += 1
    },

    decrementNumberOfProductsInCart(state) {
        state.numberOfProductsInCart -= 1
    },

    SetBack_url(state, payload) {
        state.back_url = payload
    }

}
