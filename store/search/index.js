export const state = () => ({
    categories: [],
    select : null,
  })
  export const mutations = {
    setCategories(state, categories) {
      state.categories = categories;
    },

    setCategory(state, id) {
        state.select = id;
    }
  }
  