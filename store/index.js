export const state = () => ({
    isMenuOpen: false,
    numberOfProductsInCart: 0,
    product_id: null,
    text: "",
    snackbar: false,
    color: "",
    back_url: "",

})
export const mutations = {
    changeMenu(state) {
        state.isMenuOpen = !state.isMenuOpen
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
