export const state = () => ({
    isMenuOpen: false,

    product_id: null,
    text: "",
    snackbar: false,
    color: "",
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
        console.log("setado dentro")
      state.product_id = payload
    }
}
