export const state = () => ({
  isMenuOpen: false
})
export const mutations = {
  changeMenu (state) {
    state.isMenuOpen = !state.isMenuOpen
  }
}
